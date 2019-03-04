const GUN_FIRE_VOLUMN = 1.0;
const BACKGROUND_MUSIC_VOLUMN = 0.5;
const PLAYER_MAX_HP = 210;
const ITEM_LIST = ["m9","akm","groza","awm","drink","firstaid","grenade"];
var currentstage = "normal";
var isPause = 0;
var msg = "";
var musicTrack;
var gunFireTrack;
var isGameOver = false;
var currentlevel =1;
var isMute = false;
var playerName = 'saitama';


var fastSkullSpot = [[0,0],[0,650],[1300,0],[1300,650]];

var map;
var supplySpotList = [];

// weapon info
const itemInfo = {

    "m9": {
        "speed": 25,
        "damage": 15,
        "range":700
    },
    "akm": {
        "speed": 18,
        "damage": 4,
        "range":900
    },
    "groza": {
        "speed": 30,
        "damage": 1,
        "range":550
    },
    "awm": {
        "speed": 40,
        "damage": 50,
        "range":1400
    },
    "grenade": {
        "damage": 100
    },
    "firstaid": {
        "speed": 100
    },
    "drink": {
        "speed": 6
    }
}

// enemy stat
const enemyStat = {
    //level 1
    "skullLevel1": {
        "hp": 70
    },
    "skullFastLevel1": {
        "hp": 20
    },
    "bossLevel1": {
        "hp": 250
    },

    // levell 2
    "skullLevel2": {
        "hp": 100
    },
    "skullFastLevel2": {
        "hp": 30
    },   
    "bossLevel2": {
        "hp": 500
    }, 

    //level 3
    "skullLevel3": {
        "hp": 150
    },
    "skullFastLevel3": {
        "hp": 40
    },
    "bossLevel3": {
        "hp": 750
    },    

    // level 4
    "skullLevel4": {
        "hp": 200
    },
    "skullFastLevel4": {
        "hp": 40
    }, 
    "bossLevel4": {
        "hp": 1000
    },
    
    //level 5
    "skullLevel5": {
        "hp": 250
    },
    "skullFastLevel5": {
        "hp": 50
    },
    "bossLevel5": {
        "hp": 1000
    },
    
}

var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}





// no inheritance
function NotMovingElement(game, spritesheet,thex,they, theimgwidth,theimgheight,speed) {
    this.x = thex;
    this.y = they;
    this.myimgwidth = theimgwidth;
    this.myimgheight = theimgheight;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.myspeed = speed;
};

NotMovingElement.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y,this.myimgwidth,this.myimgheight);
};

NotMovingElement.prototype.update = function () {
};


  ////////Explosion
function Heal(game, player) {
    this.animation = new Animation(AM.getAsset("./img/heal.png")
        , 185, 185, 5, 0.15, 20, false, 0.5);
    //this.speed = speed;
    //this.isMoving = isMoving;
    this.player = player;
    this.time=1;
    this.width =185;
    this.height = 185;
    //this.dir = dir;
    
    Entity.call(this, game, player.x, player.y);
}

// Explosion.prototype = new Entity();
// Explosion.prototype.constructor = Grass2;

Heal.prototype.update = function () {
    //console.log("draged");
    this.time++;
    // var pos = [37,38,39,40];
    // this.dir = pos.random();
    this.x = this.player.x;
    this.y = this.player.y;


    
Heal.prototype.update.call(this);

}

Heal.prototype.draw = function (ctx) {
    
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}




// no inheritance
function Item(game, src,thex,they, theimgwidth,theimgheight,dmg,heal, itemName) {
    this.x = thex;
    this.y = they;
    this.myimgwidth = theimgwidth;
    this.myimgheight = theimgheight;
    this.spritesheet = AM.getAsset(src);
    this.src =src;
    this.game = game;
    this.ctx = game.ctx;
    this.dmg = dmg;
    this.heal = heal;
    this.itemName = itemName;
    this.trans = 0.5;
    this.change = 0.01;
};

Item.prototype.draw = function () {
    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    if(this.trans >= 1) {
        this.change = -this.change;
    }else if (this.trans <= 0.2){
        this.change = -this.change;
    }
    this.trans += this.change;
    //console.log(this.trans);
    this.ctx.fillStyle = "rgba(205,255,0,"+this.trans+")";
    this.ctx.fillRect(this.x, this.y, this.myimgwidth, this.myimgheight);
    this.ctx.strokeStyle = "rgba(205,255,0,1)";
    this.ctx.rect(this.x, this.y, this.myimgwidth, this.myimgheight);
    this.ctx.stroke();

    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y,this.myimgwidth,this.myimgheight);
};

Item.prototype.update = function () {
};

//For circle bullet boss
function FireCircle(game, spritesheet,xval,yval
    , frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale,speed, angle) {

    this.animation = new Animation(spritesheet
        , frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale);
    this.speed = speed;
    //this.isMoving = isMoving;
    this.ctx = game.ctx;
    this.time=1;
    this.width =20;
    this.height = 20;
    this.bossxval = xval;
    this.bossyval = yval;
    this.angle = angle;
    this.fireshoot = true;
    this.firenumber = 0;
    this.radius = 100;
    this.scale= scale;
    this.name = 999;
   
    
    Entity.call(this, game, xval, yval);
}



FireCircle.prototype.update = function () {
    
    this.angle +=2;
    if (this.angle>359) this.angle=0;
    let timeClock = Math.floor(this.game.timer.gameTime);
    // console.log("from firecircle;");
if(timeClock%5 == 3 || timeClock%5 == 4){
    // this.firenumber++;
    this.animation.scale +=0.01; 
    this.scale = this.animation.scale;
    this.width +=5;
    this.height = 5;
this.radius +=5;
if(this.game.AIList.length>0){
    this.x = this.game.AIList[0].x+10 + (this.radius) * Math.cos(this.angle* Math.PI / 180);
 this.y = this.game.AIList[0].y+40 + (this.radius) * Math.sin(this.angle * Math.PI / 180);

}

}else {
    if(this.game.AIList.length>0){
    // this.firenumber = 0;
    this.animation.scale =0.5;
    this.radius=100;
    this.width =20;
    this.height = 20;
 this.x = this.game.AIList[0].x+10 + this.radius * Math.cos(this.angle* Math.PI / 180);
 this.y = this.game.AIList[0].y+40 + this.radius * Math.sin(this.angle * Math.PI / 180);
    }
}
if(this.game.AIList.length>0){
    this.game.AIList[0].bossBulletFire = false;
    
    Entity.prototype.update.call(this);
}
}

FireCircle.prototype.draw = function (ctx) {
    
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }


  ////////Explosion
function Explosion(game, spritesheet,xval,yval
    , dir, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale,speed, owner) {
    this.animation = new Animation(spritesheet
        , frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale);
    this.speed = speed;
    //this.isMoving = isMoving;
    this.ctx = game.ctx;
    this.time=1;
    this.width =100;
    this.height = 100;
    this.dir = dir;
    this.owner = owner;
    Entity.call(this, game, xval, yval);
}

// Explosion.prototype = new Entity();
// Explosion.prototype.constructor = Grass2;

Explosion.prototype.update = function () {

    if(this.owner != null) {
        this.x = this.owner.x-25;
        this.y = this.owner.y -90;
        this.time++;
        return;
    }
    //console.log("draged");
    this.time++;
    // var pos = [37,38,39,40];
    // this.dir = pos.random();
    if(this.speed !=0) {
        if(this.dir === 37 ) {
        this.x += -this.speed;
    } else if(this.dir === 38) {
        this.y += -this.speed;
    } else if(this.dir === 39) {
        this.x += this.speed;
    } else if(this.dir == 40){
        this.y += this.speed;
    }else if(this.dir === 3738) {
        this.x += -this.speed;
        this.y += -this.speed;
    } else if(this.dir==37380){
        this.x +=-this.speed;
        this.y+=-this.speed/2;
    }else if(this.dir === 3839){
        this.x += this.speed;
        this.y += -this.speed;
    }else if(this.dir ===3940) {
        this.x += this.speed;
        this.y += this.speed;
    } else if(this.dir === 4037){
        this.y += this.speed;
        this.x += -this.speed;
    } else if(this.dir==39400){
        this.y +=this.speed/2;
        this.x +=this.speed;
    }else if(this.dir==38390){
        this.y -=this.speed/2;
        this.x +=this.speed;
    }else if(this.dir==37400){
        this.x -= this.speed;
        this.y +=this.speed/2;
    }else if(this.dir==373800){
        this.y -=this.speed;
        this.x -=this.speed/2;
    }else if(this.dir==383900){
        this.x += this.speed/2;
        this.y -=this.speed;
    }else if(this.dir==403700){
        this.y +=this.speed;
        this.x -=this.speed/2;
    }else if(this.dir==403900){
        this.x += this.speed/2;
        this.y +=this.speed;
    }else if(this.dir==0){
        this.x += Math.cos(this.game.exactAngle) * this.speed;
        this.y += Math.sin(this.game.exactAngle) * this.speed;
    }else{
        console.log("no dir:" + this.dir);
    }

    // (403700,403900)
}
    
    Entity.prototype.update.call(this);
}

Explosion.prototype.draw = function (ctx) {
    
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

  ////////Explosion
  function Grenade(game, spritesheet,xval,yval, dir) {
    this.animation = new Animation(spritesheet, 27, 31, 11, 0.1, 11, false, 1.2);
    this.speed = 5;
    this.ctx = game.ctx;
    this.time=1;
    this.width =100;
    this.height = 100;
    this.dir = dir;
    Entity.call(this, game, xval, yval);
}

// Explosion.prototype = new Entity();
// Explosion.prototype.constructor = Grass2;

Grenade.prototype.update = function () {
    // if(this.animation.isDone()) {
    //     console.log("drawed")
    //     this.game.BombList.push(new Explosion(this.game
    //         ,AM.getAsset("./img/explosion.png"),this.x,this.y, this.lastDir
    //         , 100, 100, 5, 0.15, 11, false, 0.9, false));

    // }
    //console.log("draged");
    this.time++;
    // console.log(this.time);


    // var pos = [37,38,39,40];
    // this.dir = pos.random();
    if(this.dir === 37 ) {
        this.x += -this.speed;
        if(this.time == 50) {
            this.game.dmganimationList.push(new Explosion(this.game
                ,AM.getAsset("./img/explosion.png"),this.x-100,this.y-70, this.lastDir
                , 96, 96, 5, 0.05, 15, false, 1.5, 0));
        }
    } else if(this.dir === 38) {
        this.y += -this.speed;
        if(this.time == 50) {
            this.game.dmganimationList.push(new Explosion(this.game
                ,AM.getAsset("./img/explosion.png"),this.x-50,this.y-100, this.lastDir
                , 96, 96, 5, 0.05, 15, false, 1.5, 0));
        }
    } else if(this.dir === 39) {
        this.x += this.speed;
        if(this.time == 50) {
            this.game.dmganimationList.push(new Explosion(this.game
                ,AM.getAsset("./img/explosion.png"),this.x+50,this.y-70, this.lastDir
                , 96, 96, 5, 0.05, 15, false, 1.5, 0));
        }
    } else {
        this.y += this.speed;
        if(this.time == 50) {
            this.game.dmganimationList.push(new Explosion(this.game
                ,AM.getAsset("./img/explosion.png"),this.x-50,this.y+35, this.lastDir
                , 96, 96, 5, 0.05, 15, false, 1.5, 0));
        }
    }
    
    Entity.prototype.update.call(this);
}

Grenade.prototype.draw = function (ctx) {
    
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

AM.queueDownload("./img/normal2.png");
AM.queueDownload("./img/akm.png");
AM.queueDownload("./img/drink.png");
AM.queueDownload("./img/firstaid.png");
AM.queueDownload("./img/grenade.png");
AM.queueDownload("./img/groza.png");
AM.queueDownload("./img/m9.png");
AM.queueDownload("./img/painkiller.png");

AM.queueDownload("./img/stone.png");
AM.queueDownload("./img/bush.png");
AM.queueDownload("./img/circlestone.png");
AM.queueDownload("./img/flowers.png");

AM.queueDownload("./img/sk.png");
AM.queueDownload("./img/skfast.png");
AM.queueDownload("./img/skboss.png");
AM.queueDownload("./img/boss.png");

AM.queueDownload("./img/bullet.png");
AM.queueDownload("./img/circleBullet.png");

AM.queueDownload("./img/tree.png");
AM.queueDownload("./img/fin.png");
AM.queueDownload("./img/saitama.png");
AM.queueDownload("./img/arjun.png");
AM.queueDownload("./img/finIcon.png");
AM.queueDownload("./img/saitamaIcon.png");
AM.queueDownload("./img/arjunIcon.png");
AM.queueDownload("./img/awm.png");
AM.queueDownload("./img/greendmg.png");
AM.queueDownload("./img/greendmg2.png");
AM.queueDownload("./img/purpledmg.png");
AM.queueDownload("./img/fire.png");
AM.queueDownload("./img/grenademotion.png");
AM.queueDownload("./img/explosion.png");

AM.queueDownload("./img/disappear.png");

AM.queueDownload("./img/goldBoss.png");

AM.queueDownload("./img/trash.png");
AM.queueDownload("./img/monstersfire.png");
AM.queueDownload("./img/little.png");

AM.queueDownload("./img/heal.png");

AM.queueDownload("./img/longbullet.png");
AM.queueDownload("./img/longbullet2.png");
AM.queueDownload("./img/midbullet.png");
AM.queueDownload("./img/blackskull.png");


AM.queueDownload("./img/alien.png");
AM.queueDownload("./img/bush2.png");
AM.queueDownload("./img/bush3.png");
AM.queueDownload("./img/house.png");







//var bgname = "./img/level1bg.png";

AM.queueDownload("./img/level1bg.png");
AM.queueDownload("./img/level2bg.png");
AM.queueDownload("./img/level3bg.png");
AM.queueDownload("./img/level4bg.png");
AM.queueDownload("./img/level5bg.png");


function start() {
    
    AM.downloadAll(function () {
        // isDead = false;
        // console.log("we are at level" +currentlevel++);

        var canvas = document.getElementById("gameWorld");
        var ctx = canvas.getContext("2d");
        //canvas.style.backgroundColor
    
        var gameEngine = new GameEngine();
        gameEngine.init(ctx);
    
       // tree
        gameEngine.wall.push(new NotMovingElement(gameEngine, AM.getAsset("./img/level1bg.png"),-20,0,20,750,1));

        gameEngine.wall.push(new NotMovingElement(gameEngine, AM.getAsset("./img/level1bg.png"),0,-20,1400,20,1));

        gameEngine.wall.push(new NotMovingElement(gameEngine, AM.getAsset("./img/level1bg.png"),0,750,1400,20,1));

        gameEngine.wall.push(new NotMovingElement(gameEngine, AM.getAsset("./img/level1bg.png"),1400,0,20,750,1));

        gameEngine.playerList.push(new Player
            (gameEngine,15,138,34,52,0,650,51,78,AM.getAsset("./img/"+playerName+".png"), "player1", playerName));

        startNextLevel(gameEngine);

    
        // for(var i =0; i<5; i++) {
        //     gameEngine.AIList.push(new AI
        //         (gameEngine,15,138,34,52,400,300,51,78,AM.getAsset("./img/sk.png"),1, 50,2));
        //  }
    
    
        // gameEngine.addEntity(new Guy(gameEngine, AM.getAsset("./img/guy.jpg")));
    
        gameEngine.start();
        console.log("All Done!");
    });
}

function dropSupply(gameEngine) {
    supplySpotList = [];

    for(var i = 0; i< map.length; i++){
        for(var j = 0; j< map[i].length; j++){
            if(map[i][j] ==0) supplySpotList.push([i,j]);
        }   
    }



    for(var i = 0; i<10; i++) {



        var item = ITEM_LIST[Math.floor(Math.random()* 7)];
        var spot = supplySpotList.random();
        gameEngine.supplyList.push(new Item(
            gameEngine,
             "./img/"+item+".png",
             spot[1] * 70,
             spot[0] * 75,
             40,
             40,
             5,
             0,
             item));
         //console.log(spot[1]  + ", " +spot[0] );
    }
}

function startNextLevel(gameEngine) {
    stopMusic();
    playMusic("normal");

    if(currentlevel == 1) {
        gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/level1bg.png"),0,0,1400,750,1));
        
        map = [

                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,5,5,6,5,5,5,5,0,5,5,5,5,0,5,5,5,5,5,0],
            
                        [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
            
                        [0,5,0,0,0,0,0,8,8,8,8,0,0,0,0,0,0,0,5,0],
            
                        [0,0,0,0,0,0,0,8,8,8,8,0,0,0,0,0,0,0,0,0],
            
                        [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
            
                        [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
            
                        [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
            
                        [0,5,5,5,5,5,5,5,5,0,7,7,7,7,0,5,5,5,5,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
            
            
                    ]
            gameEngine.playerList[0].x = 700;
            gameEngine.playerList[0].y = 0;
            for(var i =0; i<3; i++) {
                gameEngine.AIList.push(new AI
                    (gameEngine,15,138,34,52,400,300,51,78,AM.getAsset("./img/sk.png"),1, enemyStat.skullLevel1.hp,2));
            }
            for(var i =0; i<3; i++) {
                gameEngine.AIList.push(new AI
                    (gameEngine,15,138,34,52,1200,300,51,78,AM.getAsset("./img/sk.png"),1, enemyStat.skullLevel1.hp,2));
            }
        
    } else if (currentlevel == 4) {
        gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/level4bg.png"),0,0,1400,750,1));
        map = [

            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,0,9,9,9,0,0,9,9,0,0,9,9,0,0,9,9,9,0,0],
            
                        [0,0,9,9,9,0,0,9,9,0,0,9,9,0,0,9,9,9,0,0],
            
                        [0,0,9,9,9,0,0,9,9,0,0,9,9,0,0,9,9,9,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,0,9,9,9,0,0,9,9,0,0,9,9,0,0,9,9,9,0,0],
            
                        [0,0,9,9,9,0,0,9,9,0,0,9,9,0,0,9,9,9,0,0],
            
                        [0,0,9,9,9,0,0,9,9,0,0,9,9,0,0,9,9,9,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

            
            
            
                    ]
            gameEngine.playerList[0].x = 960;
            gameEngine.playerList[0].y = 660;

            for(var i =0; i<5; i++) {
                gameEngine.AIList.push(new AI
                    (gameEngine,15,138,34,52,700,0,51,78,AM.getAsset("./img/sk.png"),1, enemyStat.skullLevel4.hp,2));
            }
            for(var i =0; i<5; i++) {
                gameEngine.AIList.push(new AI
                    (gameEngine,15,138,34,52,700,650,51,78,AM.getAsset("./img/normal2.png"),1.2, enemyStat.skullLevel4.hp,2));
            }
         
    } else if (currentlevel == 3) {
        gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/level3bg.png"),0,0,1400,750,1));

        map = [

                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,0,4,4,4,0,0,4,4,0,0,4,4,0,0,4,4,4,0,0],
            
                        [0,0,4,4,4,0,0,4,4,0,0,4,4,0,0,4,4,4,0,0],
            
                        [0,0,4,4,4,0,0,4,4,0,0,4,4,0,0,4,4,4,0,0],
            
                        [0,0,4,4,4,0,0,4,4,0,0,4,4,0,0,4,4,4,0,0],
            
                        [0,0,4,4,4,0,0,4,4,0,0,4,4,0,0,4,4,4,0,0],
            
                        [0,0,4,4,4,0,0,4,4,0,0,4,4,0,0,4,4,4,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   
            
                    ]
            gameEngine.playerList[0].x = 960;
            gameEngine.playerList[0].y = 660;

            for(var i =0; i<4; i++) {
                gameEngine.AIList.push(new AI
                    (gameEngine,15,138,34,52,400,0,51,78,AM.getAsset("./img/sk.png"),1, enemyStat.skullLevel3.hp,2));
            }
            for(var i =0; i<4; i++) {
                gameEngine.AIList.push(new AI
                    (gameEngine,15,138,34,52,400,650,51,78,AM.getAsset("./img/normal2.png"),1.2, enemyStat.skullLevel3.hp,2));
            }
            
    } else if (currentlevel == 2) {
        gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/level2bg.png"),0,0,1400,750,1));

        map = [

                        
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1],
            
                        [0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0],
            
                        [0,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
            
            
            
                    ]
            gameEngine.playerList[0].x = 960;
            gameEngine.playerList[0].y = 660;
            for(var i =0; i<3; i++) {
                gameEngine.AIList.push(new AI
                    (gameEngine,15,138,34,52,400,0,51,78,AM.getAsset("./img/normal2.png"),1.2, enemyStat.skullLevel2.hp,2));
            }
            for(var i =0; i<3; i++) {
                gameEngine.AIList.push(new AI
                    (gameEngine,15,138,34,52,400,300,51,78,AM.getAsset("./img/normal2.png"),1.2, enemyStat.skullLevel2.hp,2));
            }
            for(var i =0; i<3; i++) {
                gameEngine.AIList.push(new AI
                    (gameEngine,15,138,34,52,400,600,51,78,AM.getAsset("./img/normal2.png"),1.2, enemyStat.skullLevel2.hp,2));
            }
    }else if (currentlevel == 5) {
        gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/level5bg.png"),0,0,1400,750,1));

        map = [

                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,2,2,2,2,0,0,2,0,0,0,2,0,0,2,2,2,0,0,0],
            
                        [0,2,0,0,0,0,0,2,2,0,0,2,0,0,2,0,0,2,0,0],
            
                        [0,2,2,2,2,0,0,2,0,2,0,2,0,0,2,0,0,2,0,0],
            
                        [0,2,0,0,0,0,0,2,0,0,2,2,0,0,2,0,0,2,0,0],
            
                        [0,2,2,2,2,0,0,2,0,0,0,2,0,0,2,2,2,0,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            
            
            
                    ]
            gameEngine.playerList[0].x = 960;
            gameEngine.playerList[0].y = 660;

            for(var i =0; i<5; i++) {
                gameEngine.AIList.push(new AI
                    (gameEngine,15,138,34,52,700,0,51,78,AM.getAsset("./img/sk.png"),1, enemyStat.skullLevel5.hp,2));
            }
            for(var i =0; i<5; i++) {
                gameEngine.AIList.push(new AI
                    (gameEngine,15,138,34,52,700,650,51,78,AM.getAsset("./img/normal2.png"),1.2, enemyStat.skullLevel5.hp,2));
            }
         
            
    }

    for(var i =0; i<map.length; i++) {
        for(var j = 0; j<map[i].length; j++) {
            if(map[i][j] == 1) {                  
                gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/house.png"),70*j,75*i,70,75)); 
            } else if (map[i][j] == 2) {
                gameEngine.bushList.push(new NotMovingElement(gameEngine, AM.getAsset("./img/bush2.png"),70*j,75*i,100,100,));
            } else if (map[i][j] == 3) {
                gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/bush3.png"),70*j,75*i,70,75,));
            } else if (map[i][j] == 4) {
                gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/circlestone.png"),70*j,75*i,70,75,1));
            } else if(map[i][j] == 5) {                  
                gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/tree.png"),70*j,75*i,70,75)); 
            } else if (map[i][j] == 6) {
                gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/stone.png"),70*j,75*i,70,75,));
            } else if (map[i][j] == 7) {
                gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/circlestone.png"),70*j,75*i,70,75,));
            } else if (map[i][j] == 8) {
                gameEngine.bushList.push(new NotMovingElement(gameEngine, AM.getAsset("./img/bush.png"),70*j,75*i,100,95,1));
            } else if (map[i][j] == 9) {
                gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/alien.png"),70*j,75*i,70,75,));
            } 
        }
    }

    // for(var i =0; i<3; i++) {
    //     gameEngine.AIList.push(new AI
    //         (gameEngine,15,138,34,52,400,0,51,78,AM.getAsset("./img/normal2.png"),1.2, 50,2));
    // }
    // for(var i =0; i<3; i++) {
    //     gameEngine.AIList.push(new AI
    //         (gameEngine,15,138,34,52,400,0,51,78,AM.getAsset("./img/sk.png"),1, 50,2));
    // }

    dropSupply(gameEngine);
}

function playMusic(name) {
    if(isMute) return; 
    if(name == "boss" || name == "normal") {
        musicTrack  = new Audio('./sound/'+ name + currentlevel + '.mp3');
        musicTrack.loop = true;
    }else {
        musicTrack  = new Audio('./sound/'+ name + '.mp3');
    }
    
    musicTrack.volume = 0.3;   
    
    musicTrack.play();
}

function stopMusic() {
    if(isMute) return;
    if(musicTrack != null)musicTrack.pause();
}


function playSoundEffect(name) {
    if(isMute) return;
    gunFireTrack  = new Audio('./sound/'+ name + '.mp3');
    if(name == "groza"){
        gunFireTrack.volume = 0.3;
    } else {gunFireTrack.volume = GUN_FIRE_VOLUMN;}
    
    gunFireTrack.play();
}


