# MegaEarth2049 Boss Enemies.json Update Script
# This script will update the Enemies.json file to add boss-specific features

Write-Host "=== MegaEarth2049 Boss Enemies.json Update Script ===" -ForegroundColor Cyan
Write-Host "This script will update the Enemies.json file to add boss-specific features, including near-death red flashing." -ForegroundColor Cyan
Write-Host ""

# Backup the original Enemies.json file
$enemiesJsonPath = "data/Enemies.json"
$backupPath = "data/Enemies.json.boss.bak"

if (Test-Path $enemiesJsonPath) {
    Write-Host "Creating backup of Enemies.json..." -ForegroundColor Yellow
    Copy-Item -Path $enemiesJsonPath -Destination $backupPath -Force
    Write-Host "Backup created at $backupPath" -ForegroundColor Green
} else {
    Write-Host "Error: Enemies.json not found at $enemiesJsonPath" -ForegroundColor Red
    exit
}

# Read the Enemies.json file
$enemiesJson = Get-Content -Path $enemiesJsonPath -Raw

# Function to update battlerName for an enemy
function Update-EnemyBattlerName {
    param (
        [string]$enemyName,
        [string]$oldBattlerName,
        [string]$newBattlerName
    )
    
    # Create a pattern to match the enemy entry with the old battlerName
    $pattern = "(?s)(\{[^\{]*?""name"":""$enemyName""[^\{]*?""battlerName"":""$oldBattlerName""[^\{]*?\})"
    
    # Check if the pattern exists in the JSON
    if ($enemiesJson -match $pattern) {
        $match = $Matches[1]
        
        # Replace the battlerName with the new one
        $updatedMatch = $match -replace """battlerName"":""$oldBattlerName""", """battlerName"":""$newBattlerName"""
        
        # Update the JSON
        $enemiesJson = $enemiesJson -replace [regex]::Escape($match), $updatedMatch
        
        Write-Host "Updated battlerName for $enemyName from $oldBattlerName to $newBattlerName" -ForegroundColor Green
        return $true
    } else {
        Write-Host "Warning: Could not find enemy $enemyName with battlerName $oldBattlerName" -ForegroundColor Yellow
        return $false
    }
}

# Function to add boss-specific note tags to an enemy
function Add-BossNoteTags {
    param (
        [string]$enemyName,
        [string]$battlerName,
        [bool]$flashWhenNearDeath = $true,
        [int]$nearDeathThreshold = 25  # Percentage of HP
    )
    
    # Create a pattern to match the enemy entry
    $pattern = "(?s)(\{[^\{]*?""name"":""$enemyName""[^\{]*?""battlerName"":""$battlerName""[^\{]*?""note"":"")(.*?)(""))"
    
    # Check if the pattern exists in the JSON
    if ($enemiesJson -match $pattern) {
        $match = $Matches[1]
        $existingNote = $Matches[2]
        $endQuote = $Matches[3]
        
        # Prepare the boss note tags
        $bossNoteTags = @()
        $bossNoteTags += "<Boss Enemy>"
        
        if ($flashWhenNearDeath) {
            $bossNoteTags += "<Flash When Near Death>"
            $bossNoteTags += "<Near Death Threshold: $nearDeathThreshold>"
        }
        
        # Combine with existing note, ensuring we don't duplicate tags
        $existingNoteTags = $existingNote -split "\\n"
        foreach ($tag in $bossNoteTags) {
            if ($existingNoteTags -notcontains $tag) {
                $existingNote += "\\n$tag"
            }
        }
        
        # Update the JSON
        $updatedMatch = $match + $existingNote + $endQuote
        $enemiesJson = $enemiesJson -replace [regex]::Escape($match + $existingNote + $endQuote), $updatedMatch
        
        Write-Host "Added boss note tags to $enemyName" -ForegroundColor Green
        return $true
    } else {
        Write-Host "Warning: Could not find enemy $enemyName with battlerName $battlerName" -ForegroundColor Yellow
        return $false
    }
}

# Function to add a new boss enemy entry
function Add-NewBossEnemy {
    param (
        [int]$id,
        [string]$name,
        [string]$battlerName,
        [string]$note = "",
        [int]$exp = 50,
        [int]$gold = 100,
        [int]$hp = 5000,
        [int]$mp = 100,
        [int]$atk = 80,
        [int]$def = 70,
        [int]$mat = 70,
        [int]$mdf = 70,
        [int]$agi = 50,
        [int]$luk = 50,
        [bool]$flashWhenNearDeath = $true,
        [int]$nearDeathThreshold = 25
    )
    
    # Add boss-specific note tags
    $bossNoteTags = @()
    $bossNoteTags += "<Boss Enemy>"
    $bossNoteTags += "<Sideview Battler: $battlerName>"
    $bossNoteTags += "<Sideview Frame Width: 96>"
    $bossNoteTags += "<Sideview Frame Height: 96>"
    $bossNoteTags += "<Sideview Animation Frames: 8>"
    
    if ($flashWhenNearDeath) {
        $bossNoteTags += "<Flash When Near Death>"
        $bossNoteTags += "<Near Death Threshold: $nearDeathThreshold>"
    }
    
    # Combine with existing note
    if ($note -ne "") {
        $note += "\\n"
    }
    $note += $bossNoteTags -join "\\n"
    
    # Create a new enemy entry
    $newEnemy = @"
,{"id":$id,"actions":[{"conditionParam1":0,"conditionParam2":0,"conditionType":0,"rating":5,"skillId":1},{"conditionParam1":2,"conditionParam2":0.5,"conditionType":1,"rating":9,"skillId":10}],"battlerHue":0,"battlerName":"$battlerName","dropItems":[{"kind":1,"dataId":1,"denominator":1},{"kind":1,"dataId":2,"denominator":2},{"kind":1,"dataId":3,"denominator":3}],"exp":$exp,"traits":[{"code":22,"dataId":0,"value":0.95},{"code":22,"dataId":1,"value":0.05},{"code":31,"dataId":1,"value":0}],"gold":$gold,"name":"$name","note":"$note","params":[$hp,$mp,$atk,$def,$mat,$mdf,$agi,$luk]}
"@
    
    # Add the new enemy to the JSON (before the last closing bracket)
    $enemiesJson = $enemiesJson -replace "\]$", "$newEnemy]"
    
    Write-Host "Added new boss enemy: $name (ID: $id) with battlerName $battlerName" -ForegroundColor Green
    return $enemiesJson
}

# Update existing boss enemies to use the new animated sprites and add boss-specific features
$bossUpdates = @(
    @{Name = "Punk Boss"; OldBattlerName = "punkBoss1"; NewBattlerName = "punkBoss1_animated"}
)

foreach ($update in $bossUpdates) {
    $updated = Update-EnemyBattlerName -enemyName $update.Name -oldBattlerName $update.OldBattlerName -newBattlerName $update.NewBattlerName
    
    if ($updated) {
        Add-BossNoteTags -enemyName $update.Name -battlerName $update.NewBattlerName -flashWhenNearDeath $true -nearDeathThreshold 25
    }
}

# Get the highest enemy ID in the current JSON
$highestId = 0
$idPattern = """id"":(\d+)"
$matches = [regex]::Matches($enemiesJson, $idPattern)
foreach ($match in $matches) {
    $id = [int]$match.Groups[1].Value
    if ($id -gt $highestId) {
        $highestId = $id
    }
}

Write-Host "Highest existing enemy ID: $highestId" -ForegroundColor Yellow

# Add new boss enemies that don't exist yet
$newBossEnemies = @(
    @{
        Id = $highestId + 1
        Name = "Corporate Boss"
        BattlerName = "corporateBoss_animated"
        Note = "<Show Level>\n<Minimum Level: 20>\n<Maximum Level: 40>\n<Positive Level Fluctuation: 0>\n<Negative Level Fluctuation: 0>\n<Starting Level Type: 5>"
        Exp = 100
        Gold = 200
        Hp = 6000
        Mp = 150
        Atk = 85
        Def = 75
        Mat = 80
        Mdf = 75
        Agi = 60
        Luk = 55
    },
    @{
        Id = $highestId + 2
        Name = "Ninja Lord"
        BattlerName = "ninjaLord_animated"
        Note = "<Show Level>\n<Minimum Level: 25>\n<Maximum Level: 45>\n<Positive Level Fluctuation: 0>\n<Negative Level Fluctuation: 0>\n<Starting Level Type: 5>"
        Exp = 120
        Gold = 180
        Hp = 5500
        Mp = 200
        Atk = 90
        Def = 70
        Mat = 85
        Mdf = 80
        Agi = 95
        Luk = 70
    },
    @{
        Id = $highestId + 3
        Name = "Alien Overlord"
        BattlerName = "alienOverlord_animated"
        Note = "<Show Level>\n<Minimum Level: 30>\n<Maximum Level: 50>\n<Positive Level Fluctuation: 0>\n<Negative Level Fluctuation: 0>\n<Starting Level Type: 5>"
        Exp = 150
        Gold = 250
        Hp = 7000
        Mp = 300
        Atk = 75
        Def = 80
        Mat = 100
        Mdf = 90
        Agi = 70
        Luk = 65
    },
    @{
        Id = $highestId + 4
        Name = "Robotic Titan"
        BattlerName = "roboticTitan_animated"
        Note = "<Show Level>\n<Minimum Level: 35>\n<Maximum Level: 55>\n<Positive Level Fluctuation: 0>\n<Negative Level Fluctuation: 0>\n<Starting Level Type: 5>"
        Exp = 180
        Gold = 300
        Hp = 8000
        Mp = 100
        Atk = 100
        Def = 95
        Mat = 60
        Mdf = 85
        Agi = 40
        Luk = 50
    },
    @{
        Id = $highestId + 5
        Name = "Elemental Lord"
        BattlerName = "elementalLord_animated"
        Note = "<Show Level>\n<Minimum Level: 40>\n<Maximum Level: 60>\n<Positive Level Fluctuation: 0>\n<Negative Level Fluctuation: 0>\n<Starting Level Type: 5>"
        Exp = 200
        Gold = 350
        Hp = 7500
        Mp = 400
        Atk = 85
        Def = 85
        Mat = 110
        Mdf = 100
        Agi = 80
        Luk = 75
    },
    @{
        Id = $highestId + 6
        Name = "Digital Entity"
        BattlerName = "digitalEntity_animated"
        Note = "<Show Level>\n<Minimum Level: 45>\n<Maximum Level: 65>\n<Positive Level Fluctuation: 0>\n<Negative Level Fluctuation: 0>\n<Starting Level Type: 5>"
        Exp = 220
        Gold = 400
        Hp = 7000
        Mp = 500
        Atk = 80
        Def = 80
        Mat = 120
        Mdf = 110
        Agi = 90
        Luk = 85
    },
    @{
        Id = $highestId + 7
        Name = "Mutant Behemoth"
        BattlerName = "mutantBehemoth_animated"
        Note = "<Show Level>\n<Minimum Level: 50>\n<Maximum Level: 70>\n<Positive Level Fluctuation: 0>\n<Negative Level Fluctuation: 0>\n<Starting Level Type: 5>"
        Exp = 250
        Gold = 450
        Hp = 9000
        Mp = 200
        Atk = 110
        Def = 100
        Mat = 80
        Mdf = 90
        Agi = 60
        Luk = 70
    }
)

foreach ($enemy in $newBossEnemies) {
    $enemiesJson = Add-NewBossEnemy -id $enemy.Id -name $enemy.Name -battlerName $enemy.BattlerName -note $enemy.Note `
                              -exp $enemy.Exp -gold $enemy.Gold -hp $enemy.Hp -mp $enemy.Mp -atk $enemy.Atk `
                              -def $enemy.Def -mat $enemy.Mat -mdf $enemy.Mdf -agi $enemy.Agi -luk $enemy.Luk
}

# Save the updated JSON
Write-Host "Saving updated Enemies.json..." -ForegroundColor Yellow
Set-Content -Path $enemiesJsonPath -Value $enemiesJson
Write-Host "Enemies.json has been updated successfully!" -ForegroundColor Green
Write-Host "Original file was backed up to $backupPath" -ForegroundColor Green

Write-Host ""
Write-Host "=== Summary of Changes ===" -ForegroundColor Cyan
Write-Host "- Updated existing boss enemies to use the new animated sprites"
Write-Host "- Added boss-specific note tags for special features like flashing when near death"
Write-Host "- Added new boss enemies with references to the new animated sprites"
Write-Host ""
Write-Host "=== Boss Features Added ===" -ForegroundColor Yellow
Write-Host "- <Boss Enemy> tag to identify boss enemies"
Write-Host "- <Flash When Near Death> tag to enable red flashing when HP is low"
Write-Host "- <Near Death Threshold: 25> tag to set the HP percentage threshold for near-death state (default: 25%)"
Write-Host "- Larger sprite size (96x96 pixels) for more imposing boss presence"
Write-Host "- Higher stats and better rewards (EXP, gold, items) for boss enemies"
Write-Host ""
Write-Host "Note: These changes assume that the boss sprite files will be created and placed in the img/sv_enemies directory." -ForegroundColor Yellow
Write-Host "Run the create_boss_art_assets.ps1 script to generate specifications for the required boss art assets." -ForegroundColor Yellow
Write-Host "Run the generate_boss_placeholder_sprites.ps1 script to create placeholder sprites for testing." -ForegroundColor Yellow

# Add a note about implementing the boss features in the game code
Write-Host ""
Write-Host "=== Implementation Note ===" -ForegroundColor Red
Write-Host "To fully implement the boss features, you'll need to add code to the game engine to:" -ForegroundColor Red
Write-Host "1. Detect the <Boss Enemy> tag and apply special boss behaviors"
Write-Host "2. Implement the red flashing effect when a boss's HP falls below the near-death threshold"
Write-Host "3. Handle the larger sprite size (96x96) for boss enemies"
Write-Host ""
Write-Host "This script only adds the necessary data to Enemies.json. The actual implementation of these features" -ForegroundColor Red
Write-Host "requires modifications to the game's JavaScript code." -ForegroundColor Red
