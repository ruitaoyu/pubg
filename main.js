var AM = new AssetManager();

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;

    //console.log(this.spriteSheet.width);

    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// function Unicorn(game) {
//     this.animation = new Animation(AM.getAsset("./img/runingman.png"), 0, 0, 165, 295, 0.05, 25, true, false);
//     this.jumpAnimation = new Animation(AM.getAsset("./img/runingman.png"), 0, 885, 165, 295, 0.05, 28, false, false);
//     this.jumping = false;
//     this.radius = 100;
//     this.ground = 400;
//     Entity.call(this, game, 100, 400);
// }

// Unicorn.prototype = new Entity();
// Unicorn.prototype.constructor = Unicorn;

// Unicorn.prototype.update = function () {
//     if (this.game.space) this.jumping = true;
//     if (this.jumping) {
//         if (this.jumpAnimation.isDone()) {
//             this.jumpAnimation.elapsedTime = 0;
//             this.jumping = false;
//         }
//         var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
//         var totalHeight = 100;

//         if (jumpDistance > 0.5)
//             jumpDistance = 1 - jumpDistance;

//         //var height = jumpDistance * 2 * totalHeight;
//         var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
//         this.y = this.ground - height;
//     }
//     Entity.prototype.update.call(this);
// }

// Unicorn.prototype.draw = function (ctx) {
//     if (this.jumping) {
//         this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y,0.5);
//     }
//     else {
//         this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y,0.5);
//     }
//     Entity.prototype.draw.call(this);
// }







// inheritance 
// function Cheetah(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 165, 295, 12, 0.05, 26, true, 0.5);
//     this.speed = 000;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 100, 390);
// }

// Cheetah.prototype = new Entity();
// Cheetah.prototype.constructor = Cheetah;

// Cheetah.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
//     Entity.prototype.update.call(this);
// }

// Cheetah.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// }


// no inheritance
function MovingBackground(game, spritesheet,thex,they, theimgwidth,theimgheight,speed) {
    this.x = thex;
    this.y = they;
    this.myimgwidth = theimgwidth;
    this.myimgheight = theimgheight;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.myspeed = speed;
};

MovingBackground.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y,this.myimgwidth,this.myimgheight);
};

MovingBackground.prototype.update = function () {
    //this.x-=this.myspeed;
    if(this.x< -this.myimgwidth) this.x = 800;
};



function Background(game) {
    Entity.call(this, game, 0, 0);
    this.r = 135;
    this.b = 206;
    this.g = 250;
    this.radius = 200;
    dayandnight = 1;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
    this.r-=dayandnight;
    this.b -=dayandnight;
    this.g -=dayandnight;

    if(this.r <= 0 &&this.b <= 0 &&this.g <= 0) {
        dayandnight = -1;
    }

    if(this.r >= 135 &&this.b >= 206 &&this.g >= 250) {
        dayandnight = 1;
    }

    Entity.prototype.update.call(this);
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "rgb("+ this.r+","+ this.b+","+this.g+")";
    ctx.fillRect(0,0,1400,750);
    //ctx.drawImage(bgImg,0,0);
    Entity.prototype.draw.call(this);
}

function Gound(game, spritesheet) {
    this.x = 0;
    this.y = 400;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;

};

Gound.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Gound.prototype.update = function () {
    // this.x-=this.myspeed;
    // if(this.x< -this.myimgwidth) this.x = 800;
};



// no inheritance
function Sun(game, spritesheet,thex,they, theimgwidth,theimgheight,speed) {
    this.x = thex;
    this.y = they;
    this.myimgwidth = theimgwidth;
    this.myimgheight = theimgheight;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.myspeed = speed;
};

Sun.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y,this.myimgwidth,this.myimgheight);
};

Sun.prototype.update = function () {
    this.y+=this.myspeed;
    if(this.y>  550) this.y = -200;

    this.x+=this.myspeed;
    if(this.x> 800) this.x = -300;
};




function Fire(game) {
    this.animation = new Animation(AM.getAsset("./img/fire.png"), 0, 0, 64, 128, 0.05, 32, true, false);
    //this.jumpAnimation = new Animation(AM.getAsset("./img/fire.png"), 0, 885, 165, 295, 0.05, 28, false, false);
    this.jumping = false;
    this.radius = 100;
    this.ground = 100;
    Entity.call(this, game, 500, 370);
}

Fire.prototype = new Entity();
Fire.prototype.constructor = Fire;

Fire.prototype.update = function () {
    this.x -= 3;
    if (this.x < -64) this.x = 864;
    Entity.prototype.update.call(this);
}

Fire.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y,1.5);
    Entity.prototype.draw.call(this);
}



// no inheritance
function Land(game, spritesheet
    ,thex,they, theimgwidth,theimgheight
    ,sheetX, sheetY, sheetW, sheetH) {
    this.x = thex;
    this.y = they;
    this.myimgwidth = theimgwidth;
    this.myimgheight = theimgheight;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;


    this.sheetX = sheetX;
    this.sheetY = sheetY;
    this.sheetW = sheetW;
    this.sheetH = sheetH;

    //this.myspeed = speed;
};

Land.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y,this.myimgwidth,this.myimgheight,
                   this.sheetX, this.sheetY,this.sheetW,this.sheetH);
};

Land.prototype.update = function () {
    // this.y+=this.myspeed;
    // if(this.y>  550) this.y = -200;

    // this.x+=this.myspeed;
    // if(this.x> 800) this.x = -300;
};







function Player(game) {
    this.animation = new Animation(AM.getAsset("./img/sk.png"), 64, 0, 64, 64, 0.05, 1, true, false);

    this.northanimation = new Animation(AM.getAsset("./img/sk.png"), 64, 0, 64, 64, 0.05, 8, true, false);

    this.jumpAnimation = new Animation(AM.getAsset("./img/runingman.png"), 0, 885, 165, 295, 0.05, 28, false, false);
    this.jumping = false;
    this.north = false;
    this.radius = 100;
    this.ground = 400;
    Entity.call(this, game, 100, 400);
}

Player.prototype = new Entity();
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    if (this.game.space) this.jumping = true;
    if (this.jumping) {
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumping = false;
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 100;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    } 
    Entity.prototype.update.call(this);
}

Player.prototype.draw = function (ctx) {
    // if (this.jumping) {
    //     this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y,1);
    // }
    // else {
    //     this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y,1.5);
    // }
    if (this.north) {
        this.northnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y,1);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y,1.5);
    }
    Entity.prototype.draw.call(this);
}



function OBJ(sx,sy,sw,sh,cx,cy,cw,ch,img) {
    this.sheetX = sx;
    this.sheetY = sy;
    this.sheetWidth = sw;
    this.sheetHeight = sh;
    this.canvasX = cx;
    this.canvasY = cy;
    this.canvasWidth = cw;
    this.canvasHeight = ch;
    this.img =img;
    this.lastDir = 38;
    this.speed = 15;
}

OBJ.prototype.goForward = function(dir) {
    //console.log("go");
    switch(dir) {
      case 38:
        if(this.lastDir == dir) {
            //console.log("yes");
            this.sheetX += 64;
            this.canvasY -=this.speed;
            if(this.sheetX >= 576) {
                this.sheetX =0;
            }
        } else {
            this.sheetX = 0;
            this.sheetY = 0;
            this.lastDir =dir;
        }
        break;
      case 40:
        if(this.lastDir == dir) {
            //console.log("yes");
            this.sheetX += 64;
            this.canvasY +=this.speed;
            if(this.sheetX >= 576) {
                this.sheetX =0;
            }
        } else {
            this.sheetX = 0;
            this.sheetY = 128;
            this.lastDir =dir;
        }
        break;
      case 37:
        if(this.lastDir == dir) {
            //console.log("yes");
            this.sheetX += 64;
            this.canvasX -=this.speed;
            if(this.sheetX >= 576) {
                this.sheetX =0;
            }
        } else {
            this.sheetX = 0;
            this.sheetY = 64;
            this.lastDir =dir;
        }
        break;
      case 39:
        if(this.lastDir == dir) {
            //console.log("yes");
            this.sheetX += 64;
            this.canvasX +=this.speed;
            if(this.sheetX >= 576) {
                this.sheetX =0;
            }
        } else {
            this.sheetX = 0;
            this.sheetY = 192;
            this.lastDir =dir;
        }
        break;
      default:
        // code block
    }
}

OBJ.prototype.update = function() {

}

OBJ.prototype.nextFrame = function(dir) {
    switch(dir) {
      case 'south':
        this.canvasY += 3;
        break;
      case 'north':
        this.canvasY -= 3;
        break;
      case 'west':
        this.canvasX -= 3;
        break;
      case 'east':
        this.canvasX += 3;
        break;
      default:
        // code block
    }
}

OBJ.prototype.draw = function (ctx) {
    //console.log("inside draw");
    ctx.drawImage(this.img,
        this.sheetX, this.sheetY,  // source from sheet
        this.sheetWidth, this.sheetHeight, // width and height of source
        this.canvasX, this.canvasY, // destination coordinates
        this.canvasWidth, this.canvasHeight); // destination width and height
}






AM.queueDownload("./img/RobotUnicorn.png");
AM.queueDownload("./img/guy.jpg");
AM.queueDownload("./img/mushroomdude.png");
AM.queueDownload("./img/runningcat.png");
AM.queueDownload("./img/background.jpg");
AM.queueDownload("./img/runingman.png");
AM.queueDownload("./img/tree1.png");
AM.queueDownload("./img/tree2.png");
AM.queueDownload("./img/mountain.png");
AM.queueDownload("./img/gound.png");
AM.queueDownload("./img/sun.png");
AM.queueDownload("./img/fire.png");
AM.queueDownload("./img/grass.png");
AM.queueDownload("./img/suitMan.png");


AM.queueDownload("./img/416.png");
AM.queueDownload("./img/akm.png");
AM.queueDownload("./img/drink.png");
AM.queueDownload("./img/firstaid.png");
AM.queueDownload("./img/grenade.png");
AM.queueDownload("./img/groza.png");
AM.queueDownload("./img/m9.png");
AM.queueDownload("./img/painkiller.png");

AM.queueDownload("./img/bush.png");
AM.queueDownload("./img/land.png");

AM.queueDownload("./img/sk.png");





var bgname = "./img/bg3.png";

AM.queueDownload(bgname);

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    //canvas.style.backgroundColor

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);





    gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset(bgname),0,0,1400,750,1));

    // var player = new Player(gameEngine);
    // gameEngine.addEntity(player);


    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/416.png"),50,50,50,50,1));
    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/akm.png"),100,100,50,50,1));
    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/drink.png"),150,150,50,50,1));
    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/firstaid.png"),200,200,50,50,1));

    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/grenade.png"),250,250,50,50,1));
    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/groza.png"),300,300,50,50,1));
    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/m9.png"),350,350,50,50,1));
    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/painkiller.png"),400,400,50,50,1));


    var glasssize = 90;




gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
    ,353,288,94,94
    ,0,660,glasssize,glasssize));

        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,353,288,94,94
        ,1310,660,glasssize,glasssize));

        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,353,288,94,94
        ,0,0,glasssize,glasssize));

        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,353,288,94,94
        ,1310,0,glasssize,glasssize));



    for(var i=0; i<28 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,381,290,40,94
        ,47 + 47*i,0,47,glasssize));
    }




    for(var i=0; i<28 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,381,290,40,94
        ,47 + 47*i,660,47,glasssize));
    }

    for(var i=0; i<13 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,353,330,94,36
        ,0,73 + 47*i,glasssize,48));
    }

    for(var i=0; i<13 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,353,330,94,36
        ,1310,73 + 47*i,glasssize,48));
    }

    // for(var i=0; i<28 ; i++) {
    //     gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
    //     ,381,290,40,94
    //     ,47 + 47*i,650,47,glasssize));
    // }

    //     for(var j=0; j<15 ; j++) {
    //         gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png"),448,128,63,62,0 + 63*i,0+62*j,63,62));
    //     }
    // }

    for(var i=0; i<27 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,381,290,40,94
        ,60+47*i,300,47,glasssize));
    }



    //tree


    for(var i=0; i<6 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,225,417,63,93
        ,70 + 55 * i,60,63,93));
    }

    for(var i=0; i<3 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,225,417,63,93
        ,70, 60 + 60 * i,63,93));
    }

    for(var i=0; i<2 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,225,417,63,93
        ,400, 60 + 60 * i,63,93));
    }



    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/mountain.png"),200,100,600,400,1));
    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/mountain.png"),400,0,800,506,1));

    // //gameEngine.addEntity(new Gound(gameEngine, AM.getAsset("./img/gound.png")));

    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/gound.png"),
    // 1788,400,1788,300,2));

    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/gound.png"),
    // 0,400,1788,300,2));



        gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/416.png"),300,150,50,50,1));
    gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/akm.png"),300,200,50,50,1));
    gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/drink.png"),150,150,50,50,1));
    gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/firstaid.png"),200,150,50,50,1));

    gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/grenade.png"),250,150,50,50,1));
    gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/groza.png"),300,250,50,50,1));
    gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/m9.png"),350,150,50,50,1));
    gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/painkiller.png"),150,200,50,50,1));

    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/tree1.png"),
    // 200,300,200,200,2));

    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/tree1.png"),
    // 400,300,200,200,2));

    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/tree1.png"),
    // 700,350,150,150,2));

    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/tree2.png"),
    // 500,310,200,200,2));

    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/tree2.png"),
    // 100,300,200,200,2));

    // gameEngine.addEntity(new MovingBackground(gameEngine, AM.getAsset("./img/tree2.png"),
    // 800,200,300,300,2));

    // gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/tree2.png"),100,230,200,340,3));
    // gameEngine.addEntity(new MushroomDude(gameEngine, AM.getAsset("./img/mountain.png")));

    
    //gameEngine.addEntity(unicorn);
    // var player = new OBJ(gameEngine);
    // gameEngine.addEntity(player);

    //var fire = new Fire(gameEngine);
    gameEngine.addEntity(new OBJ(0,0,64,64,100,100,100,100,AM.getAsset("./img/sk.png")));


    gameEngine.addEntity(new OBJ(0,0,64,64,100,100,100,100,AM.getAsset("./img/suitMan.png")));
    //gameEngine.addEntity(new Guy(gameEngine, AM.getAsset("./img/guy.jpg")));

    gameEngine.start();
    console.log("All Done!");
});

// var keysDown = {};
// try {
//     if (window.addEventListener) {
//         window.addEventListener("keydown", function (v) {keysDown[v.keyCode] = true;}, false);
//         window.addEventListener("keyup", function (v) {delete keysDown[v.keyCode];}, false);
//     } else if (document.attachEvent) {
//         document.attachEvent("onkeydown", function (v) {keysDown[v.keyCode] = true;});
//         document.attachEvent("onkeyup", function (v) {delete keysDown[v.keyCode];});
//     } else if (window.attachEvent) {
//         window.attachEvent("onkeydown", function (v) {keysDown[v.keyCode] = true;});
//         window.attachEvent("onkeyup", function (v) {delete keysDown[v.keyCode];});
//     } else {
//         document.addEventListener("keydown", function (v) {keysDown[v.keyCode] = true;}, false);
//         document.addEventListener("keyup", function (v) {delete keysDown[v.keyCode];}, false);
//     }
// } catch (e) {
//     alert("Keys don't work!\nError: "+e);
// }

// var update = function () {
//     if (38 in keysDown) { // Player holding up
//         console.log("Key Up Event - Char " );
//     }
//     if (40 in keysDown) { // Player holding down
       
//     }
//     if (37 in keysDown) { // Player holding left
       
//     }
//     if (39 in keysDown) { // Player holding right
        
//     }
// };
// setInterval(update,10);