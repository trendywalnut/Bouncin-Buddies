//  _____                                         
// /  ___|                                        
// \ `--.  ___ ___ _ __   ___    ___  _ __   ___  
//  `--. \/ __/ _ \ '_ \ / _ \  / _ \| '_ \ / _ \ 
// /\__/ / (_|  __/ | | |  __/ | (_) | | | |  __/ 
// \____/ \___\___|_| |_|\___|  \___/|_| |_|\___| 
                                               
var firstScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function firstScene(){
            Phaser.Scene.call(this,{key:'firstScene'});
        },
        
        create: function(){
                max =max1
                lives = lives1
                this.add.image(400, 300, 'sky');

                platforms = this.physics.add.staticGroup();

                platforms.create(400,600-30,'fcollide').setScale(1)
                
                platforms.create(32,600-96,'scollide').setScale(1)
                platforms.create(96,600-96,'scollide').setScale(1)
                platforms.create(157,600-96,'scollide').setScale(1)
                platforms.create(182,600-96,'scollide').setScale(1)
                platforms.create(800-32,600-96,'scollide').setScale(1)
                platforms.create(800-96,600-96,'scollide').setScale(1)
                platforms.create(800-157,600-96,'scollide').setScale(1)
                platforms.create(800-182,600-96,'scollide').setScale(1)
                this.add.image(400, 568, 'ground')
                this.add.image(700, 500, 'platform');
                this.add.image(100, 500, 'platform');
                
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
                        "\t\t\t\t\t\tGAME OVER\nPress Space to restart", 
                        {
                            fontSize: 50,
                            color: "#000000",
                            fontFamily: 'font1'
                        }
                    ).setOrigin(0.5);

                loseText.visible = false;

                //audio
                if(sound == true){
                    bgmusic = this.sound.add('bgmusic', {loop: true}); 
                    bgmusic.play();
                    popSFX = this.sound.add('pop', {loop: false});
                    bump = this.sound.add('bump', {loop: false}, {volume: 0.2});
                    error = this.sound.add('error', {loop: false});
                    jump = this.sound.add('jump', {loop: false});
                    balloonSpawn = this.sound.add('balloonspawn', {loop: false});
                }
                
            
                //create powerup timer
                powerupSpawnTimer = this.time.addEvent({
                    delay: 15000,
                    callback: spawnPowerup,
                    loop: true
                });
                
                //this.time.events.loop(15000,spawnPowerup,this)
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
                    setXY: {x: 400, y: 0, stepX: 70},
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
                    child.setCircle(20, 5, 20);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true);
                })
            
                //speedboost group
                speedboosts = this.physics.add.group({
                    key: 'speedboost',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });

                speedboosts.children.iterate(function(child){
                    child.setScale(0.02);
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
                    child.setCircle(800, -404, -170);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true); 
                })
            
                //coin group
                coins = this.physics.add.group({
                    key: 'coin',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });
            
                coins.children.iterate(function(child){
                    child.setScale(0.2);
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
                    child.setCircle(125, 0, 0);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true);
                })
            
                //1up group
                oneups = this.physics.add.group({
                    key: "oneup",
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });
            
                oneups.children.iterate(function(child) {
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
                    child.setCircle(50, 0, 0);
                    child.setMaxSpeed = 2;
                    child.setCollideWorldBounds(false);
                })

                //text
                scoreText = this.add.text(200,16, 'Score: 0', {fontSize: '32px', fill: '#000', fontFamily: 'font1'}); 
                livesText = this.add.text(16,16, 'Lives: '+lives, {fontSize: '32px', fill: '#000', fontFamily: 'font1'}); 
                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);
            
                //balloons and powerups collide with platforms
                this.physics.add.collider(balloons, platforms, popBalloon, null, this);
                this.physics.add.collider(speedboosts, platforms);
                this.physics.add.collider(coins, platforms);
                

                //player colliders with balloons
                this.physics.add.collider(player_red, balloons, hitBalloon, null, this);
                this.physics.add.collider(player_blue, balloons, hitBalloon, null, this);
            
                //player colliders with speedboost
                this.physics.add.collider(player_red, speedboosts, speedBoost, null, this);
                this.physics.add.collider(player_blue, speedboosts, speedBoost, null, this);
                    
                //player colliders with coin
                this.physics.add.collider(player_red, coins, coinGet, null, this);
                this.physics.add.collider(player_blue, coins, coinGet, null, this);
            
                //player colliders with oneups
                this.physics.add.collider(player_red, oneups, oneUp, null, this);
                this.physics.add.collider(player_blue, oneups, oneUp, null, this);   

                //let balloons collide with each other
                //this.physics.add.collider(balloons, balloons);

                // Input Events
                cursors = this.input.keyboard.createCursorKeys();


                //Player Keys
                keys = this.input.keyboard.addKeys('A,W,S,D,space');
                    

        },
        update: function(){
            if(lost == true){
                if(keys.space.isDown){
                    
                    this.scene.start('levelselect')
                }
            }
            else{
                playerMovement();
            }
        }
    });
//  _____                       _____             
// /  ___|                     |_   _|            
// \ `--.  ___ ___ _ __   ___    | |_      _____  
//  `--. \/ __/ _ \ '_ \ / _ \   | \ \ /\ / / _ \ 
// /\__/ / (_|  __/ | | |  __/   | |\ V  V / (_) |
// \____/ \___\___|_| |_|\___|   \_/ \_/\_/ \___/                                            

var secondScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function secondScene(){
            Phaser.Scene.call(this,{key:'secondScene'});
        },
        
        create: function(){
                max = max2
                lives = lives2
                this.add.image(400, 300, 'sky');

                platforms = this.physics.add.staticGroup();
                tree = this.physics.add.staticGroup();

                
                
                this.add.image(400, 375, 'treetrunk').setScale(1.75);
                
                platforms.create(400,600-30,'fcollide').setScale(1)
                
                
                this.add.image(400, 150, 'treeleaves').setScale(1.75);
                tree.create(390,150,'lfcollide').visible = cvis
                tree.create(400+124,300-64,'colliders').visible = cvis
                tree.create(400+140,300-64,'colliders').visible = cvis
                tree.create(400+148,300-64,'colliders').visible = cvis
                tree.create(400+156,300-88,'colliders').visible = cvis
                tree.create(400+156,300-104,'colliders').visible = cvis
                tree.create(400+156,300-120,'colliders').visible = cvis
                tree.create(400+152,300-128,'colliders').visible = cvis
                tree.create(400+140,300-128,'colliders').visible = cvis
                tree.create(400+152,300-136,'colliders').visible = cvis
                tree.create(400+140,300-136,'colliders').visible = cvis
                tree.create(400+146,300-142,'colliders').visible = cvis
                tree.create(400+132,300-142,'colliders').visible = cvis
                tree.create(400+146,300-150,'colliders').visible = cvis
                tree.create(400+132,300-150,'colliders').visible = cvis
                tree.create(400+64*2,0,'scollide').visible = cvis
                
                tree.create(400+64*2,64,'scollide').visible = cvis
                
                tree.create(400+64*2,64*2,'scollide').visible = cvis
                
                
                
                tree.create(390,415,'trcollide').visible = cvis
                
                //this.add.image(400, 150, 'treeleaves').setScale(1.75);
                
                tree.create(360-8, 396+16*7, 'colliders').setScale(1).visible = cvis
                
                
                
                tree.create(376+16*4, 396+16*7, 'colliders').setScale(1).visible = cvis
                tree.create(376+16*4, 396+16*6, 'colliders').setScale(1).visible = cvis
                tree.create(360, 396+16*4, 'colliders').setScale(1).visible = cvis
                
                tree.create(360, 396+16*5, 'colliders').setScale(1).visible = cvis
                tree.create(376+16*3, 396+16*5, 'colliders').setScale(1).visible = cvis
                tree.create(360, 396+16*6, 'colliders').setScale(1).visible = cvis
                
                tree.create(376+16*3, 396+16*6, 'colliders').setScale(1).visible = cvis
                tree.create(376+16*3, 396+16*7, 'colliders').setScale(1).visible = cvis
                tree.create(376+16*3, 396+16*8, 'colliders').setScale(1).visible = cvis
                tree.create(376+16*4, 396+16*8, 'colliders').setScale(1).visible = cvis
                this.add.image(400, 568, 'ground')
                
                
                //this.add.image(400, 375, 'treetrunk').setScale(1.75);

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
                        "\t\t\t\t\t\tGAME OVER\nPress Space to restart", 
                        {
                            fontSize: 50,
                            color: "#000000",
                            fontFamily: 'font1'
                        }
                    ).setOrigin(0.5);

                loseText.visible = false;
                                
                //audio
                if(sound == true){
                    bgmusic = this.sound.add('bgmusic2', {loop: true});
                    bgmusic.play();
                    popSFX = this.sound.add('pop', {loop: false});
                    bump = this.sound.add('bump', {loop: false}, {volume: 0.2});
                    error = this.sound.add('error', {loop: false});
                    jump = this.sound.add('jump', {loop: false});
                    balloonSpawn = this.sound.add('balloonspawn', {loop: false});
                }

                
            
                //create powerup timer
                powerupSpawnTimer = this.time.addEvent({
                    delay: 15000,
                    callback: spawnPowerup,
                    loop: true
                });
                
                //Create Balloon Timer
                timer = this.time.addEvent({
                    delay: 5000,
                    callback: spawnBalloon2,
                    loop: true
                });
                //balloon group
                balloons = this.physics.add.group({
                    key: 'balloon',
                    repeat: 0,
                    setXY: {x: 650, y: 0, stepX: 70},
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
                    child.setCircle(20, 5, 20);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true);
                })
            
                //speedboost group
                speedboosts = this.physics.add.group({
                    key: 'speedboost',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });

                speedboosts.children.iterate(function(child){
                    child.setScale(0.02);
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
                    child.setCircle(800, -404, -170);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true); 
                })
            
                //coin group
                coins = this.physics.add.group({
                    key: 'coin',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });
            
                coins.children.iterate(function(child){
                    child.setScale(0.2);
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
                    child.setCircle(125, 0, 0);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true);
                })
            
                //1up group
                oneups = this.physics.add.group({
                    key: "oneup",
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });
            
                oneups.children.iterate(function(child) {
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
                    child.setCircle(50, 0, 0);
                    child.setMaxSpeed = 2;
                    child.setCollideWorldBounds(true);
                })
                
                //player colliders with oneups
                this.physics.add.collider(player_red, oneups, oneUp, null, this);
                this.physics.add.collider(player_blue, oneups, oneUp, null, this);

                //text
                scoreText = this.add.text(200,16, 'Score: 0', {fontSize: '32px', fill: '#000', fontFamily: 'font1'}); 
                livesText = this.add.text(16,16, 'Lives: '+lives, {fontSize: '32px', fill: '#000', fontFamily: 'font1'});  

                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);
            
                //collide players with tree
                this.physics.add.collider(player_red, tree);
                this.physics.add.collider(player_blue, tree);
                this.physics.add.collider(balloons, tree,hitBalloonstop,null,this);
                
            
                //balloons and powerups collide with platforms
                this.physics.add.collider(balloons, platforms, popBalloon, null, this);
                this.physics.add.collider(speedboosts, platforms);
                this.physics.add.collider(coins, platforms);
                

                //player colliders with balloons
                this.physics.add.collider(player_red, balloons, hitBalloon, null, this);
                this.physics.add.collider(player_blue, balloons, hitBalloon, null, this);
            
                //player colliders with speedboost
                this.physics.add.collider(player_red, speedboosts, speedBoost, null, this);
                this.physics.add.collider(player_blue, speedboosts, speedBoost, null, this);
                    
                //player colliders with coin
                this.physics.add.collider(player_red, coins, coinGet, null, this);
                this.physics.add.collider(player_blue, coins, coinGet, null, this);

                //let balloons collide with each other
                //this.physics.add.collider(balloons, balloons);

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
            else{
                playerMovement();
            }
        }
    });
//  _____                       _____ _                   
// /  ___|                     |_   _| |                  
// \ `--.  ___ ___ _ __   ___    | | | |__  _ __ ___  ___ 
//  `--. \/ __/ _ \ '_ \ / _ \   | | | '_ \| '__/ _ \/ _ \
// /\__/ / (_|  __/ | | |  __/   | | | | | | | |  __/  __/
// \____/ \___\___|_| |_|\___|   \_/ |_| |_|_|  \___|\___|         
var thirdScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function thirdScene(){
            Phaser.Scene.call(this,{key:'thirdScene'});
        },
        
        create: function(){
                max = max3
                lives = lives3
                this.add.image(400, 300, 'sky');

                platforms = this.physics.add.staticGroup();
                bounceTops = this.physics.add.staticGroup();
                spikeBottoms = this.physics.add.staticGroup();

                platforms.create(400,600-30,'fcollide').setScale(1)
                this.add.image(400, 568, 'ground')
                
                
                this.add.image(600, 235, 'spiketop');
                this.add.image(175, 235, 'spiketop');
                bounceTops.create(600,240,'scollide').visible = cvis
                bounceTops.create(175,240,'scollide').visible = cvis
                bounceTops.create(175-28,240,'scollide').visible = cvis
                bounceTops.create(175+28,240,'scollide').visible = cvis
                bounceTops.create(175-64,240-6,'mcollide').visible = cvis
                bounceTops.create(175+64,240-6,'mcollide').visible = cvis
                bounceTops.create(175-64,240+10,'mcollide').visible = cvis
                bounceTops.create(175+64,240+10,'mcollide').visible = cvis
                bounceTops.create(175-64,240+16,'mcollide').visible = cvis
                bounceTops.create(175+64,240+16,'mcollide').visible = cvis
                bounceTops.create(175-64-19,240+16,'mcollide').visible = cvis
                bounceTops.create(175+64+19,240+16,'mcollide').visible = cvis
                bounceTops.create(175-64-19+8,240+8,'mcollide').visible = cvis
                bounceTops.create(175+64+19-8,240+8,'mcollide').visible = cvis
                bounceTops.create(175-64-19+12,240+4,'mcollide').visible = cvis
                bounceTops.create(175+64+19-12,240+4,'mcollide').visible = cvis
                bounceTops.create(175-64-19+14,240+2,'mcollide').visible = cvis
                bounceTops.create(175+64+19-14,240+2,'mcollide').visible = cvis
                bounceTops.create(175-64-19+15,240+1,'mcollide').visible = cvis
                bounceTops.create(175+64+19-15,240+1,'mcollide').visible = cvis
                bounceTops.create(175-64-19+13,240+3,'mcollide').visible = cvis
                bounceTops.create(175+64+19-13,240+3,'mcollide').visible = cvis
                
                bounceTops.create(600-64,240-6,'mcollide').visible = cvis
                bounceTops.create(600+64,240-6,'mcollide').visible = cvis
                bounceTops.create(600-64,240+10,'mcollide').visible = cvis
                bounceTops.create(600+64,240+10,'mcollide').visible = cvis
                bounceTops.create(600-64,240+16,'mcollide').visible = cvis
                bounceTops.create(600+64,240+16,'mcollide').visible = cvis
                bounceTops.create(600-64-19,240+16,'mcollide').visible = cvis
                bounceTops.create(600+64+19,240+16,'mcollide').visible = cvis
                bounceTops.create(600-64-19+8,240+8,'mcollide').visible = cvis
                bounceTops.create(600+64+19-8,240+8,'mcollide').visible = cvis
                bounceTops.create(600-64-19+12,240+4,'mcollide').visible = cvis
                bounceTops.create(600+64+19-12,240+4,'mcollide').visible = cvis
                bounceTops.create(600-64-19+14,240+2,'mcollide').visible = cvis
                bounceTops.create(600+64+19-14,240+2,'mcollide').visible = cvis
                bounceTops.create(600-64-19+15,240+1,'mcollide').visible = cvis
                bounceTops.create(600+64+19-15,240+1,'mcollide').visible = cvis
                bounceTops.create(600-64-19+13,240+3,'mcollide').visible = cvis
                bounceTops.create(600+64+19-13,240+3,'mcollide').visible = cvis
                
            
                
                
            
                bounceTops.create(600-28,240,'scollide').visible = cvis
                bounceTops.create(600+28,240,'scollide').visible = cvis
                spikeBottoms.create(600, 280, 'spikebottom');
                spikeBottoms.create(175, 280, 'spikebottom');

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
                        "\t\t\t\t\t\tGAME OVER\nPress Space to restart", 
                        {
                            fontSize: 50,
                            color: "#000000",
                            fontFamily: 'font1'
                        }
                    ).setOrigin(0.5);

                loseText.visible = false;                

                //audio
                if(sound == true){
                    bgmusic = this.sound.add('bgmusic2', {loop: true});
                    bgmusic.play();
                    popSFX = this.sound.add('pop', {loop: false});
                    bump = this.sound.add('bump', {loop: false}, {volume: 0.2});
                    error = this.sound.add('error', {loop: false});
                    jump = this.sound.add('jump', {loop: false});
                    balloonSpawn = this.sound.add('balloonspawn', {loop: false});
                }

                
            
                //create powerup timer
                powerupSpawnTimer = this.time.addEvent({
                    delay: 15000,
                    callback: spawnPowerup,
                    loop: true
                });
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
                    setXY: {x: 400, y: 0, stepX: 70},
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
                    child.setCircle(20, 5, 20);
                    child.setMaxSpeed = 2;
                    child.setCollideWorldBounds(true);
                })
            
                //speedboost group
                speedboosts = this.physics.add.group({
                    key: 'speedboost',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });

                speedboosts.children.iterate(function(child){
                    child.setScale(0.02);
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
                    child.setCircle(800, -404, -170);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true); 
                })
            
                //coin group
                coins = this.physics.add.group({
                    key: 'coin',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });
            
                coins.children.iterate(function(child){
                    child.setScale(0.2);
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
                    child.setCircle(125, 0, 0);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true);
                })
            
                //1up group
                oneups = this.physics.add.group({
                    key: "oneup",
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });
            
                oneups.children.iterate(function(child) {
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
                    child.setCircle(50, 0, 0);
                    child.setMaxSpeed = 2;
                    child.setCollideWorldBounds(true);
                })
                //player colliders with oneups
                this.physics.add.collider(player_red, oneups, oneUp, null, this);
                this.physics.add.collider(player_blue, oneups, oneUp, null, this);

                //text
                scoreText = this.add.text(200,16, 'Score: 0', {fontSize: '32px', fill: '#000', fontFamily: 'font1'}); 
                livesText = this.add.text(16,16, 'Lives: '+lives, {fontSize: '32px', fill: '#000', fontFamily: 'font1'}); 

                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);
            
                //balloons and powerups collide with platforms
                this.physics.add.collider(balloons, platforms, popBalloon, null, this);
                this.physics.add.collider(speedboosts, platforms);
                this.physics.add.collider(coins, platforms);
                

                //player colliders with balloons
                this.physics.add.collider(player_red, balloons, hitBalloon, null, this);
                this.physics.add.collider(player_blue, balloons, hitBalloon, null, this);
            
                //balloons collide with bounce tops
                this.physics.add.collider(balloons, bounceTops,hitBalloonstop,null,this);
            
                //balloons pop on spikes
                this.physics.add.collider(balloons, spikeBottoms, popBalloon, null, this);
            
                //player colliders with speedboost
                this.physics.add.collider(player_red, speedboosts, speedBoost, null, this);
                this.physics.add.collider(player_blue, speedboosts, speedBoost, null, this);
                    
                //player colliders with coin
                this.physics.add.collider(player_red, coins, coinGet, null, this);
                this.physics.add.collider(player_blue, coins, coinGet, null, this);

                //let balloons collide with each other
                //this.physics.add.collider(balloons, balloons);

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
            else{
                playerMovement();
            }
        }
    });
//  _____                      ______               
// /  ___|                     |  ___|              
// \ `--.  ___ ___ _ __   ___  | |_ ___  _   _ _ __ 
//  `--. \/ __/ _ \ '_ \ / _ \ |  _/ _ \| | | | '__|
// /\__/ / (_|  __/ | | |  __/ | || (_) | |_| | |   
// \____/ \___\___|_| |_|\___| \_| \___/ \__,_|_|
var fourthScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function fourthScene(){
            Phaser.Scene.call(this,{key:'fourthScene'});
        },
        
        create: function(){
                max = max4
                lives = lives4
    
                this.add.image(400, 300, 'volcano');

                platforms = this.physics.add.staticGroup();

                platforms.create(400,600-30,'fcollide').setScale(1)
                this.add.image(400, 568, 'ground_volcano')

                platforms.create(675, 500, 'volcano_boulder');
                platforms.create(125, 500, 'volcano_boulder');
                platforms.create(400, 350, 'spikepole');

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
                        "\t\t\t\t\t\tGAME OVER\nPress Space to restart", 
                        {
                            fontSize: 50,
                            color: "#000000",
                            fontFamily: 'font1'
                        }
                    ).setOrigin(0.5);

                loseText.visible = false;       

                //audio
                if(sound == true){
                    bgmusic = this.sound.add('bgmusic4', {loop: true});
                    bgmusic.play();
                    popSFX = this.sound.add('pop', {loop: false});
                    bump = this.sound.add('bump', {loop: false}, {volume: 0.2});
                    error = this.sound.add('error', {loop: false});
                    jump = this.sound.add('jump', {loop: false});
                    balloonSpawn = this.sound.add('balloonspawn', {loop: false});
                }

                
            
                //create powerup timer
                powerupSpawnTimer = this.time.addEvent({
                    delay: 15000,
                    callback: spawnPowerup,
                    loop: true
                });
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
                    setXY: {x: 400, y: 0, stepX: 70},
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
            
                //speedboost group
                speedboosts = this.physics.add.group({
                    key: 'speedboost',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });

                speedboosts.children.iterate(function(child){
                    child.setScale(0.02);
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
                    child.setCircle(800, -404, -170);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true); 
                })
            
                //coin group
                coins = this.physics.add.group({
                    key: 'coin',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });
            
                coins.children.iterate(function(child){
                    child.setScale(0.2);
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
                    child.setCircle(125, 0, 0);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true);
                })
            
                //1up group
                oneups = this.physics.add.group({
                    key: "oneup",
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });
            
                oneups.children.iterate(function(child) {
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
                    child.setCircle(50, 0, 0);
                    child.setMaxSpeed = 2;
                    child.setCollideWorldBounds(true);
                })
                //player colliders with oneups
                this.physics.add.collider(player_red, oneups, oneUp, null, this);
                this.physics.add.collider(player_blue, oneups, oneUp, null, this);

                //text
                scoreText = this.add.text(200,16, 'Score: 0', {fontSize: '32px', fill: '#000', fontFamily: 'font1'}); 
                livesText = this.add.text(16,16, 'Lives: '+lives, {fontSize: '32px', fill: '#000', fontFamily: 'font1'});  

                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);
            
                //balloons and powerups collide with platforms
                this.physics.add.collider(balloons, platforms, popBalloon, null, this);
                this.physics.add.collider(speedboosts, platforms);
                this.physics.add.collider(coins, platforms);
                

                //player colliders with balloons
                this.physics.add.collider(player_red, balloons, hitBalloon, null, this);
                this.physics.add.collider(player_blue, balloons, hitBalloon, null, this);
            
                //player colliders with speedboost
                this.physics.add.collider(player_red, speedboosts, speedBoost, null, this);
                this.physics.add.collider(player_blue, speedboosts, speedBoost, null, this);
                    
                //player colliders with coin
                this.physics.add.collider(player_red, coins, coinGet, null, this);
                this.physics.add.collider(player_blue, coins, coinGet, null, this);

                //let balloons collide with each other
                //this.physics.add.collider(balloons, balloons);

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
            else{
                playerMovement();
            }
        }
    });
//  _____                      ______ _           
// /  ___|                     |  ___(_)          
// \ `--.  ___ ___ _ __   ___  | |_   ___   _____ 
//  `--. \/ __/ _ \ '_ \ / _ \ |  _| | \ \ / / _ \
// /\__/ / (_|  __/ | | |  __/ | |   | |\ V /  __/
// \____/ \___\___|_| |_|\___| \_|   |_| \_/ \___|
var fifthScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function fifthScene(){
            Phaser.Scene.call(this,{key:'fifthScene'});
        },
        
        create: function(){
                max = max5
                lives = lives5
                this.add.image(400, 300, 'sky');

                platforms = this.physics.add.staticGroup();

                platforms.create(400,600-30,'fcollide').setScale(1)
                this.add.image(400, 568, 'ground')

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
                        "\t\t\t\t\t\tGAME OVER\nPress Space to restart", 
                        {
                            fontSize: 50,
                            color: "#000000",
                            fontFamily: 'font1'
                        }
                    ).setOrigin(0.5);

                loseText.visible = false;

                

                //audio
                if(sound == true){
                    bgmusic = this.sound.add('bgmusic', {loop: true});
                    bgmusic.play();
                    popSFX = this.sound.add('pop', {loop: false});
                    bump = this.sound.add('bump', {loop: false}, {volume: 0.2});
                    error = this.sound.add('error', {loop: false});
                    jump = this.sound.add('jump', {loop: false});
                    balloonSpawn = this.sound.add('balloonspawn', {loop: false});
                }

                
            
                //create powerup timer
                powerupSpawnTimer = this.time.addEvent({
                    delay: 15000,
                    callback: spawnPowerup,
                    loop: true
                });
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
                    setXY: {x: 650, y: 0, stepX: 70},
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
                    child.setCircle(20, 5, 20);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true);
                })
            
                //speedboost group
                speedboosts = this.physics.add.group({
                    key: 'speedboost',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });

                speedboosts.children.iterate(function(child){
                    child.setScale(0.02);
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
            
                //coin group
                coins = this.physics.add.group({
                    key: 'coin',
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });
            
                coins.children.iterate(function(child){
                    child.setScale(0.2);
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
            
                //1up group
                oneups = this.physics.add.group({
                    key: "oneup",
                    repeat: 0,
                    setXY: {x: 12, y: 0, stepX: 70},
                    mass: 0.3
                });
            
                oneups.children.iterate(function(child) {
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
                    child.setCircle(50, 0, 0);
                    child.setMaxSpeed = 2;
                    child.setCollideWorldBounds(true);
                })
                //player colliders with oneups
                this.physics.add.collider(player_red, oneups, oneUp, null, this);
                this.physics.add.collider(player_blue, oneups, oneUp, null, this);

                //text
                scoreText = this.add.text(200,16, 'Score: 0', {fontSize: '32px', fill: '#000', fontFamily: 'font1'}); 
                livesText = this.add.text(16,16, 'Lives: '+lives, {fontSize: '32px', fill: '#000', fontFamily: 'font1'});  

                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);
            
                //balloons and powerups collide with platforms
                this.physics.add.collider(balloons, platforms, popBalloon, null, this);
                this.physics.add.collider(speedboosts, platforms);
                this.physics.add.collider(coins, platforms);
                

                //player colliders with balloons
                this.physics.add.collider(player_red, balloons, hitBalloon, null, this);
                this.physics.add.collider(player_blue, balloons, hitBalloon, null, this);
            
                //player colliders with speedboost
                this.physics.add.collider(player_red, speedboosts, speedBoost, null, this);
                this.physics.add.collider(player_blue, speedboosts, speedBoost, null, this);
                    
                //player colliders with coin
                this.physics.add.collider(player_red, coins, coinGet, null, this);
                this.physics.add.collider(player_blue, coins, coinGet, null, this);

                //let balloons collide with each other
                //this.physics.add.collider(balloons, balloons);

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
            else{
                playerMovement();
            }
        }
    });
//  _                    _   _____      _           _   
// | |                  | | /  ___|    | |         | |  
// | |     _____   _____| | \ `--.  ___| | ___  ___| |_ 
// | |    / _ \ \ / / _ \ |  `--. \/ _ \ |/ _ \/ __| __|
// | |___|  __/\ V /  __/ | /\__/ /  __/ |  __/ (__| |_ 
// \_____/\___| \_/ \___|_| \____/ \___|_|\___|\___|\__|
var levelselect = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function levelselect(){
            Phaser.Scene.call(this,{key:'levelselect'});
        },
        preload: function(){
            totalBalloons = 1
            score = 0
            
        },
        create: function(){
                
                //startup =false
                lost = false
                this.add.image(400, 300, 'sky');

                platforms = this.physics.add.staticGroup();

                platforms.create(400,600-30,'fcollide').setScale(1)
                this.add.image(400, 568, 'ground')

                lvl1 = this.physics.add.staticGroup();
                lvl1.create(800/5,350,'one');
                //lvl1.scale(0.01);
                lvl2 = this.physics.add.staticGroup();
                lvl2.create(2*800/5,350,'two')
                lvl3 = this.physics.add.staticGroup();
                lvl3.create(3*800/5,350,'three')
                lvl4 = this.physics.add.staticGroup();
                lvl4.create(4*800/5,350,'four')
                lvl5 = this.physics.add.staticGroup();
                //lvl5.create(5*800/6,350,'baka')

                player_red = this.physics.add.sprite(100, 400, 'guy_red').setScale(0.2);
                player_red.setBounce(0.1);
                player_red.setCollideWorldBounds(true);
                player_red.setGravityY(599);

                player_blue = this.physics.add.sprite(700, 400, 'guy_blue').setScale(0.2);
                player_blue.setBounce(0.1);
                player_blue.setCollideWorldBounds(true);
                player_blue.setGravityY(599);
                
                
                this.add.text(
                        400, 
                        200, 
                        "Level Select", 
                        {
                            fontSize: 50,
                            color: "#000000",
                            fontFamily: 'font1'
                        }
                    ).setOrigin(0.5);

                
               
                //audio
                if(sound == true){
                
                    bump = this.sound.add('bump', {loop: false}, {volume: 0.2});

                    jump = this.sound.add('jump', {loop: false});
                    speedboostSFX = this.sound.add('speedboostSFX', {loop: false});
                    bonuspointSFX = this.sound.add('bonuspointSFX', {loop: false});
                    bgmusic = this.sound.add('bgmusiclvl', {loop: true});
                    bgmusic.play()
                }



                //text
                this.add.text(460,575, 'Press H to return to the Title', {fontSize: '18px', fill: '#000', fontFamily: 'font1'});
                this.add.text(10,575, 'Press M to enable/disable audio', {fontSize: '18px', fill: '#000', fontFamily: 'font1'});
                
                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);

                this.physics.add.collider(lvl1,player_red, function(){
                    trust()
                    this.scene.start('firstScene')
                    }
                , null, this);
                this.physics.add.collider(lvl1,player_blue, function(){
                    trust()
                    this.scene.start('firstScene')
                    }
                , null, this);
                this.physics.add.collider(lvl2,player_red, function(){
                    trust()
                    this.scene.start('secondScene')
                    }
                , null, this);
                this.physics.add.collider(lvl2,player_blue, function(){
                    trust()
                    this.scene.start('secondScene')
                    }
                , null, this);
                this.physics.add.collider(lvl3,player_red, function(){
                    trust()
                    this.scene.start('thirdScene')
                    }
                , null, this);
                this.physics.add.collider(lvl3,player_blue, function(){
                    trust()
                    this.scene.start('thirdScene')
                    }
                , null, this);
                this.physics.add.collider(lvl4,player_red, function(){
                    trust()
                    this.scene.start('fourthScene')
                    }
                , null, this);
                this.physics.add.collider(lvl4,player_blue, function(){
                    trust()
                    this.scene.start('fourthScene')
                    }
                , null, this);
                this.physics.add.collider(lvl5,player_red, function(){
                    trust()
                    this.scene.start('fifthScene')
                    }
                , null, this);
                this.physics.add.collider(lvl5,player_blue, function(){
                    trust()
                    this.scene.start('fifthScene')
                    }
                , null, this);
                

                // Input Events
                cursors = this.input.keyboard.createCursorKeys();


                //Second Player Keys
                keys = this.input.keyboard.addKeys('A,W,S,D,H,M,space');
    

        },
        update: function(){
            playerMovement();
            if(keys.H.isDown){
                bgmusic.stop()
                this.scene.start('title')
            }
            if(keys.M.isDown){
                if(mhold == false){
                    mhold = true
                    if(sound == true){
                        this.game.sound.stopAll();
                        sound = false
                    }
                    else{
                        sound = true
                        bump = this.sound.add('bump', {loop: false}, {volume: 0.2});

                        jump = this.sound.add('jump', {loop: false});
                        speedboostSFX = this.sound.add('speedboostSFX', {loop: false});
                        bonuspointSFX = this.sound.add('bonuspointSFX', {loop: false});
                        bgmusic = this.sound.add('bgmusiclvl', {loop: true});
                        bgmusic.play()
                    }
                }
            }
            else{
                mhold = false
            }
            
        }
    });
//  _____     _             _       _   _____            
// |_   _|   | |           (_)     | | |  _  |           
//   | |_   _| |_ ___  _ __ _  __ _| | | | | |_ __   ___ 
//   | | | | | __/ _ \| '__| |/ _` | | | | | | '_ \ / _ \
//   | | |_| | || (_) | |  | | (_| | | \ \_/ / | | |  __/
//   \_/\__,_|\__\___/|_|  |_|\__,_|_|  \___/|_| |_|\___|
var tutorial1 = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function levelselect(){
            Phaser.Scene.call(this,{key:'tutorial1'});
        },
        preload: function(){
            totalBalloons = 1
            score = 0
            
        },
        create: function(){
                //startup =false
                lost = false
                
                this.add.image(400, 300, 'sky');
                
                //add tutorial image
                this.add.image(400, 300, 'tutorial_1');
                
                platforms = this.physics.add.staticGroup();
                platforms.create(400,600-30,'fcollide').setScale(1)
                this.add.image(400, 568, 'ground')
            
                //add skip text
                skipText = this.add.text(16,550, 'Press L to skip tutorial', {fontSize: '25px', fill: '#000', fontFamily: 'font1'});
            
                platforms.create(700, 500, 'platform');

                lvl4 = this.physics.add.staticGroup();
                lvl4.create(750,450,'door');

                player_red = this.physics.add.sprite(100, 400, 'guy_red').setScale(0.2);
                player_red.setBounce(0.1);
                player_red.setCollideWorldBounds(true);
                player_red.setGravityY(599);
                //bgmusic = this.sound.add('bgmusic', {loop: true});
                //bgmusic.play();
               
                
                
                
                bump = this.sound.add('bump', {loop: false}, {volume: 0.2});
                
                jump = this.sound.add('jump', {loop: false});
                speedboostSFX = this.sound.add('speedboostSFX', {loop: false});
                bonuspointSFX = this.sound.add('bonuspointSFX', {loop: false});
                
                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                //this.physics.add.collider(player_blue, platforms);

                
                this.physics.add.collider(lvl4,player_red, function(){
                    this.scene.start('tutorial2')
                    }
                , null, this);
                                

                // Input Events
                cursors = this.input.keyboard.createCursorKeys();


                //Second Player Keys
                keys = this.input.keyboard.addKeys('A,W,S,D,space,L');

        },
        update: function(){
            if(keys.L.isDown){
                trust()
                this.scene.start('levelselect')
            }
            redMovement();
        }
    });

var tutorial2 = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function levelselect(){
            Phaser.Scene.call(this,{key:'tutorial2'});
        },
        
        create: function(){
                //startup =false
                lost = false
                
                this.add.image(400, 300, 'sky');
                
                //add tutorial image
                this.add.image(400, 300, 'tutorial_2');
                
                platforms = this.physics.add.staticGroup();
                platforms.create(400,600-30,'fcollide').setScale(1)
                this.add.image(400, 568, 'ground')
            
                //add skip text
                skipText = this.add.text(16,550, 'Press L to skip tutorial', {fontSize: '25px', fill: '#000', fontFamily: 'font1'});

                lvl4 = this.physics.add.staticGroup();
                lvl4.create(750,450,'door');

                player_red = this.physics.add.sprite(100, 400, 'guy_red').setScale(0.2);
                player_red.setBounce(0.1);
                player_red.setCollideWorldBounds(true);
                player_red.setGravityY(599);

                player_blue = this.physics.add.sprite(600, 400, 'guy_blue').setScale(0.2);
                player_blue.setBounce(0.1);
                player_blue.setCollideWorldBounds(true);
                player_blue.setGravityY(599);

                //audio
                if(sound == true){
                    //bgmusic.play();

                    bump = this.sound.add('bump', {loop: false}, {volume: 0.2});

                    jump = this.sound.add('jump', {loop: false});
                    speedboostSFX = this.sound.add('speedboostSFX', {loop: false});
                    bonuspointSFX = this.sound.add('bonuspointSFX', {loop: false});
                }
                
                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);

                
                this.physics.add.collider(lvl4,player_red, function(){
                    this.scene.start('tutorial3')
                    }
                , null, this);
                this.physics.add.collider(lvl4,player_blue, function(){
                    this.scene.start('tutorial3')
                    }
                , null, this);                

                // Input Events
                cursors = this.input.keyboard.createCursorKeys();


                //Second Player Keys
                keys = this.input.keyboard.addKeys('A,W,S,D,space,L');

        },
        update: function(){
            if(keys.L.isDown){  
                trust()
                this.scene.start('levelselect')
            }
            playerMovement();
        }
    });

var tutorial3 = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function levelselect(){
            Phaser.Scene.call(this,{key:'tutorial3'});
        },
        
        create: function(){
                //startup =false
                lost = false
                
                this.add.image(400, 300, 'sky');
                
                //add tutorial image
                this.add.image(400, 300, 'tutorial_3');
                
                platforms = this.physics.add.staticGroup();
                platforms.create(400,600-30,'fcollide').setScale(1)
                platforms.create(400, 568, 'ground')
            
            //add skip text
                skipText = this.add.text(16,550, 'Press L to skip tutorial', {fontSize: '25px', fill: '#000', fontFamily: 'font1'});

                lvl4 = this.physics.add.staticGroup();
                lvl4.create(750,450,'door');

                player_red = this.physics.add.sprite(100, 400, 'guy_red').setScale(0.2);
                player_red.setBounce(0.1);
                player_red.setCollideWorldBounds(true);
                player_red.setGravityY(599);

                player_blue = this.physics.add.sprite(600, 400, 'guy_blue').setScale(0.2);
                player_blue.setBounce(0.1);
                player_blue.setCollideWorldBounds(true);
                player_blue.setGravityY(599);

                //bgmusic.play();
                if(sound == true){
                    bump = this.sound.add('bump', {loop: false}, {volume: 0.2});
                    popSFX = this.sound.add('pop', {loop: false});
                    error = this.sound.add('error', {loop: false});
                    jump = this.sound.add('jump', {loop: false});
                    balloonSpawn = this.sound.add('balloonspawn', {loop: false});

                    jump = this.sound.add('jump', {loop: false});
                    speedboostSFX = this.sound.add('speedboostSFX', {loop: false});
                    bonuspointSFX = this.sound.add('bonuspointSFX', {loop: false});
                }
            
            //Create Balloon Timer
                timer = this.time.addEvent({
                    delay: 5000,
                    callback: spawnBalloonTut,
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
                    child.setCircle(20, 5, 20);
                    child.setMaxSpeed = 2;

                    child.setCollideWorldBounds(true);
                })
            
                this.physics.add.collider(balloons, platforms, popBalloonTut, null, this);

                //player colliders with balloons
                this.physics.add.collider(player_red, balloons, hitBalloonTut, null, this);
                this.physics.add.collider(player_blue, balloons, hitBalloonTut, null, this);
                
                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);

                
                this.physics.add.collider(lvl4,player_red, function(){
                    this.scene.start('tutorial4')
                    }
                , null, this);
                this.physics.add.collider(lvl4,player_blue, function(){
                    this.scene.start('tutorial4')
                    }
                , null, this);                

                // Input Events
                cursors = this.input.keyboard.createCursorKeys();


                //Second Player Keys
                keys = this.input.keyboard.addKeys('A,W,S,D,space,L');

        },
        update: function(){
            if(keys.L.isDown){  
                trust()
                this.scene.start('levelselect')
            }
            playerMovement();
        }
    });

var tutorial4 = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function levelselect(){
            Phaser.Scene.call(this,{key:'tutorial4'});
        },
        
        create: function(){
                //startup =false
                lost = false
                
                this.add.image(400, 300, 'sky');
                
                //add tutorial image
                this.add.image(400, 300, 'tutorial_4');
                
                platforms = this.physics.add.staticGroup();
                platforms.create(400,600-30,'fcollide').setScale(1)
                this.add.image(400, 568, 'ground')
            
                //add skip text
                skipText = this.add.text(16,550, 'Press L to skip tutorial', {fontSize: '25px', fill: '#000', fontFamily: 'font1'});

                lvl4 = this.physics.add.staticGroup();
                lvl4.create(750,450,'door');

                player_red = this.physics.add.sprite(100, 400, 'guy_red').setScale(0.2);
                player_red.setBounce(0.1);
                player_red.setCollideWorldBounds(true);
                player_red.setGravityY(599);

                player_blue = this.physics.add.sprite(600, 400, 'guy_blue').setScale(0.2);
                player_blue.setBounce(0.1);
                player_blue.setCollideWorldBounds(true);
                player_blue.setGravityY(599);

               
                

                //audio
                if(sound == true){
                    //bgmusic.play();

                    bump = this.sound.add('bump', {loop: false}, {volume: 0.2});

                    jump = this.sound.add('jump', {loop: false});
                    speedboostSFX = this.sound.add('speedboostSFX', {loop: false});
                    bonuspointSFX = this.sound.add('bonuspointSFX', {loop: false});
                }
                
                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);

                
                this.physics.add.collider(lvl4,player_red, function(){
                    trust()
                    this.scene.start('levelselect')
                    }
                , null, this);
                this.physics.add.collider(lvl4,player_blue, function(){
                    trust()
                    this.scene.start('levelselect')
                    }
                , null, this);                

                // Input Events
                cursors = this.input.keyboard.createCursorKeys();


                //Second Player Keys
                keys = this.input.keyboard.addKeys('A,W,S,D,space,L');

        },
        update: function(){
            if(keys.L.isDown){  
                trust()
                this.scene.start('levelselect')
            }
            playerMovement();
        }
    });

//Old tutorial scene
var tutorial0 = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function levelselect(){
            Phaser.Scene.call(this,{key:'tutorial0'});
        },
        preload: function(){
            totalBalloons = 1
            score = 0
            if(loaded == false){
                this.load.spritesheet('guy_red', 'Assets/guy_spritesheet_red.png', { frameWidth: 366, frameHeight: 252});
                this.load.spritesheet('guy_blue', 'Assets/guy_spritesheet_blue.png', { frameWidth: 366, frameHeight: 252});
                this.load.image('balloon', 'Assets/balloon.png');
                //this.load.image('guy_red', 'assets/guy_idle_red.png');
                this.load.image('sky', 'assets/background_sky2d.png');
                this.load.image('volcano', 'Assets/background_volcano.png');

                this.load.image('platform', 'assets/platform_grass.png');
                this.load.image('volcano_boulder', 'assets/volcano_boulder.png');
                this.load.image('ground', 'Assets/foreground_grass.png');
                this.load.image('ground_volcano', 'Assets/foreground_volcano.png');

                this.load.image('treetrunk', 'Assets/tree_trunk.png');
                this.load.image('treeleaves', 'Assets/tree_leaves.png');

                this.load.image('spikepole', 'assets/spikepole.png');
                this.load.image('spiketop', 'assets/spikeplatform_top.png')
                this.load.image('spikebottom', 'assets/spikeplatform_bottom.png');

                this.load.image('speedboost', 'Assets/speedboost.png');
                this.load.image('coin', 'assets/coin.png');
                
                this.load.image('one', 'assets/one.png');
                this.load.image('two', 'assets/two.png');
                this.load.image('three', 'assets/three.png');
                this.load.image('four', 'assets/four.png');
                //this.load.image('five', 'Assets/five.png');
                
                this.load.image('door', 'assets/door.png');

                this.load.audio('bgmusic', ['assets/bgmusic.wav']);
                this.load.audio('jump', ['assets/jump.wav']);
                this.load.audio('error', ['assets/error.wav']);
                this.load.audio('bump', ['assets/bump.wav']);
                this.load.audio('pop', ['assets/pop.wav']);
                this.load.audio('speedboostSFX', ['assets/item_speedup.wav']);
                this.load.audio('balloonspawn', ['assets/balloonspawn.wav']);
                this.load.audio('bonuspointSFX', ['assets/item_pointbonus.wav']);
                
                //tutorial image
                this.load.image('tutorial', ['assets/tutorialscreen.jpg']);
                this.load.image('tutorial_1', ['Assets/Tutorial1.png']);
                this.load.image('tutorial_2', ['Assets/Tutorial2.png']);
                this.load.image('tutorial_3', ['Assets/Tutorial3.png']);
                this.load.image('tutorial_4', ['Assets/Tutorial4.png']);
                this.load.image('fcollide', 'dontquestionme/colliderwide.png');
                this.load.image('scollide', 'dontquestionme/collider_small.png');
                this.load.image('colliders', 'dontquestionme/colliders.png');
            }
        },
        create: function(){
                //startup =false
                lost = false
                
                this.add.image(400, 300, 'sky');
                
                //add tutorial image
                //this.add.image(400, 300, 'tutorial');
                
                platforms = this.physics.add.staticGroup();
                platforms.create(400,600-30,'fcollide').setScale(1)
                this.add.image(400, 568, 'ground')

                lvl4 = this.physics.add.staticGroup();
                lvl4.create(4*800/6,450,'baka');

                player_red = this.physics.add.sprite(100, 400, 'guy_red').setScale(0.2);
                player_red.setBounce(0.1);
                player_red.setCollideWorldBounds(true);
                player_red.setGravityY(599);

                //player_blue = this.physics.add.sprite(700, 400, 'guy_blue').setScale(0.2);
                //player_blue.setBounce(0.1);
                //player_blue.setCollideWorldBounds(true);
                //player_blue.setGravityY(599);

               
                if(loaded == false){
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
                    loaded = true;
                }

                //audio
                if(sound == true){
                    bgmusic = this.sound.add('bgmusic', {loop: true});
                    //bgmusic.play();

                    bump = this.sound.add('bump', {loop: false}, {volume: 0.2});

                    jump = this.sound.add('jump', {loop: false});
                    speedboostSFX = this.sound.add('speedboostSFX', {loop: false});
                    bonuspointSFX = this.sound.add('bonuspointSFX', {loop: false});
                }
                
                //Collide Player with Platforms
                this.physics.add.collider(player_red, platforms);
                this.physics.add.collider(player_blue, platforms);

                
                this.physics.add.collider(lvl4,player_red, function(){
                    this.scene.start('levelselect')
                    }
                , null, this);
                this.physics.add.collider(lvl4,player_blue, function(){
                    this.scene.start('levelselect')
                    }
                , null, this);                

                // Input Events
                cursors = this.input.keyboard.createCursorKeys();


                //Second Player Keys
                keys = this.input.keyboard.addKeys('A,W,S,D,space');

        },
        update: function(){
            if(keys.L.isDown){  
                trust()
                this.scene.start('levelselect')
            }
            playerMovement();
        }
    });
//title screen
var title = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function title(){
        Phaser.Scene.call(this,{key:'title'});
    },
    preload: function(){
        totalBalloons = 1
        score = 0
        if(loaded == false){
            this.load.spritesheet('guy_red', 'Assets/guy_spritesheet_red.png', { frameWidth: 366, frameHeight: 252});
            this.load.spritesheet('guy_blue', 'Assets/guy_spritesheet_blue.png', { frameWidth: 366, frameHeight: 252});
            this.load.image('balloon', 'Assets/balloon.png');
            //this.load.image('guy_red', 'assets/guy_idle_red.png');
            this.load.image('sky', 'Assets/background_sky2d.png');
            this.load.image('volcano', 'Assets/background_volcano.png');

            this.load.image('platform', 'Assets/platform_grass.png');
            this.load.image('volcano_boulder', 'Assets/volcano_boulder.png');
            this.load.image('ground', 'Assets/foreground_grass.png');
            this.load.image('ground_volcano', 'Assets/foreground_volcano.png');

            this.load.image('treetrunk', 'Assets/tree_trunk.png');
            this.load.image('treeleaves', 'Assets/tree_leaves.png');

            this.load.image('spikepole', 'Assets/spikepole.png');
            this.load.image('spiketop', 'Assets/spikeplatform_top.png')
            this.load.image('spikebottom', 'Assets/spikeplatform_bottom.png');

            this.load.image('speedboost', 'Assets/speedboost.png');
            this.load.image('coin', 'Assets/coin.png');
            this.load.image('oneup', 'Assets/balloon1up.png');

            this.load.image('one', 'Assets/one.png');
            this.load.image('two', 'Assets/two.png');
            this.load.image('three', 'Assets/three.png');
            this.load.image('four', 'Assets/four.png');
            //this.load.image('five', 'Assets/five.png');

            this.load.image('door', 'Assets/door.png');

            this.load.audio('bgmusic', ['Assets/bgmusic.wav']);
            this.load.audio('bgmusic2', ['Assets/bgmusic_lvl2.wav']);
            this.load.audio('bgmusic4', ['Assets/bgmusic_lvl4.wav']);
            this.load.audio('bgmusiclvl', ['Assets/bgmusic_lvlselect.wav']);
            this.load.audio('bgmusictitle', ['Assets/title_tutorial_music.wav']);
            this.load.audio('jump', ['Assets/jump.wav']);
            this.load.audio('error', ['Assets/error.wav']);
            this.load.audio('bump', ['Assets/bump.wav']);
            this.load.audio('pop', ['Assets/pop.wav']);
            this.load.audio('speedboostSFX', ['Assets/item_speedup.wav']);
            this.load.audio('balloonspawn', ['Assets/balloonspawn.wav']);
            this.load.audio('bonuspointSFX', ['Assets/item_pointbonus.wav']);

            //tutorial image
            this.load.image('tutorial', ['Assets/tutorialscreen.jpg']);
            this.load.image('tutorial_1', ['Assets/Tutorial1.png']);
            this.load.image('tutorial_2', ['Assets/Tutorial2.png']);
            this.load.image('tutorial_3', ['Assets/Tutorial3.png']);
            this.load.image('tutorial_4', ['Assets/Tutorial4.png']);
            this.load.image('fcollide', 'dontquestionme/colliderwide.png');
            this.load.image('scollide', 'dontquestionme/collider_small.png');
            this.load.image('colliders', 'dontquestionme/colliders.png');
            this.load.image('mcollide','dontquestionme/colliders_m.png')
            this.load.image('trcollide','dontquestionme/trunkcollide.png')
            this.load.image('lfcollide','dontquestionme/leafcollide.png')
            
            //title
            this.load.image('logo', 'Assets/logo.png');
            this.load.image('credits', 'Assets/credits.png');
            sound = true
        }
    },
    create: function(){
            //startup =false
            lost = false
            

            this.add.image(400, 300, 'sky');
            logo = this.add.image(400, 150, 'logo');
            logo.setScale(0.75);

            //add skip text
            this.add.text(275,350, 'Press T for Tutorial', {fontSize: '25px', fill: '#000', fontFamily: 'font1'});
            this.add.text(250,400, 'Press L for Level Select', {fontSize: '25px', fill: '#000', fontFamily: 'font1'});
            this.add.text(285,450, 'Press C for Credits', {fontSize: '25px', fill: '#000', fontFamily: 'font1'});
            this.add.text(10,575, 'Press M to enable/disable audio', {fontSize: '18px', fill: '#000', fontFamily: 'font1'});

            
            if(loaded == false){
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
                loaded = true;
            }

            //audio
            if(sound == true){
                bgmusic = this.sound.add('bgmusictitle', {loop: true});
                bgmusic.play();
            }

            // Input Events
            


            //Second Player Keys
            keys = this.input.keyboard.addKeys('L,T,M,C');

    },
    update: function(){
        if(keys.C.isDown){
            trust()
            this.scene.start('credits')
        }
        if(keys.L.isDown){
            trust()
            this.scene.start('levelselect')
        }
        if(keys.T.isDown){
                
            this.scene.start('tutorial1')
        }
        if(keys.M.isDown){
            if(mhold == false){
                mhold = true
                if(sound == true){
                    this.game.sound.stopAll();
                    sound = false
                }
                else{
                    sound = true
                    bgmusic = this.sound.add('bgmusictitle', {loop: true});
                    bgmusic.play();
                }
            }
        }
        else{
            mhold = false
        }
    }
});

var credits = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize:
        function credits(){
            Phaser.Scene.call(this,{key:'credits'});
        },
        preload: function(){
            
            
        },
        create: function(){
                
                //startup =false
                lost = false
                this.add.image(400, 300, 'sky');
            
                this.add.text(460,575, 'Press H to return to the Title', {fontSize: '18px', fill: '#000', fontFamily: 'font1'});
                this.add.text(10,575, 'Press M to enable/disable audio', {fontSize: '18px', fill: '#000', fontFamily: 'font1'});
            
                this.add.image(400, 300, 'credits');    
            
                //audio
                if(sound == true){
                
                    bgmusic = this.sound.add('bgmusiclvl', {loop: true});
                    bgmusic.play()
                }
                //Second Player Keys
                keys = this.input.keyboard.addKeys('H,M');
    

        },
        update: function(){
            if(keys.H.isDown){
                bgmusic.stop()
                this.scene.start('title')
            }
            console.log(mhold)
            
                if(keys.M.isDown){
                    if(mhold == false){
                    mhold = true
                    if(sound == true){
                        this.game.sound.stopAll();
                        sound = false
                    }
                    else{
                        sound = true

                        
                        bgmusic = this.sound.add('bgmusiclvl', {loop: true});
                        bgmusic.play()
                    }
                }

                }
                else{
                    mhold = false
                }
            
            
            
        }
    });

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:100 },
            debug: false
        }
        
    },
    scene: [title,tutorial1,tutorial2,tutorial3,tutorial4,levelselect,firstScene,secondScene,thirdScene,fourthScene,fifthScene,tutorial0,credits]
};

var game = new Phaser.Game(config);
//  _____ _       _           _                       
// |  __ \ |     | |         | |                      
// | |  \/ | ___ | |__   __ _| | __   ____ _ _ __ ___ 
// | | __| |/ _ \| '_ \ / _` | | \ \ / / _` | '__/ __|
// | |_\ \ | (_) | |_) | (_| | |  \ V / (_| | |  \__ \
//  \____/_|\___/|_.__/ \__,_|_|   \_/ \__,_|_|  |___/
//pre-making global varables
if(true){
    var player_red;
    var player_blue;
    var platforms;
    var player_red_jump = false;
    var balloons;
    var speedboosts;
    var coins;
    var spawnedCoinGroup = false;
    var loaded = false;
    var loaded2 = false;
    var score = 0;
    var scoreText;
    var livesText;
    var mhold = false

    var timer;
    var totalBalloons = 1;
    
    var powerupSpawnTimer;

    var keys;
    var cursors;
    var max;
    var max1 = 8
    var max2 = 8 
    var max3 = 8
    var max4 = 8
    var max5 = 8
    var playerSpeed = 270;
    var jumpSpeed = 450;
    var lives;
    var lives1 = 8
    var lives2 = 8 
    var lives3 = 8
    var lives4 = 8
    var lives5 = 8
    var lost = false;
    var loseText;
    var cvis = false
    var sound =false
    //var startup;
};
//var bgmusic;
//var popSFX;



// ___  ___               
// |  \/  |               
// | .  . | _____   _____ 
// | |\/| |/ _ \ \ / / _ \
// | |  | | (_) \ V /  __/
// \_|  |_/\___/ \_/ \___|
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
        if(sound == true){
            jump.play();
        }
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
        if(sound == true){
            jump.play();
        }
        player_blue.setVelocityY(-jumpSpeed);
    } 
    if (!player_blue.body.touching.down){
        player_blue.anims.play('blue_jump', true);
    } 
}

function redMovement () {
    
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
        if(sound == true){
            jump.play();
        }
        player_red.setVelocityY(-jumpSpeed);
        //player_red.anims.play('jump', true);
    }
    if (!player_red.body.touching.down){
        player_red.anims.play('red_jump', true);
    }
}
// ______       _ _                   
// | ___ \     | | |                  
// | |_/ / __ _| | | ___   ___  _ __  
// | ___ \/ _` | | |/ _ \ / _ \| '_ \ 
// | |_/ / (_| | | | (_) | (_) | | | |
// \____/ \__,_|_|_|\___/ \___/|_| |_|
function hitBalloon(player, balloon){
    if(lives >0){
        balloon.setVelocityY(-260);
        player.setVelocityY(200);
        if(sound == true){
            bump.play();
        }

        score += 1;
        scoreText.setText('Score:' + score);
    }
}

function hitBalloonTut(player, balloon){

    balloon.setVelocityY(-260);
    player.setVelocityY(200);

    bump.play();
    
}
function hitBalloonstop(balloon){
    
    balloon.setVelocityY(-2 * (balloon.body.velocity.y  / Math.abs(balloon.body.velocity.y)*(Math.abs(balloon.body.velocity.y) + 20)))
    balloon.setVelocityX(  (balloon.body.velocity.x  / Math.abs(balloon.body.velocity.x)*(Math.abs(balloon.body.velocity.x) + 20)))

    bump.play();
    
}

function bounceBalloon(balloon, platform) {
    balloon.applyForce(new Vector2(0, 200));
    //balloon.setVelocityX(balloon.velocityX * 2);
}

function popBalloon(balloon, ground){
    totalBalloons -= 1;
    lives -=1
    livesText.setText('Lives: '+lives)
    if (lives == 0) {
        loseText.visible = true;
        lost = true;
        timer.remove();
        if(sound == true){
            error.play();
            popSFX.play();
            bgmusic.stop();
        }
        player_red.anims.play('red_idle', true);
        player_blue.anims.play('blue_idle', true);
        player_blue.setVelocityX(0);
        player_red.setVelocityX(0);
    }else{
        if(sound == true){
            popSFX.play();
        }
    }
    balloon.destroy();
}

function popBalloonTut(balloon, ground){
    popSFX.play();
    balloon.destroy();
}

function spawnBalloon(){
    if(totalBalloons<=max){
        totalBalloons++;
        console.log(totalBalloons)
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
        balloon.setCircle(20, 5, 20);
        balloon.setMaxSpeed = 2;

        balloon.setCollideWorldBounds(true);  

        //play SFX
        if(sound == true){
            balloonSpawn.play();
        }
    }
}
function spawnBalloon2(){
    if(totalBalloons<=max){
        totalBalloons++;
        console.log(totalBalloons)
        var x = Phaser.Math.Between(0, 200);
        var y = Phaser.Math.Between(0,1)
        if(y == 0){
            var balloon = balloons.create(x, 0, 'balloon');
        }
        else{
            var balloon = balloons.create(800-x, 0, 'balloon');
        }
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
        balloon.setCircle(20, 5, 20);
        balloon.setMaxSpeed = 2;

        balloon.setCollideWorldBounds(true);

        //play SFX
        if(sound == true){
            balloonSpawn.play();
        }
    }
}


function spawnBalloonTut(){
    
    //console.log(totalBalloons)
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
    balloon.setCircle(20, 5, 20);
    balloon.setMaxSpeed = 2;

    balloon.setCollideWorldBounds(true);  

    //play SFX
    if(sound == true){
        balloonSpawn.play();
    }
    
}
// ______                        _   _       
// | ___ \                      | | | |      
// | |_/ /____      _____ _ __  | | | |_ __  
// |  __/ _ \ \ /\ / / _ \ '__| | | | | '_ \ 
// | | | (_) \ V  V /  __/ |    | |_| | |_) |
// \_|  \___/ \_/\_/ \___|_|     \___/| .__/ 
//                                    | |    
//                                    |_|  
function spawnPowerup(){
    //console.log("Spawn")
    //console.log(startup)
    //if(startup == true){
    if(lives >0){
        var powerup = Phaser.Math.FloatBetween(0,1);
        var x = Phaser.Math.Between(0,800);
        if(powerup <= .2){
            var speedboost = speedboosts.create(x, 0, 'speedboost');
            speedboost.setScale(0.02);
            speedboost.setVelocity(Phaser.Math.Between(-200, 200), 20);
            speedboost.setMass(0.3);
            speedboost.allowGravity = true;
            speedboost.setBounce(0.2);
            speedboost.setGravityY(1);
            speedboost.useDamping = true;
            speedboost.allowDrag = true;
            speedboost.allowRotation = true;
            speedboost.setAngularAcceleration(1);
            speedboost.isCircle = true;
            speedboost.setCircle(800, -404, -170);
            speedboost.setMaxSpeed = 2;

            speedboost.setCollideWorldBounds(true);
        } else if (powerup >=.8){
            var coin = coins.create(x, 0, 'coin');
            coin.setScale(0.2);
            coin.setVelocity(Phaser.Math.Between(-200, 200), 20);
            coin.setMass(0.3);
            coin.allowGravity = true;
            coin.setBounce(0.2);
            coin.setGravityY(1);
            coin.useDamping = true;
            coin.allowDrag = true;
            coin.allowRotation = true;
            coin.setAngularAcceleration(1);
            coin.isCircle = true;
            coin.setCircle(125, 0, 0);
            coin.setMaxSpeed = 2;

            coin.setCollideWorldBounds(true);
        //}
        //else{
        //    startup = true
        //    console.log(startup)
        //}
    } else if (0.3 <= powerup <= 0.5) {
        var oneup = oneups.create(x, 0, 'oneup');
        oneup.setScale(0.5);
        oneup.setVelocity(Phaser.Math.Between(-200, 200), 20);
        oneup.setMass(0.3);
        oneup.allowGravity = true;
        oneup.setBounce(0.2);
        oneup.setGravityY(1);
        oneup.useDamping = true;
        oneup.allowDrag = true;
        oneup.allowRotation = true;
        oneup.setAngularAcceleration(1);
        oneup.isCircle = true;
        oneup.setCircle(50, 0, 0);
        oneup.setMaxSpeed = 2;

        coin.setCollideWorldBounds(true);
    }
    }
    
}

function speedBoost(player, speedboost){
    //var balloonCount = totalBalloons;
    playerSpeed = 450;
    if(sound == true){
        speedboostSFX.play();
    }
    speedboost.destroy();
    powerupTimer = this.time.addEvent({
        delay: 4000,
        callback: resetPowerups,
        loop: false
    });
}

function coinGet(player, coin){
    score += 10;
    if(sound == true){
        bonuspointSFX.play();
    }
    scoreText.setText('Score:' + score);
    coin.destroy();
}

function oneUp(player, oneUp) {
    lives += 1;
    if (sound == true) {
        bonuspointSFX.play();
    }
    livesText.setText("Lives:" + lives)
    oneUp.destroy();
}

function resetPowerups(){
    playerSpeed = 270;
}
function trust(){
    if(sound == true){
        bgmusic.stop();
    }
    
}