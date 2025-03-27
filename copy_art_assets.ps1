# Script to copy art assets from sv_actors to sv_enemies
# Based on the Enemies.json file

# List of assets to copy
$assets = @(
    # Punk enemies
    "punk1.png",
    "punk2.png",
    "punk3.png",
    "punk4.png",
    "punk5.png",
    "punk6.png",
    "punkBoss1.png",
    
    # Ninja enemies
    "greenninja.png",
    "pinkninja.png",
    "brownninja.png",
    "blueninja.png",
    "redninja.png",
    "purpleninja.png",
    "blackninja.png",
    
    # Bat enemies
    "bat260403995.png",
    "bat376613098.png",
    "bat390232047.png",
    "bat509613732.png",
    "bat592287193.png",
    
    # Plant enemies
    "plant-default_orig.png",
    "plant-green_orig.png",
    "plant-red_orig.png",
    "plant-white_orig.png",
    "plant-wilted_orig.png",
    
    # Rat enemies
    "rat410648364_orig.png",
    "rat648556256.png",
    "rat657494608.png",
    "rat8615651156.png",
    "rat960466383.png",
    
    # Slime enemies
    "Slime518641091.png",
    "Slime630683762.png",
    "Slime767690166.png",
    "Slime966520927.png",
    "Slime112319373.png",
    
    # Alien enemies
    "Alien210143_orig.png",
    "Alien357178_orig.png",
    "Alien7137221_orig.png",
    
    # Cockatrice enemies
    "cockatrice115023772.png",
    "cockatrice155586115.png",
    "cockatrice259886913.png",
    "cockatrice446945148.png",
    "cockatrice756463860.png",
    
    # Drone enemies
    "Drone108499806.png",
    "Drone285035104.png",
    "Drone544904500.png",
    "Drone579342351.png",
    "Drone924648649.png",
    
    # Wolf enemies
    "wolf-grey-sv_orig.png",
    "wolf-black-sv_orig.png",
    "wolf-brown-sv_orig.png",
    "wolf-red-sv_orig.png",
    "wolf-tawny-sv_orig.png",
    "wolf-white-sv_orig.png",
    
    # Snake enemies
    "snake-hornless_orig.png",
    "snake-black-red_orig.png",
    "snake-black-white_orig.png",
    "snake-green_orig.png",
    "snake-orange-yellow_orig.png",
    
    # Ogre enemies
    "ogre-default_orig.png",
    "ogre-black_orig.png",
    "ogre-gold_orig.png",
    "ogre-green_orig.png",
    "ogre-red_orig.png",
    
    # Rooster enemies
    "Rooster149380371.png",
    "Rooster363225764_orig.png",
    "Rooster447517918_orig.png",
    "Rooster898196553.png",
    
    # Scorpion enemies
    "Scorpion204715142.png",
    "Scorpion637723660.png",
    "Scorpion564165695.png",
    "Scorpion518206421_orig.png",
    "Scorpion462545871_orig.png",
    
    # Spider enemies
    "spider213583399.png",
    "spider456796641.png",
    "spider570665783.png",
    "spider776702305_orig.png",
    "spider930284473.png",
    
    # Fox enemies
    "fox-orange_1_orig.png",
    "fox-sandy_orig.png",
    "fox-red_orig.png",
    "fox-silver_1_orig.png",
    "fox-white_1_orig.png",
    
    # Special fox enemies
    "3-tailed-fox-fire_1_orig.png",
    "3-tailed-fox-hellspawn_1_orig.png",
    "3-tailed-fox-ice_1_orig.png",
    "3-tailed-fox-normal_orig.png",
    "3-tailed-fox-spirit_orig.png",
    
    # Hornet/Bee enemies
    "hornet282287884.png",
    "hornet458985464.png",
    "hornet467842573.png",
    "hornet733005933.png",
    "hornet842594948_orig.png",
    
    # A.S.P. entities
    "dark_lord__b_w_.png",
    "dark_lord__gold_.png",
    "dark_lord__green_.png",
    "demon-default_1_orig.png",
    "demon-blue_1_orig.png",
    "demon-brown_1_orig.png",
    "demon-red_1_orig.png",
    "demon-white_1_orig.png"
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

Write-Host "Art assets copying complete!"
