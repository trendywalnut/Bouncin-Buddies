
var firstScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function firstScene(){
            Phaser.Scene.call(this,{key:'firstScene'});
        },
        preload: function(){
            this.load.spritesheet('guy_red', 'assets/guy_spritesheet_red.png', { frameWidth: 366, frameHeight: 252});
            this.load.spritesheet('guy_blue', 'assets/guy_spritesheet_blue.png', { frameWidth: 366, frameHeight: 252});
            this.load.image('balloon', 'assets/balloon.png');
            //this.load.image('guy_red', 'assets/guy_idle_red.png');
            this.load.image('sky', 'assets/background_sky2d.png');
            this.load.image('platform', 'assets/platform_grass.png');
            this.load.image('ground', 'assets/foreground_grass.png');
    
            this.load.audio('bgmusic', ['assets/bgmusic.wav']);
            this.load.audio('jump', ['assets/jump.wav']);
            this.load.audio('error', ['assets/error.wav']);
            this.load.audio('bump', ['assets/bump.wav']);
            this.load.audio('pop', ['assets/pop.wav']);
            this.load.audio('balloonspawn', ['assets/balloonspawn.wav']);
            
        },
        create: function(){
            
    
                this.add.image(400, 300, 'sky');

                platforms = this.physics.add.staticGroup();

                platforms.create(400, 568, 'ground').setScale(1).refreshBody();

                platforms.create(700, 500, 'platform');
                platforms.create(75, 500, 'platform');

                player_red = this.physics.add.sprite(100, 375, 'guy_red').setScale(0.2);
                player_red.setBounce(0.1);
                player_red.setCollideWorldBounds(true);
                player_red.setGravityY(599);

                player_blue = this.physics.add.sprite(700, 375, 'guy_blue').setScale(0.2);
                player_blue.setBounce(0.1);
                player_blue.setCollideWorldBounds(true);
                player_blue.setGravityY(599);

                //loseText
                loseText = this.add.text(
                        400, 
                        200, 
                        "You Lose...lvl1", 
                        {
                            fontSize: 50,
                            color: "#000000",
                            fontStyle: "bold"
                        }
                    ).setOrigin(0.5);

                loseText.visible = false;

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

                //audio
                bgmusic = this.sound.add('bgmusic', {loop: true});
                bgmusic.play();
                popSFX = this.sound.add('pop', {loop: false});
                bump = this.sound.add('bump', {loop: false}, {volume: 0.2});
                error = this.sound.add('error', {loop: false});
                jump = this.sound.add('jump', {loop: false});
                balloonSpawn = this.sound.add('balloonspawn', {loop: false});

                //Create Balloon Timer
                timer = this.time.addEvent({
                    delay: 5000,
                    callback: spawnBalloon,
                    loop: true
                });

                //balloon group
                balloons = this.physics.add.group({
                    key: 'balloon',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });


                balloons.children.iterate(function(child){
                    child.setScale(0.5);
                    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
                    child.setMass(0.3);
                    child.allowGravity = true;
                    child.setBounce(0.2);
                    child.setGravityY(1);
                    child.useDamping = true;
                    child.allowDrag = true;
                    child.allowRotation = true;
                    child.setAngularAcceleration(1);
                    child.isCircle = true;
                    child.setCircle(20);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true);
                })



                //text
                scoreText = this.add.text(16,16, 'Score: 0', {fontSize: '32px', fill: '#000'}); 

                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);

                this.physics.add.collider(balloons, platforms, popBalloon, null, this);

                //player colliders with balloons
                this.physics.add.collider(player_red, balloons, hitBalloon, null, this);
                this.physics.add.collider(player_blue, balloons, hitBalloon, null, this);

                //let balloons collide with each other
                this.physics.add.collider(balloons, balloons);

                // Input Events
                cursors = this.input.keyboard.createCursorKeys();


                //Second Player Keys
                keys = this.input.keyboard.addKeys('A,W,S,D,space');
    

        },
        update: function(){
            if(lost == true){
                if(keys.space.isDown){
                    
                    this.scene.start('levelselect')
                }
            }
            playerMovement();
        }
    });
var secondScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function secondScene(){
            Phaser.Scene.call(this,{key:'secondScene'});
        },
        preload: function(){
            
            this.load.image('balloon', 'assets/balloon.png');
            ;
            this.load.image('sky', 'assets/background_sky2d.png');
            this.load.image('platform', 'assets/platform_grass.png');
            this.load.image('ground', 'assets/foreground_grass.png');
    
            
            
        },
        create: function(){
            
    
                this.add.image(400, 300, 'sky');

                platforms = this.physics.add.staticGroup();

                platforms.create(400, 568, 'ground').setScale(1).refreshBody();

                platforms.create(700, 500, 'platform');
                platforms.create(75, 500, 'platform');

                player_red = this.physics.add.sprite(100, 375, 'guy_red').setScale(0.2);
                player_red.setBounce(0.1);
                player_red.setCollideWorldBounds(true);
                player_red.setGravityY(599);

                player_blue = this.physics.add.sprite(700, 375, 'guy_blue').setScale(0.2);
                player_blue.setBounce(0.1);
                player_blue.setCollideWorldBounds(true);
                player_blue.setGravityY(599);

                //loseText
                loseText = this.add.text(
                        400, 
                        200, 
                        "You Lose...lvl2", 
                        {
                            fontSize: 50,
                            color: "#000000",
                            fontStyle: "bold"
                        }
                    ).setOrigin(0.5);

                loseText.visible = false;

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

                //audio
                bgmusic = this.sound.add('bgmusic', {loop: true});
                bgmusic.play();
                popSFX = this.sound.add('pop', {loop: false});
                bump = this.sound.add('bump', {loop: false}, {volume: 0.2});
                error = this.sound.add('error', {loop: false});
                jump = this.sound.add('jump', {loop: false});
                balloonSpawn = this.sound.add('balloonspawn', {loop: false});

                //Create Balloon Timer
                timer = this.time.addEvent({
                    delay: 5000,
                    callback: spawnBalloon,
                    loop: true
                });

                //balloon group
                balloons = this.physics.add.group({
                    key: 'balloon',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });


                balloons.children.iterate(function(child){
                    child.setScale(0.5);
                    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
                    child.setMass(0.3);
                    child.allowGravity = true;
                    child.setBounce(0.2);
                    child.setGravityY(1);
                    child.useDamping = true;
                    child.allowDrag = true;
                    child.allowRotation = true;
                    child.setAngularAcceleration(1);
                    child.isCircle = true;
                    child.setCircle(20);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true);
                })



                //text
                scoreText = this.add.text(16,16, 'Score: 0', {fontSize: '32px', fill: '#000'}); 

                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);

                this.physics.add.collider(balloons, platforms, popBalloon, null, this);

                //player colliders with balloons
                this.physics.add.collider(player_red, balloons, hitBalloon, null, this);
                this.physics.add.collider(player_blue, balloons, hitBalloon, null, this);

                //let balloons collide with each other
                this.physics.add.collider(balloons, balloons);

                // Input Events
                cursors = this.input.keyboard.createCursorKeys();


                //Second Player Keys
                keys = this.input.keyboard.addKeys('A,W,S,D,space');
    

        },
        update: function(){
            if(lost == true){
                if(keys.space.isDown){
                    
                    this.scene.start('levelselect')
                }
            }
            playerMovement();
        }
    });
var thirdScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function thirdScene(){
            Phaser.Scene.call(this,{key:'thirdScene'});
        },
        preload: function(){
            
            this.load.image('balloon', 'assets/balloon.png');
            //this.load.image('guy_red', 'assets/guy_idle_red.png');
            this.load.image('sky', 'assets/background_sky2d.png');
            this.load.image('platform', 'assets/platform_grass.png');
            this.load.image('ground', 'assets/foreground_grass.png');
    
            
            
        },
        create: function(){
            
    
                this.add.image(400, 300, 'sky');

                platforms = this.physics.add.staticGroup();

                platforms.create(400, 568, 'ground').setScale(1).refreshBody();

                platforms.create(700, 500, 'platform');
                platforms.create(75, 500, 'platform');

                player_red = this.physics.add.sprite(100, 375, 'guy_red').setScale(0.2);
                player_red.setBounce(0.1);
                player_red.setCollideWorldBounds(true);
                player_red.setGravityY(599);

                player_blue = this.physics.add.sprite(700, 375, 'guy_blue').setScale(0.2);
                player_blue.setBounce(0.1);
                player_blue.setCollideWorldBounds(true);
                player_blue.setGravityY(599);

                //loseText
                loseText = this.add.text(
                        400, 
                        200, 
                        "You Lose...lvl3", 
                        {
                            fontSize: 50,
                            color: "#000000",
                            fontStyle: "bold"
                        }
                    ).setOrigin(0.5);

                loseText.visible = false;

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

                //audio
                bgmusic = this.sound.add('bgmusic', {loop: true});
                bgmusic.play();
                popSFX = this.sound.add('pop', {loop: false});
                bump = this.sound.add('bump', {loop: false}, {volume: 0.2});
                error = this.sound.add('error', {loop: false});
                jump = this.sound.add('jump', {loop: false});
                balloonSpawn = this.sound.add('balloonspawn', {loop: false});

                //Create Balloon Timer
                timer = this.time.addEvent({
                    delay: 5000,
                    callback: spawnBalloon,
                    loop: true
                });

                //balloon group
                balloons = this.physics.add.group({
                    key: 'balloon',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });


                balloons.children.iterate(function(child){
                    child.setScale(0.5);
                    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
                    child.setMass(0.3);
                    child.allowGravity = true;
                    child.setBounce(0.2);
                    child.setGravityY(1);
                    child.useDamping = true;
                    child.allowDrag = true;
                    child.allowRotation = true;
                    child.setAngularAcceleration(1);
                    child.isCircle = true;
                    child.setCircle(20);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true);
                })



                //text
                scoreText = this.add.text(16,16, 'Score: 0', {fontSize: '32px', fill: '#000'}); 

                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);

                this.physics.add.collider(balloons, platforms, popBalloon, null, this);

                //player colliders with balloons
                this.physics.add.collider(player_red, balloons, hitBalloon, null, this);
                this.physics.add.collider(player_blue, balloons, hitBalloon, null, this);

                //let balloons collide with each other
                this.physics.add.collider(balloons, balloons);

                // Input Events
                cursors = this.input.keyboard.createCursorKeys();


                //Second Player Keys
                keys = this.input.keyboard.addKeys('A,W,S,D,space');
    

        },
        update: function(){
            if(lost == true){
                if(keys.space.isDown){
                    
                    this.scene.start('levelselect')
                }
            }
            playerMovement();
        }
    });
var fourthScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function fourthScene(){
            Phaser.Scene.call(this,{key:'fourthScene'});
        },
        preload: function(){
            
            this.load.image('balloon', 'assets/balloon.png');
            //this.load.image('guy_red', 'assets/guy_idle_red.png');
            this.load.image('sky', 'assets/background_sky2d.png');
            this.load.image('platform', 'assets/platform_grass.png');
            this.load.image('ground', 'assets/foreground_grass.png');
    
            
            
        },
        create: function(){
            
    
                this.add.image(400, 300, 'sky');

                platforms = this.physics.add.staticGroup();

                platforms.create(400, 568, 'ground').setScale(1).refreshBody();

                platforms.create(700, 500, 'platform');
                platforms.create(75, 500, 'platform');

                player_red = this.physics.add.sprite(100, 375, 'guy_red').setScale(0.2);
                player_red.setBounce(0.1);
                player_red.setCollideWorldBounds(true);
                player_red.setGravityY(599);

                player_blue = this.physics.add.sprite(700, 375, 'guy_blue').setScale(0.2);
                player_blue.setBounce(0.1);
                player_blue.setCollideWorldBounds(true);
                player_blue.setGravityY(599);

                //loseText
                loseText = this.add.text(
                        400, 
                        200, 
                        "You Lose...lvl4", 
                        {
                            fontSize: 50,
                            color: "#000000",
                            fontStyle: "bold"
                        }
                    ).setOrigin(0.5);

                loseText.visible = false;

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

                //audio
                bgmusic = this.sound.add('bgmusic', {loop: true});
                bgmusic.play();
                popSFX = this.sound.add('pop', {loop: false});
                bump = this.sound.add('bump', {loop: false}, {volume: 0.2});
                error = this.sound.add('error', {loop: false});
                jump = this.sound.add('jump', {loop: false});
                balloonSpawn = this.sound.add('balloonspawn', {loop: false});

                //Create Balloon Timer
                timer = this.time.addEvent({
                    delay: 5000,
                    callback: spawnBalloon,
                    loop: true
                });

                //balloon group
                balloons = this.physics.add.group({
                    key: 'balloon',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });


                balloons.children.iterate(function(child){
                    child.setScale(0.5);
                    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
                    child.setMass(0.3);
                    child.allowGravity = true;
                    child.setBounce(0.2);
                    child.setGravityY(1);
                    child.useDamping = true;
                    child.allowDrag = true;
                    child.allowRotation = true;
                    child.setAngularAcceleration(1);
                    child.isCircle = true;
                    child.setCircle(20);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true);
                })



                //text
                scoreText = this.add.text(16,16, 'Score: 0', {fontSize: '32px', fill: '#000'}); 

                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);

                this.physics.add.collider(balloons, platforms, popBalloon, null, this);

                //player colliders with balloons
                this.physics.add.collider(player_red, balloons, hitBalloon, null, this);
                this.physics.add.collider(player_blue, balloons, hitBalloon, null, this);

                //let balloons collide with each other
                this.physics.add.collider(balloons, balloons);

                // Input Events
                cursors = this.input.keyboard.createCursorKeys();


                //Second Player Keys
                keys = this.input.keyboard.addKeys('A,W,S,D,space');
    

        },
        update: function(){
            if(lost == true){
                if(keys.space.isDown){
                    
                    this.scene.start('levelselect')
                }
            }
            playerMovement();
        }
    });
var fifthScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function fifthScene(){
            Phaser.Scene.call(this,{key:'fifthScene'});
        },
        preload: function(){
            
            this.load.image('balloon', 'assets/balloon.png');
            
            this.load.image('sky', 'assets/background_sky2d.png');
            this.load.image('platform', 'assets/platform_grass.png');
            this.load.image('ground', 'assets/foreground_grass.png');
    
           
            
        },
        create: function(){
            
    
                this.add.image(400, 300, 'sky');

                platforms = this.physics.add.staticGroup();

                platforms.create(400, 568, 'ground').setScale(1).refreshBody();

                platforms.create(700, 500, 'platform');
                platforms.create(75, 500, 'platform');

                player_red = this.physics.add.sprite(100, 375, 'guy_red').setScale(0.2);
                player_red.setBounce(0.1);
                player_red.setCollideWorldBounds(true);
                player_red.setGravityY(599);

                player_blue = this.physics.add.sprite(700, 375, 'guy_blue').setScale(0.2);
                player_blue.setBounce(0.1);
                player_blue.setCollideWorldBounds(true);
                player_blue.setGravityY(599);

                //loseText
                loseText = this.add.text(
                        400, 
                        200, 
                        "You Lose...lvl5", 
                        {
                            fontSize: 50,
                            color: "#000000",
                            fontStyle: "bold"
                        }
                    ).setOrigin(0.5);

                loseText.visible = false;

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

                //audio
                bgmusic = this.sound.add('bgmusic', {loop: true});
                bgmusic.play();
                popSFX = this.sound.add('pop', {loop: false});
                bump = this.sound.add('bump', {loop: false}, {volume: 0.2});
                error = this.sound.add('error', {loop: false});
                jump = this.sound.add('jump', {loop: false});
                balloonSpawn = this.sound.add('balloonspawn', {loop: false});

                //Create Balloon Timer
                timer = this.time.addEvent({
                    delay: 5000,
                    callback: spawnBalloon,
                    loop: true
                });

                //balloon group
                balloons = this.physics.add.group({
                    key: 'balloon',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });


                balloons.children.iterate(function(child){
                    child.setScale(0.5);
                    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
                    child.setMass(0.3);
                    child.allowGravity = true;
                    child.setBounce(0.2);
                    child.setGravityY(1);
                    child.useDamping = true;
                    child.allowDrag = true;
                    child.allowRotation = true;
                    child.setAngularAcceleration(1);
                    child.isCircle = true;
                    child.setCircle(20);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true);
                })



                //text
                scoreText = this.add.text(16,16, 'Score: 0', {fontSize: '32px', fill: '#000'}); 

                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);

                this.physics.add.collider(balloons, platforms, popBalloon, null, this);

                //player colliders with balloons
                this.physics.add.collider(player_red, balloons, hitBalloon, null, this);
                this.physics.add.collider(player_blue, balloons, hitBalloon, null, this);

                //let balloons collide with each other
                this.physics.add.collider(balloons, balloons);

                // Input Events
                cursors = this.input.keyboard.createCursorKeys();


                //Second Player Keys
                keys = this.input.keyboard.addKeys('A,W,S,D,space');
    

        },
        update: function(){
            if(lost == true){
                if(keys.space.isDown){
                    
                    this.scene.start('levelselect')
                }
            }
            playerMovement();
        }
    });
var levelselect = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function levelselect(){
            Phaser.Scene.call(this,{key:'levelselect'});
        },
        preload: function(){
            this.load.spritesheet('guy_red', 'assets/guy_spritesheet_red.png', { frameWidth: 366, frameHeight: 252});
            this.load.spritesheet('guy_blue', 'assets/guy_spritesheet_blue.png', { frameWidth: 366, frameHeight: 252});
            this.load.image('balloon', 'assets/balloon.png');
            //this.load.image('guy_red', 'assets/guy_idle_red.png');
            this.load.image('sky', 'assets/background_sky2d.png');
            this.load.image('platform', 'assets/platform_grass.png');
            this.load.image('ground', 'assets/foreground_grass.png');
    
            this.load.audio('bgmusic', ['assets/bgmusic.wav']);
            this.load.audio('jump', ['assets/jump.wav']);
            this.load.audio('error', ['assets/error.wav']);
            this.load.audio('bump', ['assets/bump.wav']);
            this.load.audio('pop', ['assets/pop.wav']);
            this.load.audio('balloonspawn', ['assets/balloonspawn.wav']);
            
        },
        create: function(){
            
                lost = false
                this.add.image(400, 300, 'sky');

                platforms = this.physics.add.staticGroup();

                platforms.create(400, 568, 'ground').setScale(1).refreshBody();

                lvl1 = this.physics.add.staticGroup();
                lvl1.create(800/6,350,'baka')
                lvl2 = this.physics.add.staticGroup();
                lvl2.create(2*800/6,350,'baka')
                lvl3 = this.physics.add.staticGroup();
                lvl3.create(3*800/6,350,'baka')
                lvl4 = this.physics.add.staticGroup();
                lvl4.create(4*800/6,350,'baka')
                lvl5 = this.physics.add.staticGroup();
                lvl5.create(5*800/6,350,'baka')

                player_red = this.physics.add.sprite(100, 400, 'guy_red').setScale(0.2);
                player_red.setBounce(0.1);
                player_red.setCollideWorldBounds(true);
                player_red.setGravityY(599);

                player_blue = this.physics.add.sprite(700, 400, 'guy_blue').setScale(0.2);
                player_blue.setBounce(0.1);
                player_blue.setCollideWorldBounds(true);
                player_blue.setGravityY(599);

               

                

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

                //audio
                bgmusic = this.sound.add('bgmusic', {loop: true});
                //bgmusic.play();
                
                bump = this.sound.add('bump', {loop: false}, {volume: 0.2});
                
                jump = this.sound.add('jump', {loop: false});



                //text
                scoreText = this.add.text(16,16, 'Score: 0', {fontSize: '32px', fill: '#000'}); 

                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);

                this.physics.add.collider(lvl1,player_red, function(){
                    this.scene.start('firstScene')
                    }
                , null, this);
                this.physics.add.collider(lvl1,player_blue, function(){
                    this.scene.start('firstScene')
                    }
                , null, this);
                this.physics.add.collider(lvl2,player_red, function(){
                    this.scene.start('secondScene')
                    }
                , null, this);
                this.physics.add.collider(lvl2,player_blue, function(){
                    this.scene.start('secondScene')
                    }
                , null, this);
                this.physics.add.collider(lvl3,player_red, function(){
                    this.scene.start('thirdScene')
                    }
                , null, this);
                this.physics.add.collider(lvl3,player_blue, function(){
                    this.scene.start('thirdScene')
                    }
                , null, this);
                this.physics.add.collider(lvl4,player_red, function(){
                    this.scene.start('fourthScene')
                    }
                , null, this);
                this.physics.add.collider(lvl4,player_blue, function(){
                    this.scene.start('fourthScene')
                    }
                , null, this);
                this.physics.add.collider(lvl5,player_red, function(){
                    this.scene.start('fifthScene')
                    }
                , null, this);
                this.physics.add.collider(lvl5,player_blue, function(){
                    this.scene.start('fifthScene')
                    }
                , null, this);
                

                // Input Events
                cursors = this.input.keyboard.createCursorKeys();


                //Second Player Keys
                keys = this.input.keyboard.addKeys('A,W,S,D,space');
    

        },
        update: function(){
            playerMovement();
        }
    });
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:100 },
            debug: false
        }
        
    },
    scene: [levelselect,firstScene,secondScene,thirdScene,fourthScene,fifthScene]
};

let game = new Phaser.Game(config);

//pre-making global varables
if(true){
    var player_red;
    var player_blue;
    var platforms;
    var player_red_jump = false;
    var balloons;

    var score = 0;
    var scoreText;

    var timer;
    var total = 1;

    var keys;
    var cursors;

    var playerSpeed = 270;
    var jumpSpeed = 450;

    var lost = false;
    var loseText;
};
//var bgmusic;
//var popSFX;




function playerMovement () {
    
    // Red Movement
    if (keys.A.isDown) {
        player_red.setVelocityX(-playerSpeed);
        player_red.flipX = true;
        player_red.anims.play('red_move', true);
    }
    else if (keys.D.isDown) {
        player_red.setVelocityX(playerSpeed);
        player_red.flipX = false;
        player_red.anims.play('red_move', true);
    }
    else {
        player_red.setVelocityX(0);
        player_red.anims.play('red_idle', true);
    }
    if (keys.W.isDown && player_red.body.touching.down) {
        jump.play();
        player_red.setVelocityY(-jumpSpeed);
        //player_red.anims.play('jump', true);
    }
    if (!player_red.body.touching.down){
        player_red.anims.play('red_jump', true);
    }
    
    //Blue Movement 
    if (cursors.right.isDown) {
        player_blue.setVelocityX(playerSpeed);
        player_blue.flipX = false;
        player_blue.anims.play('blue_move')
    }
    else if (cursors.left.isDown) {
        player_blue.setVelocityX(-playerSpeed);
        player_blue.flipX = true;
        player_blue.anims.play('blue_move', true);
    }
    else {
        player_blue.setVelocityX(0);
        player_blue.anims.play('blue_idle', true);
    }
    if (cursors.up.isDown && player_blue.body.touching.down) {
        jump.play();
        player_blue.setVelocityY(-jumpSpeed);
    } 
    if (!player_blue.body.touching.down){
        player_blue.anims.play('blue_jump', true);
    } 
}

function hitBalloon(player, balloon){
    //balloon.setVelocityY(-260);
    player.setVelocityY(200);
    
    bump.play();
    
    score += 1;
    scoreText.setText('Score:' + score);
    
}

function popBalloon(balloon, ground){
    total -= 1;
    if (total <= 0) {
        loseText.visible = true;
        lost = true;
        timer.remove();
        error.play();
        popSFX.play();
        bgmusic.stop();
    }else{
        popSFX.play();
    }
    balloon.destroy();
}

function spawnBalloon(){
    total++;
    var x = Phaser.Math.Between(0, 800);
    var balloon = balloons.create(x, 0, 'balloon');
    balloon.setScale(0.5);
    balloon.setVelocity(Phaser.Math.Between(-200, 200), 20);
    balloon.setMass(0.3);
    balloon.allowGravity = true;
    balloon.setBounce(0.2);
    balloon.setGravityY(1);
    balloon.useDamping = true;
    balloon.allowDrag = true;
    balloon.allowRotation = true;
    balloon.setAngularAcceleration(1.5);
    balloon.isCircle = true;
    balloon.setCircle(20, 27, 37);
    balloon.setMaxSpeed = 2;
        
    balloon.setCollideWorldBounds(true);  
    
    //play SFX
    balloonSpawn.play();
}
