# MegaEarth2049 Boss Placeholder Sprite Generator
# This script generates placeholder PNG files for boss enemies with near-death state frames

Add-Type -AssemblyName System.Drawing

Write-Host "=== MegaEarth2049 Boss Placeholder Sprite Generator ===" -ForegroundColor Cyan
Write-Host "This script generates placeholder PNG files for boss enemies, including near-death state frames." -ForegroundColor Cyan
Write-Host ""

# Create a directory for boss placeholder sprites if it doesn't exist
$bossPlaceholderDir = "boss_placeholder_sprites"
if (-not (Test-Path $bossPlaceholderDir)) {
    New-Item -ItemType Directory -Path $bossPlaceholderDir -Force
    Write-Host "Created directory: $bossPlaceholderDir" -ForegroundColor Green
}

# Function to create a placeholder boss sprite sheet with near-death frames
function Create-BossPlaceholderSprite {
    param (
        [string]$spriteName,
        [int]$width = 96,
        [int]$height = 96,
        [int]$frames = 8,
        [string]$baseColor = "#FF0000",
        [string]$text = "",
        [bool]$includeNearDeathFrames = $true
    )
    
    try {
        # Calculate total height based on whether we include near-death frames
        $totalHeight = if ($includeNearDeathFrames) { $height * 2 } else { $height }
        
        # Create a bitmap for the sprite sheet
        $spriteSheet = New-Object System.Drawing.Bitmap ($width * $frames), $totalHeight
        
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
        $font = New-Object System.Drawing.Font "Arial", 10
        
        # Create a brush for the text
        $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
        
        # Draw each frame in the normal state (top row)
        for ($i = 0; $i -lt $frames; $i++) {
            # Calculate the position for this frame
            $x = $i * $width
            
            # Draw a rectangle for the sprite
            $rect = New-Object System.Drawing.Rectangle $x, 0, $width, $height
            $graphics.FillRectangle($brush, $rect)
            
            # Draw a border around the sprite
            $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::Black), 2
            $graphics.DrawRectangle($pen, $rect)
            
            # Draw the frame number
            $frameText = "F$($i+1)"
            $graphics.DrawString($frameText, $font, $textBrush, $x + 10, 10)
            
            # Draw the sprite name
            if ($text -eq "") {
                $spriteText = $spriteName
            } else {
                $spriteText = $text
            }
            $graphics.DrawString($spriteText, $font, $textBrush, $x + 10, $height - 25)
            
            # Dispose of the pen
            $pen.Dispose()
        }
        
        # If including near-death frames, draw them in the bottom row with red tint
        if ($includeNearDeathFrames) {
            # Create a red-tinted version of the base color for near-death state
            $redTintColor = [System.Drawing.Color]::FromArgb(255, 255, [Math]::Min(100, $g), [Math]::Min(100, $b))
            $redBrush = New-Object System.Drawing.SolidBrush $redTintColor
            
            for ($i = 0; $i -lt $frames; $i++) {
                # Calculate the position for this frame
                $x = $i * $width
                $y = $height # Start of second row
                
                # Draw a rectangle for the sprite with red tint
                $rect = New-Object System.Drawing.Rectangle $x, $y, $width, $height
                $graphics.FillRectangle($redBrush, $rect)
                
                # Draw a border around the sprite
                $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::Black), 2
                $graphics.DrawRectangle($pen, $rect)
                
                # Draw the frame number
                $frameText = "ND$($i+1)"
                $graphics.DrawString($frameText, $font, $textBrush, $x + 10, $y + 10)
                
                # Draw the sprite name and near-death indicator
                if ($text -eq "") {
                    $spriteText = "$spriteName (Near Death)"
                } else {
                    $spriteText = "$text (Near Death)"
                }
                $graphics.DrawString($spriteText, $font, $textBrush, $x + 10, $y + $height - 25)
                
                # Dispose of the pen
                $pen.Dispose()
            }
            
            # Dispose of the red brush
            $redBrush.Dispose()
        }
        
        # Save the sprite sheet
        $outputPath = Join-Path $bossPlaceholderDir "$spriteName.png"
        $spriteSheet.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
        
        # Dispose of the resources
        $textBrush.Dispose()
        $brush.Dispose()
        $font.Dispose()
        $graphics.Dispose()
        $spriteSheet.Dispose()
        
        Write-Host "Created boss placeholder sprite: $outputPath" -ForegroundColor Green
    }
    catch {
        Write-Host "Error creating boss placeholder sprite $spriteName`: $_" -ForegroundColor Red
    }
}

# Create placeholder sprites for boss enemies
$bossSprites = @(
    # Existing boss
    @{Name = "punkBoss1_animated"; Color = "#FF1493"; Text = "Punk Boss"; Frames = 8},
    
    # New bosses from create_boss_art_assets.ps1
    @{Name = "corporateBoss_animated"; Color = "#1E90FF"; Text = "Corporate Boss"; Frames = 8},
    @{Name = "ninjaLord_animated"; Color = "#000000"; Text = "Ninja Lord"; Frames = 8},
    @{Name = "alienOverlord_animated"; Color = "#9370DB"; Text = "Alien Overlord"; Frames = 8},
    @{Name = "roboticTitan_animated"; Color = "#708090"; Text = "Robotic Titan"; Frames = 8},
    @{Name = "elementalLord_animated"; Color = "#FF7F50"; Text = "Elemental Lord"; Frames = 8},
    @{Name = "digitalEntity_animated"; Color = "#00CED1"; Text = "Digital Entity"; Frames = 8},
    @{Name = "mutantBehemoth_animated"; Color = "#32CD32"; Text = "Mutant Behemoth"; Frames = 8}
)

foreach ($sprite in $bossSprites) {
    $params = @{
        spriteName = $sprite.Name
        width = 96  # Boss sprites are 96x96
        height = 96
        frames = if ($sprite.Frames) { $sprite.Frames } else { 8 }
        baseColor = $sprite.Color
        text = $sprite.Text
        includeNearDeathFrames = $true
    }
    
    Create-BossPlaceholderSprite @params
}

# Create a script to copy the boss placeholder sprites to the game directory
$copyScriptPath = Join-Path $bossPlaceholderDir "copy_to_game.ps1"
$copyScriptContent = @"
# Script to copy boss placeholder sprites to the game directory
Write-Host "Copying boss placeholder sprites to img/sv_enemies directory..." -ForegroundColor Cyan

# Create a backup of the original sprites
Write-Host "Creating backup of original sprites..." -ForegroundColor Yellow
if (-not (Test-Path "img/sv_enemies_backup")) {
    New-Item -ItemType Directory -Path "img/sv_enemies_backup" -Force
}

# Copy boss placeholder sprites to the game directory
Get-ChildItem -Path "$bossPlaceholderDir" -Filter "*.png" | ForEach-Object {
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
    Write-Host "Copied boss placeholder sprite: `$(`$_.Name)" -ForegroundColor Green
}

Write-Host "Boss placeholder sprites have been copied to the game directory." -ForegroundColor Green
Write-Host "Original sprites have been backed up to img/sv_enemies_backup." -ForegroundColor Green
Write-Host "Run the update_boss_enemies_json.ps1 script to update the Enemies.json file to reference the new boss sprites." -ForegroundColor Green
"@

Set-Content -Path $copyScriptPath -Value $copyScriptContent
Write-Host "Created copy script: $copyScriptPath" -ForegroundColor Green

Write-Host ""
Write-Host "=== Instructions ===" -ForegroundColor Yellow
Write-Host "1. Boss placeholder sprites have been generated in the '$bossPlaceholderDir' directory."
Write-Host "2. Each boss sprite includes normal frames and near-death state frames (with red tint)."
Write-Host "3. To use these placeholder sprites in the game, run the copy_to_game.ps1 script in the '$bossPlaceholderDir' directory."
Write-Host "4. The original sprites will be backed up to img/sv_enemies_backup."
Write-Host "5. Run the update_boss_enemies_json.ps1 script to update the Enemies.json file to reference the new boss sprites."
Write-Host "6. Run the game to see the boss placeholder sprites in action."
Write-Host "7. Replace the placeholder sprites with actual art assets when they are ready."
Write-Host ""
Write-Host "Note: These are just placeholder sprites. They should be replaced with actual art assets created according to the specifications in create_boss_art_assets.ps1." -ForegroundColor Yellow
