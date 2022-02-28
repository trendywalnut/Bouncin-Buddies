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
var player_red_jump = false;
var balloons;

var score = 0;
var scoreText;

var timer;
var total = 0;

var wKey;
var aKey;
var dKey;

var playerSpeed = 220;
var jumpSpeed = 450;

firstScene.preload = function() {
    this.load.spritesheet('guy_red', 'assets/guy_spritesheet_red.png', { frameWidth: 366, frameHeight: 252});
    this.load.spritesheet('guy_blue', 'assets/guy_spritesheet_blue.png', { frameWidth: 366, frameHeight: 252});
    this.load.image('balloon', 'assets/balloon.png');
    //this.load.image('guy_red', 'assets/guy_idle_red.png');
    this.load.image('sky', 'assets/background_sky2d.png');
    this.load.image('platform', 'assets/platform_grass.png');
    this.load.image('ground', 'assets/foreground_grass.png');
}

firstScene.create = function() {
    this.add.image(400, 300, 'sky');
    
    platforms = this.physics.add.staticGroup();
    
    platforms.create(400, 568, 'ground').setScale(1).refreshBody();
    
    platforms.create(600, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(750, 220, 'platform');
    
    player_red = this.physics.add.sprite(100, 450, 'guy_red').setScale(0.2);
    player_red.setBounce(0.1);
    player_red.setCollideWorldBounds(true);
    
    this.anims.create({
        key: 'red_idle',
        frames: [ { key: 'guy_red', frame: 0}],
        frameRate: 10,
        repeat: -1
    });
    
    
    this.anims.create({
        key: 'red_move',
        frames: [ { key: 'guy_red', frame: 1}],
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'red_jump',
        frames: [ { key: 'guy_red', frame: 2}],
        frameRate: 10,
        repeat: -1
    });
    
    
    player_blue = this.physics.add.sprite(700, 450, 'guy_blue').setScale(0.2);
    player_blue.setBounce(0.2);
    player_blue.setCollideWorldBounds(true);
    
    this.anims.create({
        key: 'blue_idle',
        frames: [ { key: 'guy_blue', frame: 0}],
        frameRate: 10,
        repeat: -1
    });
    
    
    this.anims.create({
        key: 'blue_move',
        frames: [ { key: 'guy_blue', frame: 1}],
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'blue_jump',
        frames: [ { key: 'guy_blue', frame: 2}],
        frameRate: 10,
        repeat: -1
    });
    
    //balloon group
    balloons = this.physics.add.group({
        key: 'balloon',
        repeat: 3,
        setXY: {x: 12, y: 0, stepX: 70}
    });
    
    
    balloons.children.iterate(function(child){
        child.setScale(0.5);
        child.setVelocity(0, Phaser.Math.Between(-100, 100));
        child.allowGravity = true;
        child.setBounce(0.9);
        child.setMass(0.3);
        
    })
        
    //text
    scoreText = this.add.text(16,16, 'Score: 0', {fontSize: '32px', fill: '#000'});
    
    
    
    //Collide Player with Platforms
    this.physics.add.collider(player_red, platforms);
    this.physics.add.collider(player_blue, platforms);
    
    this.physics.add.collider(balloons, platforms);
    
    //player colliders with balloons
    this.physics.add.collider(player_red, balloons, hitBalloon, null, this);
    this.physics.add.collider(player_blue, balloons, hitBalloon, null, this);
    
    //spawn balloons
    //game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, spawnBalloon, this);
    
    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
    
    //Second Player Keys
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


}

firstScene.update = function() {
    playerMovement();
    
}

function playerMovement () {
    // Red Movement
    if (cursors.left.isDown) {
        player_red.setVelocityX(-playerSpeed);
        player_red.flipX = true;
        player_red.anims.play('red_move', true);
    }
    else if (cursors.right.isDown) {
        player_red.setVelocityX(playerSpeed);
        player_red.flipX = false;
        player_red.anims.play('red_move', true);
    }
    else {
        player_red.setVelocityX(0);
        player_red.anims.play('red_idle', true);
    }
    if (cursors.up.isDown && player_red.body.touching.down) {
        player_red.setVelocityY(-jumpSpeed);
        //player_red.anims.play('jump', true);
    }
    if (!player_red.body.touching.down){
        player_red.anims.play('red_jump', true);
    }
    
    //Blue Movement 
    /*
    if (dKey.isDown) {
        player_blue.setVelocityX(playerSpeed);
        player_blue.flipX = false;
        player_blue.anims.play('blue_move')
    }
    else if (aKey.isDown) {
        player_blue.setVelocityX(-playerSpeed);
        player_blue.flipX = true;
        player_blue.anims.play('blue_move', true);
    }
    else {
        player_blue.setVelocityX(0);
        player_blue.anims.play('blue_idle', true);
    }
    if (wKey.isDown && player_red.body.touching.down) {
        player_blue.setVelocityY(-jumpSpeed);
    } 
    if (!player_blue.body.touching.down){
        player_blue.anims.play('blue_jump', true);
    } */
}

function hitBalloon(player, balloon){
    balloon.setVelocityY(-100);
    
    score += 1;
    scoreText.setText('Score:' + score);
    
}

function spawnBalloon(){
    total++;
    
}