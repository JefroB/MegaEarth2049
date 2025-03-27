# MegaEarth2049 Enemies.json Update Script
# This script will update the Enemies.json file to reference the new animated sprites

Write-Host "=== MegaEarth2049 Enemies.json Update Script ===" -ForegroundColor Cyan
Write-Host "This script will update the Enemies.json file to reference the new animated sprites." -ForegroundColor Cyan
Write-Host ""

# Backup the original Enemies.json file
$enemiesJsonPath = "data/Enemies.json"
$backupPath = "data/Enemies.json.bak"

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

# Function to add a new enemy entry
function Add-NewEnemy {
    param (
        [int]$id,
        [string]$name,
        [string]$battlerName,
        [string]$note = "",
        [int]$exp = 5,
        [int]$gold = 5,
        [int]$hp = 1500,
        [int]$mp = 30,
        [int]$atk = 30,
        [int]$def = 30,
        [int]$mat = 30,
        [int]$mdf = 30,
        [int]$agi = 30,
        [int]$luk = 30
    )
    
    # Create a new enemy entry
    $newEnemy = @"
,{"id":$id,"actions":[{"conditionParam1":0,"conditionParam2":0,"conditionType":0,"rating":5,"skillId":1}],"battlerHue":0,"battlerName":"$battlerName","dropItems":[{"kind":1,"dataId":1,"denominator":3},{"dataId":1,"denominator":1,"kind":0},{"dataId":1,"denominator":1,"kind":0}],"exp":$exp,"traits":[{"code":22,"dataId":0,"value":0.95},{"code":22,"dataId":1,"value":0.05},{"code":31,"dataId":1,"value":0}],"gold":$gold,"name":"$name","note":"$note","params":[$hp,$mp,$atk,$def,$mat,$mdf,$agi,$luk]}
"@
    
    # Add the new enemy to the JSON (before the last closing bracket)
    $enemiesJson = $enemiesJson -replace "\]$", "$newEnemy]"
    
    Write-Host "Added new enemy: $name (ID: $id) with battlerName $battlerName" -ForegroundColor Green
    return $enemiesJson
}

# Update existing enemies to use the new animated sprites
$updates = @(
    @{Name = "Fire Sprite"; OldBattlerName = "Firespirit"; NewBattlerName = "Firespirit_animated"},
    @{Name = "Earth Sprite"; OldBattlerName = "Earthspirit"; NewBattlerName = "Earthspirit_animated"},
    @{Name = "Water Sprite"; OldBattlerName = "Waterspirit"; NewBattlerName = "Waterspirit_animated"},
    @{Name = "Wind Sprite"; OldBattlerName = "Windspirit"; NewBattlerName = "Windspirit_animated"},
    @{Name = "Thug"; OldBattlerName = "thug"; NewBattlerName = "thug_animated"},
    @{Name = "Gas Man"; OldBattlerName = "gasman"; NewBattlerName = "gasman_animated"},
    @{Name = "Green Ninja"; OldBattlerName = "greenninja"; NewBattlerName = "greenninja_animated"},
    @{Name = "Pink Ninja"; OldBattlerName = "pinkninja"; NewBattlerName = "pinkninja_animated"},
    @{Name = "Brown Ninja"; OldBattlerName = "brownninja"; NewBattlerName = "brownninja_animated"},
    @{Name = "Blue Ninja"; OldBattlerName = "blueninja"; NewBattlerName = "blueninja_animated"},
    @{Name = "Red Ninja"; OldBattlerName = "redninja"; NewBattlerName = "redninja_animated"},
    @{Name = "Purple Ninja"; OldBattlerName = "purpleninja"; NewBattlerName = "purpleninja_animated"},
    @{Name = "Ninja"; OldBattlerName = "blackninja"; NewBattlerName = "blackninja_animated"}
)

foreach ($update in $updates) {
    Update-EnemyBattlerName -enemyName $update.Name -oldBattlerName $update.OldBattlerName -newBattlerName $update.NewBattlerName
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

# Add new enemies that don't exist yet
$newEnemies = @(
    @{
        Id = $highestId + 1
        Name = "Security Teddy"
        BattlerName = "SF_TeddyBear_animated"
        Note = "<Show Level>`n<Minimum Level: 10>`n<Maximum Level: 35>`n<Positive Level Fluctuation: 1>`n<Negative Level Fluctuation: 3>`n<Starting Level Type: 3>"
        Exp = 8
        Gold = 10
        Hp = 2000
        Mp = 30
        Atk = 40
        Def = 35
        Mat = 20
        Mdf = 25
        Agi = 15
        Luk = 10
    }
)

foreach ($enemy in $newEnemies) {
    $enemiesJson = Add-NewEnemy -id $enemy.Id -name $enemy.Name -battlerName $enemy.BattlerName -note $enemy.Note `
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
Write-Host "- Updated battlerName references to use the new animated sprites"
Write-Host "- Added new enemies with references to the new animated sprites"
Write-Host ""
Write-Host "Note: These changes assume that the animated sprite files will be created and placed in the img/sv_enemies directory." -ForegroundColor Yellow
Write-Host "Run the create_art_assets.ps1 script to generate specifications for the required art assets." -ForegroundColor Yellow
