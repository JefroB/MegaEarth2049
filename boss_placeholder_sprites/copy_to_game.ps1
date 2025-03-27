# Script to copy boss placeholder sprites to the game directory
Write-Host "Copying boss placeholder sprites to img/sv_enemies directory..." -ForegroundColor Cyan

# Create a backup of the original sprites
Write-Host "Creating backup of original sprites..." -ForegroundColor Yellow
if (-not (Test-Path "img/sv_enemies_backup")) {
    New-Item -ItemType Directory -Path "img/sv_enemies_backup" -Force
}

# Copy boss placeholder sprites to the game directory
Get-ChildItem -Path "." -Filter "*.png" | ForEach-Object {
    $sourcePath = $_.FullName
    $destPath = "img/sv_enemies/$($_.Name)"
    
    # Backup the original sprite if it exists
    if (Test-Path $destPath) {
        $backupPath = "img/sv_enemies_backup/$($_.Name)"
        Copy-Item -Path $destPath -Destination $backupPath -Force
        Write-Host "Backed up original sprite: $($_.Name)" -ForegroundColor Green
    }
    
    # Copy the placeholder sprite
    Copy-Item -Path $sourcePath -Destination $destPath -Force
    Write-Host "Copied boss placeholder sprite: $($_.Name)" -ForegroundColor Green
}

Write-Host "Boss placeholder sprites have been copied to the game directory." -ForegroundColor Green
Write-Host "Original sprites have been backed up to img/sv_enemies_backup." -ForegroundColor Green
Write-Host "Run the update_boss_enemies_json.ps1 script to update the Enemies.json file to reference the new boss sprites." -ForegroundColor Green
