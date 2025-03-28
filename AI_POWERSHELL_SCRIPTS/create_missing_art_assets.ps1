# MegaEarth2049 Missing Art Assets Creation Master Script
# This script runs all the other scripts in sequence to create the missing art assets

Write-Host "=== MegaEarth2049 Missing Art Assets Creation ===" -ForegroundColor Cyan
Write-Host "This script will help you create the missing art assets for MegaEarth2049." -ForegroundColor Cyan
Write-Host ""

# Function to display a menu and get user choice
function Show-Menu {
    param (
        [string]$Title = 'MegaEarth2049 Art Assets Creation Menu'
    )
    Clear-Host
    Write-Host "================ $Title ================" -ForegroundColor Cyan
    
    Write-Host "1: Generate Art Asset Specifications"
    Write-Host "2: Generate Placeholder Sprites"
    Write-Host "3: Update Enemies.json"
    Write-Host "4: Run All Scripts in Sequence"
    Write-Host "5: Read Documentation"
    Write-Host "Q: Quit"
    Write-Host ""
}

# Function to run a script and wait for user to continue
function Run-Script {
    param (
        [string]$ScriptPath,
        [string]$Description
    )
    
    Write-Host ""
    Write-Host "=== Running: $Description ===" -ForegroundColor Yellow
    Write-Host ""
    
    if (Test-Path $ScriptPath) {
        & $ScriptPath
        Write-Host ""
        Write-Host "Script completed: $Description" -ForegroundColor Green
    } else {
        Write-Host "Error: Script not found at $ScriptPath" -ForegroundColor Red
    }
    
    Write-Host ""
    Read-Host "Press Enter to continue"
}

# Function to display the README file
function Show-Documentation {
    if (Test-Path "ART_ASSETS_README.md") {
        $content = Get-Content "ART_ASSETS_README.md" -Raw
        Clear-Host
        Write-Host $content
        Write-Host ""
        Read-Host "Press Enter to return to the menu"
    } else {
        Write-Host "Error: Documentation file not found at ART_ASSETS_README.md" -ForegroundColor Red
        Write-Host ""
        Read-Host "Press Enter to continue"
    }
}

# Main menu loop
do {
    Show-Menu
    $choice = Read-Host "Please make a selection"
    
    switch ($choice) {
        '1' {
            Run-Script -ScriptPath ".\create_art_assets.ps1" -Description "Generate Art Asset Specifications"
        }
        '2' {
            Run-Script -ScriptPath ".\generate_placeholder_sprites.ps1" -Description "Generate Placeholder Sprites"
        }
        '3' {
            Run-Script -ScriptPath ".\update_enemies_json.ps1" -Description "Update Enemies.json"
        }
        '4' {
            Write-Host ""
            Write-Host "=== Running All Scripts in Sequence ===" -ForegroundColor Yellow
            Write-Host ""
            
            # Run all scripts in sequence
            Run-Script -ScriptPath ".\create_art_assets.ps1" -Description "Generate Art Asset Specifications"
            Run-Script -ScriptPath ".\generate_placeholder_sprites.ps1" -Description "Generate Placeholder Sprites"
            Run-Script -ScriptPath ".\update_enemies_json.ps1" -Description "Update Enemies.json"
            
            Write-Host ""
            Write-Host "All scripts have been executed successfully!" -ForegroundColor Green
            Write-Host ""
            Read-Host "Press Enter to continue"
        }
        '5' {
            Show-Documentation
        }
        'q' {
            return
        }
    }
} until ($choice -eq 'q')

Write-Host ""
Write-Host "Thank you for using the MegaEarth2049 Art Assets Creation Tool!" -ForegroundColor Cyan
Write-Host "Goodbye!" -ForegroundColor Cyan
