# MegaEarth2049 Art Asset Creation Script
# This script provides instructions and specifications for creating the missing art assets

# Create a directory for new art assets if it doesn't exist
$newAssetsDir = "new_art_assets"
if (-not (Test-Path $newAssetsDir)) {
    New-Item -ItemType Directory -Path $newAssetsDir -Force
}

Write-Host "=== MegaEarth2049 Art Asset Creation Guide ===" -ForegroundColor Cyan
Write-Host "This script provides specifications for creating the missing art assets." -ForegroundColor Cyan
Write-Host ""

# Function to create a text file with specifications for an asset
function Create-AssetSpec {
    param (
        [string]$assetName,
        [string]$assetType,
        [string]$description,
        [string]$size,
        [string]$style,
        [string]$colors,
        [string]$animation,
        [string]$reference
    )

    $specPath = Join-Path $newAssetsDir "$assetName.txt"
    
    $content = @"
=== $assetName ===
Type: $assetType
Description: $description
Size: $size
Style: $style
Colors: $colors
Animation: $animation
Reference: $reference

"@

    Set-Content -Path $specPath -Value $content
    Write-Host "Created specification for $assetName" -ForegroundColor Green
}

# 1. Firespirit - Fire Sprite
Create-AssetSpec -assetName "Firespirit" `
    -assetType "Enemy Battler" `
    -description "Fire elemental entity" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with fire elemental design" `
    -colors "Reds/oranges/yellows with flame effects and ember particles" `
    -animation "Flickering idle + fire-based attack animation (8-12 frames)" `
    -reference "Fire elemental with dynamic flame effects, similar to Earthspirit but with fire theme"

# 2. SF_TeddyBear - Animated version
Create-AssetSpec -assetName "SF_TeddyBear_animated" `
    -assetType "Enemy Battler" `
    -description "Possessed/security teddy bear" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with cute but menacing teddy bear" `
    -colors "Brown/tan with glowing red eyes and security force insignia" `
    -animation "Menacing idle animation (4-6 frames) + attack animation (6-8 frames)" `
    -reference "Cute teddy bear with sinister elements and security/military features"

# 3. Punk1 through Punk6 - Animated versions
Create-AssetSpec -assetName "punk1_animated" `
    -assetType "Enemy Battler" `
    -description "Basic punk enemy" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with gritty street punk aesthetic" `
    -colors "Neon colors against dark clothing, mohawk, leather" `
    -animation "Idle stance (4-6 frames) + attack animation (6-8 frames)" `
    -reference "80s/90s punk aesthetic with cyberpunk elements"

Create-AssetSpec -assetName "punk2_animated" `
    -assetType "Enemy Battler" `
    -description "Punk variant with blue mohawk" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with punk aesthetic (variant 2)" `
    -colors "Blue mohawk with leather jacket and chains" `
    -animation "Idle stance (4-6 frames) + melee attack animation (6-8 frames)" `
    -reference "Punk rocker with cyberpunk modifications"

Create-AssetSpec -assetName "punk3_animated" `
    -assetType "Enemy Battler" `
    -description "Punk variant with green spikes" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with punk aesthetic (variant 3)" `
    -colors "Green spikes with torn clothing and tech implants" `
    -animation "Idle stance (4-6 frames) + ranged attack animation (6-8 frames)" `
    -reference "Tech-enhanced punk with improvised weapons"

Create-AssetSpec -assetName "punk4_animated" `
    -assetType "Enemy Battler" `
    -description "Punk variant with red mohawk" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with punk aesthetic (variant 4)" `
    -colors "Red mohawk with studded jacket and cybernetic arm" `
    -animation "Idle stance (4-6 frames) + tech attack animation (6-8 frames)" `
    -reference "Cybernetically enhanced punk with attitude"

Create-AssetSpec -assetName "punk5_animated" `
    -assetType "Enemy Battler" `
    -description "Punk variant with purple hair" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with punk aesthetic (variant 5)" `
    -colors "Purple hair with metal accessories and tech gadgets" `
    -animation "Idle stance (4-6 frames) + gadget attack animation (6-8 frames)" `
    -reference "Tech-savvy punk with various gadgets"

Create-AssetSpec -assetName "punk6_animated" `
    -assetType "Enemy Battler" `
    -description "Punk variant with yellow mohawk" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with punk aesthetic (variant 6)" `
    -colors "Yellow mohawk with tattered clothes and makeshift armor" `
    -animation "Idle stance (4-6 frames) + heavy attack animation (6-8 frames)" `
    -reference "Heavily armored punk with improvised protection"

Create-AssetSpec -assetName "punkBoss1_animated" `
    -assetType "Enemy Battler" `
    -description "Punk leader/boss" `
    -size "96x96 pixels" `
    -style "16-bit pixel art with imposing punk leader design" `
    -colors "Multicolored mohawk with spiked armor and tech enhancements" `
    -animation "Intimidating idle (6-8 frames) + multiple attack animations (8-12 frames)" `
    -reference "Exaggerated punk gang leader with cybernetic augmentations"

# 4. Missing Ninja variants
Create-AssetSpec -assetName "greenninja_animated" `
    -assetType "Enemy Battler" `
    -description "Green-clad ninja" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with sleek ninja design" `
    -colors "Green/black with subtle neon highlights" `
    -animation "Stealthy idle (4-6 frames) + quick attack animation (6-8 frames)" `
    -reference "Classic ninja design with futuristic tech elements"

Create-AssetSpec -assetName "pinkninja_animated" `
    -assetType "Enemy Battler" `
    -description "Pink-clad ninja" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with sleek ninja design" `
    -colors "Pink/black with neon pink highlights" `
    -animation "Stealthy idle (4-6 frames) + quick attack animation (6-8 frames)" `
    -reference "Agile ninja with bright pink tech-enhanced outfit"

# 5. Missing Elemental Spirits
Create-AssetSpec -assetName "Windspirit_animated" `
    -assetType "Enemy Battler" `
    -description "Wind elemental entity" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with wind elemental design" `
    -colors "Light blues/whites with swirling air currents and leaf particles" `
    -animation "Swirling idle (6-8 frames) + wind-based attack animation (8-10 frames)" `
    -reference "Wind elemental with dynamic air current effects"

Create-AssetSpec -assetName "Waterspirit_animated" `
    -assetType "Enemy Battler" `
    -description "Water elemental entity" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with water elemental design" `
    -colors "Blues/cyans with flowing water effects and droplet particles" `
    -animation "Flowing idle (6-8 frames) + water-based attack animation (8-10 frames)" `
    -reference "Water elemental with dynamic liquid effects"

# 6. Missing Human Enemies
Create-AssetSpec -assetName "thug_animated" `
    -assetType "Enemy Battler" `
    -description "Basic thug" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with street thug design" `
    -colors "Dark urban colors with street wear" `
    -animation "Threatening idle (4-6 frames) + melee attack animation (6-8 frames)" `
    -reference "Urban street thug with cyberpunk elements"

Create-AssetSpec -assetName "gasman_animated" `
    -assetType "Enemy Battler" `
    -description "Gas Man" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with hazmat/gas mask design" `
    -colors "Yellow hazmat suit with dark mask and tanks" `
    -animation "Lumbering idle (4-6 frames) + gas attack animation (6-8 frames)" `
    -reference "Hazmat worker or gas mask-wearing enemy with toxic elements"

# 7. Missing Soldier variants
Create-AssetSpec -assetName "Soldier9_animated" `
    -assetType "Enemy Battler" `
    -description "Soldier variant" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with military design" `
    -colors "Military greens/browns with distinctive insignia" `
    -animation "Military stance idle (4-6 frames) + rifle attack animation (6-8 frames)" `
    -reference "Military soldier with futuristic equipment"

Create-AssetSpec -assetName "Soldier10_animated" `
    -assetType "Enemy Battler" `
    -description "Soldier variant" `
    -size "64x64 pixels" `
    -style "16-bit pixel art with military design" `
    -colors "Desert camo with distinctive insignia" `
    -animation "Military stance idle (4-6 frames) + rifle attack animation (6-8 frames)" `
    -reference "Desert ops soldier with futuristic equipment"

# Animation Frame Guidelines
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

# Sprite Sheet Layout
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

Write-Host "=== Art Style Guidelines ===" -ForegroundColor Yellow
Write-Host "- Overall Style: 16-bit pixel art with a cyberpunk aesthetic"
Write-Host "- Detail Level: Medium to high detail with clear silhouettes"
Write-Host "- Theme: Cyberpunk with elements of humor, absurdity, and digital glitches"
Write-Host "- Color palette: Neon colors against dark backgrounds for cyberpunk areas"
Write-Host "- Animations should be smooth but maintain the pixel art style (no tweening)"
Write-Host "- Consider the game's humor when designing assets - exaggeration and absurdity are welcome"
Write-Host ""

Write-Host "Art asset specifications have been created in the '$newAssetsDir' directory." -ForegroundColor Green
Write-Host "Use these specifications to create the actual pixel art assets." -ForegroundColor Green
