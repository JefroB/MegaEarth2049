# MegaEarth2049 PowerShell Core Utilities
# Common functions for PowerShell scripts

# Set strict mode to catch common errors
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Default paths
$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
$PROJECT_ROOT = Split-Path -Parent (Split-Path -Parent $SCRIPT_DIR)
$DATA_DIR = Join-Path -Path $PROJECT_ROOT -ChildPath "data"
$BACKUPS_DIR = Join-Path -Path $PROJECT_ROOT -ChildPath "backups"
$TEMP_DIR = Join-Path -Path $PROJECT_ROOT -ChildPath "temp"

# Create necessary directories if they don't exist
function Ensure-DirectoryExists {
    param (
        [Parameter(Mandatory=$true)]
        [string]$DirectoryPath
    )
    
    if (-not (Test-Path -Path $DirectoryPath)) {
        New-Item -ItemType Directory -Path $DirectoryPath -Force | Out-Null
        Write-Host ("Created directory: " + $DirectoryPath) -ForegroundColor Green
    }
}

# Ensure backup directory exists
Ensure-DirectoryExists -DirectoryPath $BACKUPS_DIR

# Create a backup of a file with timestamp
function Backup-File {
    param (
        [Parameter(Mandatory=$true)]
        [string]$FilePath,
        
        [Parameter(Mandatory=$false)]
        [string]$BackupDir = $BACKUPS_DIR,
        
        [Parameter(Mandatory=$false)]
        [string]$Suffix = "bak"
    )
    
    if (-not (Test-Path -Path $FilePath)) {
        Write-Error ("Cannot create backup, file not found: " + $FilePath)
        return $null
    }
    
    # Ensure backup directory exists
    Ensure-DirectoryExists -DirectoryPath $BackupDir
    
    # Create backup filename with timestamp
    $FileName = Split-Path -Leaf $FilePath
    $Timestamp = Get-Date -Format "yyyy-MM-dd-HH-mm-ss"
    $BackupPath = Join-Path -Path $BackupDir -ChildPath "$FileName.$Timestamp.$Suffix"
    
    # Copy the file
    try {
        Copy-Item -Path $FilePath -Destination $BackupPath -Force
        Write-Host ("Created backup: " + $BackupPath) -ForegroundColor Green
        return $BackupPath
    }
    catch {
        $errorMessage = $_.Exception.Message
        Write-Error ("Error creating backup for " + $FilePath + ": " + $errorMessage)
        return $null
    }
}

# Restore a file from its most recent backup
function Restore-FromBackup {
    param (
        [Parameter(Mandatory=$true)]
        [string]$FilePath,
        
        [Parameter(Mandatory=$false)]
        [string]$BackupDir = $BACKUPS_DIR,
        
        [Parameter(Mandatory=$false)]
        [string]$Suffix = "bak"
    )
    
    $FileName = Split-Path -Leaf $FilePath
    
    # Find all backups for this file
    $Backups = Get-ChildItem -Path $BackupDir -Filter "$FileName*.$Suffix" | 
               Sort-Object -Property LastWriteTime -Descending
    
    if ($Backups.Count -eq 0) {
        Write-Error ("No backups found for " + $FileName)
        return $false
    }
    
    # Get the most recent backup
    $MostRecentBackup = $Backups[0].FullName
    
    # Restore the file
    try {
        Copy-Item -Path $MostRecentBackup -Destination $FilePath -Force
        Write-Host ("Restored " + $FilePath + " from backup: " + $MostRecentBackup) -ForegroundColor Green
        return $true
    }
    catch {
        $errorMessage = $_.Exception.Message
        Write-Error ("Error restoring backup for " + $FilePath + ": " + $errorMessage)
        return $false
    }
}

# List all backups for a file
function Get-Backups {
    param (
        [Parameter(Mandatory=$true)]
        [string]$FilePath,
        
        [Parameter(Mandatory=$false)]
        [string]$BackupDir = $BACKUPS_DIR,
        
        [Parameter(Mandatory=$false)]
        [string]$Suffix = "bak"
    )
    
    $FileName = Split-Path -Leaf $FilePath
    
    # Find all backups for this file
    $Backups = Get-ChildItem -Path $BackupDir -Filter "$FileName*.$Suffix" | 
               Sort-Object -Property LastWriteTime -Descending
    
    return $Backups
}

# Clean up old backups, keeping only the specified number of most recent ones
function Clear-OldBackups {
    param (
        [Parameter(Mandatory=$true)]
        [string]$FilePath,
        
        [Parameter(Mandatory=$false)]
        [int]$KeepCount = 5,
        
        [Parameter(Mandatory=$false)]
        [string]$BackupDir = $BACKUPS_DIR,
        
        [Parameter(Mandatory=$false)]
        [string]$Suffix = "bak"
    )
    
    $Backups = Get-Backups -FilePath $FilePath -BackupDir $BackupDir -Suffix $Suffix
    
    if ($Backups.Count -le $KeepCount) {
        $fileName = Split-Path -Leaf $FilePath
        Write-Host ("No backups to clean up for " + $fileName) -ForegroundColor Yellow
        return 0
    }
    
    # Keep the most recent backups and delete the rest
    $BackupsToDelete = $Backups[$KeepCount..($Backups.Count - 1)]
    $DeletedCount = 0
    
    foreach ($Backup in $BackupsToDelete) {
        try {
            Remove-Item -Path $Backup.FullName -Force
            $DeletedCount++
        }
        catch {
            $errorMessage = $_.Exception.Message
            $backupPath = $Backup.FullName
            Write-Error ("Error deleting backup " + $backupPath + ": " + $errorMessage)
        }
    }
    
    $fileName = Split-Path -Leaf $FilePath
    Write-Host ("Cleaned up " + $DeletedCount + " old backups for " + $fileName) -ForegroundColor Green
    return $DeletedCount
}

# Safely read a JSON file with error handling
function Read-JsonFile {
    param (
        [Parameter(Mandatory=$true)]
        [string]$FilePath,
        
        [Parameter(Mandatory=$false)]
        [bool]$CreateBackup = $true
    )
    
    if (-not (Test-Path -Path $FilePath)) {
        Write-Error ("File not found: " + $FilePath)
        return $null
    }
    
    # Create backup if requested
    if ($CreateBackup) {
        Backup-File -FilePath $FilePath
    }
    
    # Read and parse the file
    try {
        $Content = Get-Content -Path $FilePath -Raw
        $JsonObject = $Content | ConvertFrom-Json
        return $JsonObject
    }
    catch {
        $errorMessage = $_.Exception.Message
        Write-Error ("Error reading or parsing JSON file " + $FilePath + ": " + $errorMessage)
        return $null
    }
}

# Safely write a JSON file with error handling and backup
function Write-JsonFile {
    param (
        [Parameter(Mandatory=$true)]
        [string]$FilePath,
        
        [Parameter(Mandatory=$true)]
        [object]$Data,
        
        [Parameter(Mandatory=$false)]
        [bool]$CreateBackup = $true,
        
        [Parameter(Mandatory=$false)]
        [int]$Depth = 100
    )
    
    # Create backup if requested and file exists
    if ($CreateBackup -and (Test-Path -Path $FilePath)) {
        Backup-File -FilePath $FilePath
    }
    
    # Ensure directory exists
    $Directory = Split-Path -Parent $FilePath
    Ensure-DirectoryExists -DirectoryPath $Directory
    
    # Write the file
    try {
        $JsonString = $Data | ConvertTo-Json -Depth $Depth
        Set-Content -Path $FilePath -Value $JsonString
        Write-Host ("Successfully wrote JSON to " + $FilePath) -ForegroundColor Green
        return $true
    }
    catch {
        $errorMessage = $_.Exception.Message
        Write-Error ("Error writing JSON file " + $FilePath + ": " + $errorMessage)
        return $false
    }
}

# Create a specification file for an asset
function New-AssetSpec {
    param (
        [Parameter(Mandatory=$true)]
        [string]$AssetName,
        
        [Parameter(Mandatory=$true)]
        [string]$AssetType,
        
        [Parameter(Mandatory=$true)]
        [string]$Description,
        
        [Parameter(Mandatory=$true)]
        [string]$Size,
        
        [Parameter(Mandatory=$true)]
        [string]$Style,
        
        [Parameter(Mandatory=$true)]
        [string]$Colors,
        
        [Parameter(Mandatory=$true)]
        [string]$Animation,
        
        [Parameter(Mandatory=$true)]
        [string]$Reference,
        
        [Parameter(Mandatory=$false)]
        [string]$OutputDir = (Join-Path -Path $PROJECT_ROOT -ChildPath "new_art_assets")
    )
    
    # Ensure output directory exists
    Ensure-DirectoryExists -DirectoryPath $OutputDir
    
    $SpecPath = Join-Path -Path $OutputDir -ChildPath "$AssetName.txt"
    
    $Content = @"
=== $AssetName ===
Type: $AssetType
Description: $Description
Size: $Size
Style: $Style
Colors: $Colors
Animation: $Animation
Reference: $Reference

"@
    
    Set-Content -Path $SpecPath -Value $Content
    Write-Host ("Created specification for " + $AssetName) -ForegroundColor Green
    
    return $SpecPath
}

# Display animation frame guidelines
function Show-AnimationGuidelines {
    Write-Host ""
    Write-Host "=== Animation Frame Guidelines ===" -ForegroundColor Yellow
    Write-Host "For each animated sprite, create the following frames:" -ForegroundColor Yellow
    Write-Host "1. Idle Animation (4-8 frames)"
    Write-Host "   - Frame 1: Base pose"
    Write-Host "   - Frame 2-4: Subtle movement (breathing, shifting weight)"
    Write-Host "   - Frame 5-8: Return to base pose with variations"
    Write-Host ""
    Write-Host "2. Attack Animation (6-12 frames)"
    Write-Host "   - Frame 1-2: Wind-up/preparation"
    Write-Host "   - Frame 3-4: Attack execution"
    Write-Host "   - Frame 5-6: Attack impact/follow-through"
    Write-Host "   - Frame 7-12: Recovery to idle (for longer animations)"
    Write-Host ""
    Write-Host "3. Damage Reaction (2-4 frames)"
    Write-Host "   - Frame 1: Impact pose"
    Write-Host "   - Frame 2-4: Recoil and recovery"
    Write-Host ""
}

# Display sprite sheet layout guidelines
function Show-SpriteSheetGuidelines {
    Write-Host "=== Sprite Sheet Layout ===" -ForegroundColor Yellow
    Write-Host "Arrange animation frames horizontally in a sprite sheet:" -ForegroundColor Yellow
    Write-Host "- For 64x64 pixel sprites with 8 frames: Create a 512x64 pixel sprite sheet"
    Write-Host "- For 96x96 pixel sprites with 8 frames: Create a 768x96 pixel sprite sheet"
    Write-Host ""
    Write-Host "You can also arrange multiple animations vertically:"
    Write-Host "- Row 1: Idle animation frames"
    Write-Host "- Row 2: Attack animation frames"
    Write-Host "- Row 3: Damage reaction frames"
    Write-Host ""
}

# Display art style guidelines
function Show-ArtStyleGuidelines {
    Write-Host "=== Art Style Guidelines ===" -ForegroundColor Yellow
    Write-Host "- Overall Style: 16-bit pixel art with a cyberpunk aesthetic"
    Write-Host "- Detail Level: Medium to high detail with clear silhouettes"
    Write-Host "- Theme: Cyberpunk with elements of humor, absurdity, and digital glitches"
    Write-Host "- Color palette: Neon colors against dark backgrounds for cyberpunk areas"
    Write-Host "- Animations should be smooth but maintain the pixel art style (no tweening)"
    Write-Host "- Consider the game's humor when designing assets - exaggeration and absurdity are welcome"
    Write-Host ""
}

# List of exported functions
$ExportedFunctions = @(
    'Ensure-DirectoryExists',
    'Backup-File',
    'Restore-FromBackup',
    'Get-Backups',
    'Clear-OldBackups',
    'Read-JsonFile',
    'Write-JsonFile',
    'New-AssetSpec',
    'Show-AnimationGuidelines',
    'Show-SpriteSheetGuidelines',
    'Show-ArtStyleGuidelines'
)

# List of exported variables
$ExportedVariables = @(
    'SCRIPT_DIR',
    'PROJECT_ROOT',
    'DATA_DIR',
    'BACKUPS_DIR',
    'TEMP_DIR'
)

# Display exported items
$functionsList = [string]::Join(", ", $ExportedFunctions)
$variablesList = [string]::Join(", ", $ExportedVariables)
Write-Host ("Exported Functions: " + $functionsList) -ForegroundColor Cyan
Write-Host ("Exported Variables: " + $variablesList) -ForegroundColor Cyan
