# MegaEarth2049 Placeholder Sprite Generator
# This script generates placeholder PNG files for the missing art assets

Add-Type -AssemblyName System.Drawing

Write-Host "=== MegaEarth2049 Placeholder Sprite Generator ===" -ForegroundColor Cyan
Write-Host "This script generates placeholder PNG files for the missing art assets." -ForegroundColor Cyan
Write-Host ""

# Create a directory for placeholder sprites if it doesn't exist
$placeholderDir = "placeholder_sprites"
if (-not (Test-Path $placeholderDir)) {
    New-Item -ItemType Directory -Path $placeholderDir -Force
    Write-Host "Created directory: $placeholderDir" -ForegroundColor Green
}

# Function to create a placeholder sprite sheet
function Create-PlaceholderSprite {
    param (
        [string]$spriteName,
        [int]$width = 64,
        [int]$height = 64,
        [int]$frames = 8,
        [string]$baseColor = "#FF0000",
        [string]$text = ""
    )
    
    try {
        # Create a bitmap for the sprite sheet
        $spriteSheet = New-Object System.Drawing.Bitmap ($width * $frames), $height
        
        # Create a graphics object to draw on the bitmap
        $graphics = [System.Drawing.Graphics]::FromImage($spriteSheet)
        
        # Fill the background with transparency
        $graphics.Clear([System.Drawing.Color]::Transparent)
        
        # Convert the base color from hex to a Color object
        $r = [Convert]::ToInt32($baseColor.Substring(1, 2), 16)
        $g = [Convert]::ToInt32($baseColor.Substring(3, 2), 16)
        $b = [Convert]::ToInt32($baseColor.Substring(5, 2), 16)
        $color = [System.Drawing.Color]::FromArgb(255, $r, $g, $b)
        
        # Create a brush with the base color
        $brush = New-Object System.Drawing.SolidBrush $color
        
        # Create a font for the text
        $font = New-Object System.Drawing.Font "Arial", 8
        
        # Create a brush for the text
        $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
        
        # Draw each frame
        for ($i = 0; $i -lt $frames; $i++) {
            # Calculate the position for this frame
            $x = $i * $width
            
            # Draw a rectangle for the sprite
            $rect = New-Object System.Drawing.Rectangle $x, 0, $width, $height
            $graphics.FillRectangle($brush, $rect)
            
            # Draw a border around the sprite
            $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::Black), 1
            $graphics.DrawRectangle($pen, $rect)
            
            # Draw the frame number
            $frameText = "F$($i+1)"
            $graphics.DrawString($frameText, $font, $textBrush, $x + 5, 5)
            
            # Draw the sprite name
            if ($text -eq "") {
                $spriteText = $spriteName
            } else {
                $spriteText = $text
            }
            $graphics.DrawString($spriteText, $font, $textBrush, $x + 5, $height - 15)
            
            # Dispose of the pen
            $pen.Dispose()
        }
        
        # Save the sprite sheet
        $outputPath = Join-Path $placeholderDir "$spriteName.png"
        $spriteSheet.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
        
        # Dispose of the resources
        $textBrush.Dispose()
        $brush.Dispose()
        $font.Dispose()
        $graphics.Dispose()
        $spriteSheet.Dispose()
        
        Write-Host "Created placeholder sprite: $outputPath" -ForegroundColor Green
    }
    catch {
        Write-Host "Error creating placeholder sprite $spriteName`: $_" -ForegroundColor Red
    }
}

# Create placeholder sprites for the missing art assets
$sprites = @(
    # Elemental Spirits
    @{Name = "Firespirit_animated"; Color = "#FF4500"; Text = "Fire Spirit"},
    @{Name = "Earthspirit_animated"; Color = "#8B4513"; Text = "Earth Spirit"},
    @{Name = "Waterspirit_animated"; Color = "#1E90FF"; Text = "Water Spirit"},
    @{Name = "Windspirit_animated"; Color = "#87CEEB"; Text = "Wind Spirit"},
    
    # SF Series
    @{Name = "SF_TeddyBear_animated"; Color = "#A0522D"; Text = "Security Teddy"},
    
    # Punks
    @{Name = "punk1_animated"; Color = "#FF00FF"; Text = "Punk 1"},
    @{Name = "punk2_animated"; Color = "#0000FF"; Text = "Punk 2"},
    @{Name = "punk3_animated"; Color = "#00FF00"; Text = "Punk 3"},
    @{Name = "punk4_animated"; Color = "#FF0000"; Text = "Punk 4"},
    @{Name = "punk5_animated"; Color = "#800080"; Text = "Punk 5"},
    @{Name = "punk6_animated"; Color = "#FFFF00"; Text = "Punk 6"},
    @{Name = "punkBoss1_animated"; Width = 96; Height = 96; Color = "#FF1493"; Text = "Punk Boss"},
    
    # Ninjas
    @{Name = "greenninja_animated"; Color = "#008000"; Text = "Green Ninja"},
    @{Name = "pinkninja_animated"; Color = "#FFC0CB"; Text = "Pink Ninja"},
    @{Name = "brownninja_animated"; Color = "#8B4513"; Text = "Brown Ninja"},
    @{Name = "blueninja_animated"; Color = "#0000FF"; Text = "Blue Ninja"},
    @{Name = "redninja_animated"; Color = "#FF0000"; Text = "Red Ninja"},
    @{Name = "purpleninja_animated"; Color = "#800080"; Text = "Purple Ninja"},
    @{Name = "blackninja_animated"; Color = "#000000"; Text = "Black Ninja"},
    
    # Human Enemies
    @{Name = "thug_animated"; Color = "#696969"; Text = "Thug"},
    @{Name = "gasman_animated"; Color = "#FFFF00"; Text = "Gas Man"},
    
    # Soldiers
    @{Name = "Soldier9_animated"; Color = "#556B2F"; Text = "Soldier 9"},
    @{Name = "Soldier10_animated"; Color = "#F4A460"; Text = "Soldier 10"},
    @{Name = "Soldier11_animated"; Color = "#708090"; Text = "Soldier 11"},
    @{Name = "Soldier12_animated"; Color = "#2F4F4F"; Text = "Soldier 12"},
    @{Name = "Soldier13_animated"; Color = "#BDB76B"; Text = "Soldier 13"}
)

foreach ($sprite in $sprites) {
    $params = @{
        spriteName = $sprite.Name
        width = if ($sprite.Width) { $sprite.Width } else { 64 }
        height = if ($sprite.Height) { $sprite.Height } else { 64 }
        frames = if ($sprite.Frames) { $sprite.Frames } else { 8 }
        baseColor = $sprite.Color
        text = $sprite.Text
    }
    
    Create-PlaceholderSprite @params
}

# Create a script to copy the placeholder sprites to the game directory
$copyScriptPath = Join-Path $placeholderDir "copy_to_game.ps1"
$copyScriptContent = @"
# Script to copy placeholder sprites to the game directory
Write-Host "Copying placeholder sprites to img/sv_enemies directory..." -ForegroundColor Cyan

# Create a backup of the original sprites
Write-Host "Creating backup of original sprites..." -ForegroundColor Yellow
if (-not (Test-Path "img/sv_enemies_backup")) {
    New-Item -ItemType Directory -Path "img/sv_enemies_backup" -Force
}

# Copy placeholder sprites to the game directory
Get-ChildItem -Path "$placeholderDir" -Filter "*.png" | ForEach-Object {
    `$sourcePath = `$_.FullName
    `$destPath = "img/sv_enemies/`$(`$_.Name)"
    
    # Backup the original sprite if it exists
    if (Test-Path `$destPath) {
        `$backupPath = "img/sv_enemies_backup/`$(`$_.Name)"
        Copy-Item -Path `$destPath -Destination `$backupPath -Force
        Write-Host "Backed up original sprite: `$(`$_.Name)" -ForegroundColor Green
    }
    
    # Copy the placeholder sprite
    Copy-Item -Path `$sourcePath -Destination `$destPath -Force
    Write-Host "Copied placeholder sprite: `$(`$_.Name)" -ForegroundColor Green
}

Write-Host "Placeholder sprites have been copied to the game directory." -ForegroundColor Green
Write-Host "Original sprites have been backed up to img/sv_enemies_backup." -ForegroundColor Green
Write-Host "Run the game to see the placeholder sprites in action!" -ForegroundColor Green
"@

Set-Content -Path $copyScriptPath -Value $copyScriptContent
Write-Host "Created copy script: $copyScriptPath" -ForegroundColor Green

Write-Host ""
Write-Host "=== Instructions ===" -ForegroundColor Yellow
Write-Host "1. Placeholder sprites have been generated in the '$placeholderDir' directory."
Write-Host "2. To use these placeholder sprites in the game, run the copy_to_game.ps1 script in the '$placeholderDir' directory."
Write-Host "3. The original sprites will be backed up to img/sv_enemies_backup."
Write-Host "4. Run the update_enemies_json.ps1 script to update the Enemies.json file to reference the new animated sprites."
Write-Host "5. Run the game to see the placeholder sprites in action."
Write-Host "6. Replace the placeholder sprites with actual art assets when they are ready."
Write-Host ""
Write-Host "Note: These are just placeholder sprites. They should be replaced with actual art assets created according to the specifications in create_art_assets.ps1." -ForegroundColor Yellow
