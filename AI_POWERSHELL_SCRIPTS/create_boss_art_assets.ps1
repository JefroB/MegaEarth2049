# MegaEarth2049 Boss Art Asset Creation Script
# This script provides instructions and specifications for creating boss art assets

# Create a directory for boss art assets if it doesn't exist
$bossAssetsDir = "boss_art_assets"
if (-not (Test-Path $bossAssetsDir)) {
    New-Item -ItemType Directory -Path $bossAssetsDir -Force
}

Write-Host "=== MegaEarth2049 Boss Art Asset Creation Guide ===" -ForegroundColor Cyan
Write-Host "This script provides specifications for creating boss art assets." -ForegroundColor Cyan
Write-Host ""

# Function to create a text file with specifications for a boss asset
function Create-BossAssetSpec {
    param (
        [string]$assetName,
        [string]$description,
        [string]$size = "96x96 pixels",
        [string]$style,
        [string]$colors,
        [string]$animation,
        [string]$reference,
        [string]$specialEffects = "Should include a 'near-death' state that flashes red when HP is low"
    )

    $specPath = Join-Path $bossAssetsDir "$assetName.txt"
    
    $content = @"
=== $assetName ===
Type: Boss Enemy Battler
Description: $description
Size: $size
Style: $style
Colors: $colors
Animation: $animation
Special Effects: $specialEffects
Reference: $reference

"@

    Set-Content -Path $specPath -Value $content
    Write-Host "Created specification for $assetName" -ForegroundColor Green
}

# Boss Enemies
Create-BossAssetSpec -assetName "punkBoss1_animated" `
    -description "Punk leader/boss - Imposing gang leader with cybernetic enhancements" `
    -style "16-bit pixel art with exaggerated punk features and imposing presence" `
    -colors "Multicolored mohawk with spiked armor and tech enhancements, neon highlights against dark clothing" `
    -animation "Intimidating idle (6-8 frames) + multiple attack animations (8-12 frames) + damage reaction (4-6 frames) + near-death state" `
    -reference "Exaggerated punk gang leader with cybernetic augmentations, imposing and threatening"

Create-BossAssetSpec -assetName "corporateBoss_animated" `
    -description "Corporate executive with combat enhancements" `
    -style "16-bit pixel art with corporate aesthetic and hidden weapons" `
    -colors "Business suit with corporate logo, glowing cybernetic enhancements revealed during combat" `
    -animation "Professional idle stance (6-8 frames) + transformation to combat mode (8 frames) + multiple attack animations (8-12 frames) + damage reaction (4-6 frames) + near-death state" `
    -reference "Corporate executive with hidden combat capabilities, reveals cybernetic enhancements during battle"

Create-BossAssetSpec -assetName "ninjaLord_animated" `
    -description "Master ninja with advanced tech" `
    -size "96x96 pixels" `
    -style "16-bit pixel art with sleek ninja design and high-tech enhancements" `
    -colors "Black/gold with glowing tech highlights and weapon effects" `
    -animation "Stealthy idle (6-8 frames) + multiple quick attack animations (8-12 frames) + teleport effect (6 frames) + damage reaction (4-6 frames) + near-death state" `
    -reference "Master ninja with futuristic tech enhancements, extremely agile and deadly"

Create-BossAssetSpec -assetName "alienOverlord_animated" `
    -description "Alien leader with psychic abilities" `
    -style "16-bit pixel art with otherworldly alien design" `
    -colors "Unusual alien color scheme with glowing psychic effects" `
    -animation "Hovering idle (6-8 frames) + psychic attack animations (8-12 frames) + mind control effect (8 frames) + damage reaction (4-6 frames) + near-death state" `
    -reference "Alien entity with obvious intelligence and psychic capabilities, otherworldly and unsettling"

Create-BossAssetSpec -assetName "roboticTitan_animated" `
    -description "Massive security robot with heavy weaponry" `
    -style "16-bit pixel art with imposing mechanical design" `
    -colors "Industrial metals with warning lights and corporate branding" `
    -animation "Mechanical idle with moving parts (6-8 frames) + weapon deployment animations (6-8 frames) + attack animations (8-12 frames) + damage reaction with exposed circuits (4-6 frames) + near-death state" `
    -reference "Massive security robot with multiple weapon systems, industrial and threatening"

Create-BossAssetSpec -assetName "elementalLord_animated" `
    -description "Fusion of elemental spirits into a powerful entity" `
    -style "16-bit pixel art with elemental fusion design" `
    -colors "Swirling combination of elemental colors (fire, earth, water, wind) with energy effects" `
    -animation "Swirling elemental idle (6-8 frames) + elemental attack animations (8-12 frames for each element) + transformation between elements (6-8 frames) + damage reaction (4-6 frames) + near-death state" `
    -reference "Powerful entity composed of swirling elemental energies, constantly shifting between elements"

Create-BossAssetSpec -assetName "digitalEntity_animated" `
    -description "Digital consciousness manifested in reality" `
    -style "16-bit pixel art with digital/glitch aesthetic" `
    -colors "Digital blues/greens with glitch effects and corruption artifacts" `
    -animation "Glitching idle animation (6-8 frames) + reality distortion attacks (8-12 frames) + corruption effect (8 frames) + damage reaction with code exposure (4-6 frames) + near-death state" `
    -reference "Digital entity with glitching effects and reality-warping capabilities, abstract and unsettling"

Create-BossAssetSpec -assetName "mutantBehemoth_animated" `
    -description "Massive mutated creature from the sewers" `
    -style "16-bit pixel art with grotesque mutant design" `
    -colors "Toxic greens/purples with oozing effects and biological mutations" `
    -animation "Lumbering idle with pulsing mutations (6-8 frames) + toxic attack animations (8-12 frames) + mutation transformation (8 frames) + damage reaction (4-6 frames) + near-death state" `
    -reference "Grotesque sewer mutant of massive proportions, disgusting and threatening"

# Animation Frame Guidelines
Write-Host ""
Write-Host "=== Boss Animation Frame Guidelines ===" -ForegroundColor Yellow
Write-Host "For each boss sprite, create the following frames:" -ForegroundColor Yellow
Write-Host "1. Idle Animation (6-8 frames)"
Write-Host "   - Frame 1: Base pose"
Write-Host "   - Frame 2-4: Subtle movement (breathing, shifting weight, mechanical parts moving)"
Write-Host "   - Frame 5-8: Return to base pose with variations"
Write-Host ""
Write-Host "2. Attack Animations (8-12 frames per attack type)"
Write-Host "   - Frame 1-2: Wind-up/preparation"
Write-Host "   - Frame 3-6: Attack execution"
Write-Host "   - Frame 7-10: Attack impact/follow-through"
Write-Host "   - Frame 11-12: Recovery to idle (for longer animations)"
Write-Host ""
Write-Host "3. Damage Reaction (4-6 frames)"
Write-Host "   - Frame 1-2: Impact pose"
Write-Host "   - Frame 3-6: Recoil and recovery"
Write-Host ""
Write-Host "4. Near-Death State (4 frames)"
Write-Host "   - These frames should be identical to the idle animation frames"
Write-Host "   - But with a red tint/flash effect applied"
Write-Host "   - These will be used when the boss is at low health"
Write-Host ""

# Sprite Sheet Layout
Write-Host "=== Boss Sprite Sheet Layout ===" -ForegroundColor Yellow
Write-Host "Arrange animation frames horizontally in a sprite sheet:" -ForegroundColor Yellow
Write-Host "- For 96x96 pixel boss sprites with 8 frames: Create a 768x96 pixel sprite sheet"
Write-Host "- For 96x96 pixel boss sprites with 12 frames: Create a 1152x96 pixel sprite sheet"
Write-Host ""
Write-Host "You can also arrange multiple animations vertically:"
Write-Host "- Row 1: Idle animation frames"
Write-Host "- Row 2: Attack animation frames (primary attack)"
Write-Host "- Row 3: Attack animation frames (secondary attack)"
Write-Host "- Row 4: Damage reaction frames"
Write-Host "- Row 5: Near-death state frames (red-tinted versions of idle frames)"
Write-Host ""

Write-Host "=== Boss Art Style Guidelines ===" -ForegroundColor Yellow
Write-Host "- Overall Style: 16-bit pixel art with a cyberpunk aesthetic"
Write-Host "- Size: 96x96 pixels for all boss sprites (larger than standard 64x64 enemies)"
Write-Host "- Detail Level: High detail with clear silhouettes and imposing presence"
Write-Host "- Theme: Cyberpunk with elements of humor, absurdity, and digital glitches"
Write-Host "- Color palette: Bold, contrasting colors with special effects"
Write-Host "- Animations should be more elaborate than standard enemies"
Write-Host "- Near-death state should include red flashing effect"
Write-Host "- Consider the game's humor when designing assets - exaggeration and absurdity are welcome"
Write-Host ""

Write-Host "Boss art asset specifications have been created in the '$bossAssetsDir' directory." -ForegroundColor Green
Write-Host "Use these specifications to create the actual pixel art assets for boss enemies." -ForegroundColor Green
