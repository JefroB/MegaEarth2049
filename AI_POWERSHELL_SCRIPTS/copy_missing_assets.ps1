# Script to copy missing art assets from sv_actors to sv_enemies

# List of assets to copy
$assets = @(
    # Missing enemies
    "thug.png",
    "gasman.png",
    "robber.png",
    "Soldier9.png",
    "Soldier10.png",
    "Soldier11.png",
    "Soldier12.png",
    "Soldier13.png",
    "rat861565115.png"  # Note: This was misspelled as rat8615651156.png in Enemies.json
)

# Source and destination directories
$sourceDir = "img/sv_actors"
$destDir = "img/sv_enemies"

# Create destination directory if it doesn't exist
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
}

# Copy each asset
foreach ($asset in $assets) {
    $sourcePath = Join-Path $sourceDir $asset
    $destPath = Join-Path $destDir $asset
    
    if (Test-Path $sourcePath) {
        Write-Host "Copying $asset..."
        Copy-Item $sourcePath $destPath -Force
    } else {
        Write-Host "Warning: $asset not found in $sourceDir"
    }
}

# Create a copy of rat861565115.png as rat8615651156.png to match the name in Enemies.json
$sourcePath = Join-Path $sourceDir "rat861565115.png"
$destPath = Join-Path $destDir "rat8615651156.png"
if (Test-Path $sourcePath) {
    Write-Host "Creating rat8615651156.png from rat861565115.png..."
    Copy-Item $sourcePath $destPath -Force
} else {
    Write-Host "Warning: rat861565115.png not found in $sourceDir"
}

Write-Host "Missing art assets copying complete!"
