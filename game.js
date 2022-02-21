let firstScene = new Phaser.Scene('FirstScene');

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:600 },
            debug: false
        }
    },
    scene: firstScene
};

let game = new Phaser.Game(config);

var player_red;
var player_blue;
var platforms;

var wKey;
var aKey;
var dKey;

var playerSpeed = 160;
var jumpSpeed = 450;

firstScene.preload = function() {
    this.load.image('guy_blue', 'assets/guy_idle_blue.png');
    this.load.image('guy_red', 'assets/guy_idle_red.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('platform', 'assets/platform.png');
}

firstScene.create = function() {
    this.add.image(400, 300, 'sky');
    
    platforms = this.physics.add.staticGroup();
    
    platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    
    platforms.create(600, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(750, 220, 'platform');
    
    player_red = this.physics.add.sprite(100, 450, 'guy_red').setScale(0.2);
    player_red.setBounce(0);
    player_red.setCollideWorldBounds(true);
    
    player_blue = this.physics.add.sprite(700, 450, 'guy_blue').setScale(0.2);
    player_blue.setBounce(0);
    player_blue.setCollideWorldBounds(true);
    
    //Collide Player with Platforms
    this.physics.add.collider(player_red, platforms);
    this.physics.add.collider(player_blue, platforms);
    
    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
    
    //Second Player Keys
    /*this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);*/
}

firstScene.update = function() {
    playerMovement();
    
    
}

function playerMovement () {
    // Red Movement
    if (cursors.left.isDown) {
        player_red.setVelocityX(-playerSpeed);
    }
    else if (cursors.right.isDown) {
        player_red.setVelocityX(playerSpeed);
    }
    else {
        player_red.setVelocityX(0);
    }
    if (cursors.up.isDown && player_red.body.touching.down) {
        player_red.setVelocityY(-jumpSpeed);
    }
    
    //Blue Movement 
    /*if (dKey.isDown) {
        player_red.setVelocityX(-playerSpeed);
    }
    else if (aKey.isDown) {
        player_red.setVelocityX(playerSpeed);
    }
    else {
        player_red.setVelocityX(0);
    }
    if (wKey.isDown && player_red.body.touching.down) {
        player_red.setVelocityY(-jumpSpeed);
    }*/
}