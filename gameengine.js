window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function GameEngine() {
    this.wall = [];
    this.entities = [];
    this.bulletList = [];
    this.enemybulletList = [];
    this.playerList = [];
    this.AIList = [];
    this.supplyList = [];
    this.bushList = [];
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.keyDown = [];
    this.readKey = null;
    this.BombList = [];
    this.nodmganimationList = [];
    this.dmganimationList = [];
    this.circleFireList = [];
    // 4.1
    this.exactAngle=0;
    this.monsterFire=[];
    
}

GameEngine.prototype.cleanForNextLevel = function () {
    this.wall = [];
    this.entities = [];
    this.bulletList = [];
    this.AIList = [];
    this.supplyList = [];
    this.bushList = [];
    this.BombList = [];
    this.nodmganimationList = [];
    this.dmganimationList = [];
    this.circleFireList = [];
    this.monsterFire=[];
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();
    this.startInput();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');

    var getXandY = function (e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        if (x < 1024) {
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
        }

        return { x: x, y: y };
    }

    var that = this;

    // event listeners are added here

    // this.ctx.canvas.addEventListener("click", function (e) {
    //     that.click = getXandY(e);
    //     console.log(e);
    //     console.log("Left Click Event - X,Y " + e.clientX + ", " + e.clientY);
    // }, false);

    // this.ctx.canvas.addEventListener("contextmenu", function (e) {
    //     that.click = getXandY(e);
    //     console.log(e);
    //     console.log("Right Click Event - X,Y " + e.clientX + ", " + e.clientY);
    //     e.preventDefault();
    // }, false);

    // this.ctx.canvas.addEventListener("mousemove", function (e) {
    //     //console.log(e);
    //     that.mouse = getXandY(e);
    // }, false);

    // this.ctx.canvas.addEventListener("mousewheel", function (e) {
    //     console.log(e);
    //     that.wheel = e;
    //     console.log("Click Event - X,Y " + e.clientX + ", " + e.clientY + " Delta " + e.deltaY);
    // }, false);

    this.ctx.canvas.addEventListener("keydown", function (e) {
        if(!that.keyDown.includes(e.keyCode))that.keyDown.push(e.keyCode);
        //if (e.code === "KeyW")         that.entities[that.entities.length-1].goForward(38); 
        //console.log(that.keyDown);
        //console.log("Key Down Event - Char " + e.code + " Code " + e.keyCode);
    }, false);

    this.ctx.canvas.addEventListener("keypress", function (e) {
        if(e.code === "KeyE" && that.playerList[0].itemList.length!=0) {
            if(that.playerList[0].itemIndex == that.playerList[0].itemList.length-1){
                that.playerList[0].itemIndex = 0;
                
            }  else {
                that.playerList[0].itemIndex++;
            }
            //that.playerList[0].fireCoolDown = false;
        }
        // if(e.code === "Key|" ) {
        //     if(that.playerList[1].itemIndex == that.playerList[1].itemList.length-1) that.playerList[1].itemIndex = 0;
        //         else that.playerList[1].itemIndex++;
        // }
        // if(e.code === "KeyU" ) {
        //     if(that.playerList[2].itemIndex == that.playerList[2].itemList.length-1) that.playerList[2].itemIndex = 0;
        //         else that.playerList[2].itemIndex++;
        // }

        if(e.code === "KeyP" ) {
            if(isPause == true) {
                isPause = false;
                msg = "";
            } else {
                isPause = true;
                msg = "PAUSED";
            }
        }

        if(e.code === "KeyM" ) {
            if(isMute == true) {
                
                isMute = false;
                playMusic(currentstage);
            } else {
                stopMusic();
                isMute = true;
            }
        }

        if(e.code === "KeyL" ) {
            
            // var canvas = document.getElementById("gameWorld");
            // var ctx = canvas.getContext("2d");
            // that = new GameEngine();
            // that.init(ctx);
            // that.cleanForNextLevel();
            // that.addEntity(new NotMovingElement(that, AM.getAsset(bgname),0,0,1400,750,1));
            // for(var i =0; i<1; i++) {
            //     that.AIList.push(new AI
            //         (that,15,138,34,52,100,0,51,78,AM.getAsset("./img/sk.png"),1, 50));
            // }
            // that.playerList.push(new Player
            //     (that,15,138,34,52,0,650,51,78,AM.getAsset("./img/saitama.png"), "player1", "saitama"));
            // currentstage = "normal"
            // that.start();
            // isDead = true;
            
            // that = null;
            // console.log("set null")
            // start();
            msg = "";
            
            //music.level1.play();
        //currentstage == "normal"
            that.entities = [];
            that.bulletList = [];
            that.bushList = [];
            that.supplyList = [];
            //that.AIList = [];
            currentstage = "normal";
            if(isGameOver){
                that.playerList[0].hp = 210;
                that.playerList[0].damaged(0);
                currentlevel =1;
                isGameOver =false;
            }else {
                currentlevel++;   
            }
            isPause = false;
            startNextLevel(that);
        }
    
    
        
    //     if (e.code === "KeyA")         that.entities[that.entities.length-1].goForward(37); 
    //     if (e.code === "KeyD")         that.entities[that.entities.length-1].goForward(39); 
    //     if (String.fromCharCode(e.which) === ' ') that.entities[1].jumping = true;
    //     //that.chars[e.code] = true;
    //     //console.log(e);
    //     //console.log("Key Pressed Event - Char " + e.charCode + " Code " + e.keyCode);
    // console.log(e);
    // console.log("Key press Event - Char " + e.code + " Code " + e.keyCode);
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (e) {
        that.keyDown.splice(that.keyDown.indexOf(e.keyCode),1);
        //console.log(e);
        //console.log("Key Up Event - Char " + e.code + " Code " + e.keyCode);
    }, false);

    
    that.readKey  = function () {
    //console.log("XXXXXXXXXXXXXX");
        
        for(var i=0; i<that.keyDown.length; i++) {
            //console.log(that.keyDown[i]);
 
            //player 1 controller
            if (that.keyDown[i] === 83 && that.canMove(0, 40,"player"))
                that.playerList[0].goForward(40); 
            else if (that.keyDown[i] === 87 && that.canMove(0, 38, "player"))        that.playerList[0].goForward(38);
            else if (that.keyDown[i] === 65&& that.canMove(0, 37, "player"))         that.playerList[0].goForward(37); 
            else if (that.keyDown[i] === 68 && that.canMove(0, 39, "player"))         that.playerList[0].goForward(39);


            //player 2 controller
            // else if (that.keyDown[i] === 40&& that.canMove(1, 40))         that.playerList[1].goForward(40); 
            // else if (that.keyDown[i] === 38&& that.canMove(1, 38))         that.playerList[1].goForward(38);
            // else if (that.keyDown[i] === 37&& that.canMove(1, 37))         that.playerList[1].goForward(37); 
            // else if (that.keyDown[i] === 39&& that.canMove(1, 39))         that.playerList[1].goForward(39);


            //player3 controller
            // else if (that.keyDown[i] === 71&& that.canMove(2, 40))         that.playerList[2].goForward(40); 
            // else if (that.keyDown[i] === 84&& that.canMove(2, 38))         that.playerList[2].goForward(38);
            // else if (that.keyDown[i] === 70&& that.canMove(2, 37))         that.playerList[2].goForward(37); 
            // else if (that.keyDown[i] === 72&& that.canMove(2, 39))         that.playerList[2].goForward(39);

            // else if (that.keyDown[i] === 69) {
            //     console.log("press");
            //     if(that.playerList[0].itemIndex == that.playerList[0].itemList.length-1) that.playerList[0].itemIndex = 0;
            //     else that.playerList[0].itemIndex++;
            // } 



            else if (that.keyDown[i] === 32){
                that.playerList[0].shoot();
           
                

            }    
            // else if (that.keyDown[i] === 13){
            //     var currentX = that.playerList[1].x;
            //     var currentY = that.playerList[1].y;
            //     var dir = that.playerList[1].lastDir;
            //     that.bulletList.push(new Bullet(that,AM.getAsset("./img/circleBullet.png"),currentX + 30,currentY + 30,20,20,20,dir,1));

            //     var audio = new Audio('./sound/handGun.mp3');
            //     audio.play();
            // }    

            // else if (that.keyDown[i] === 74){
            //     var currentX = that.playerList[2].x;
            //     var currentY = that.playerList[2].y;
            //     var dir = that.playerList[2].lastDir;
            //     that.bulletList.push(new Bullet(that,AM.getAsset("./img/circleBullet.png"),currentX + 30,currentY + 30,30,30,50,dir,2));

            //     var audio = new Audio('./sound/handGun.mp3');
            //     audio.play();
            // }    
              

        }
    };
    //that.readKey = setInterval(update,50);
}

GameEngine.prototype.canMove = function(index,dir, objName) {
    var player;
    if(objName == "player") player = this.playerList[index];
    else player = this.AIList[index];
    //console.log(index + " " + dir + " " + objName);
    if(typeof player.speed === "undefined") return;
    var speed = player.speed;

    var moveX, moveY;
    if(dir === 37 ) {
        moveX = -speed; moveY = 0;
    } else if(dir === 38) {
        moveX = 0; moveY = -speed;
    } else if(dir === 39) {
        moveX = speed; moveY = 0;
    } else {
        moveX = 0; moveY = speed;
    }

    if(objName == "player") {
        for (var i = this.supplyList.length -1; i >=0 ; i--) {
            var obj = this.supplyList[i];

            if (player.x + moveX < obj.x + obj.myimgwidth &&
                player.x + moveX + player.width > obj.x &&
                player.y + moveY< obj.y + (obj.myimgheight) &&
                player.y + moveY + player.height > obj.y) {
                    //console.log(this.supplyList[i].itemName)
                    if(obj.itemName == "grenade") {
                        player.numOfGrenade++;
                    }
                    else if(obj.itemName == "drink"){
                        player.numOfDrink++;
                    } else if (obj.itemName == "firstaid"){
                        player.numOfAid++;   
                    } else if (obj.itemName == "m9"){
                        player.m9Level++;   
                    } else if (obj.itemName == "akm"){
                        player.akmLevel++;   
                    } else if (obj.itemName == "groza"){
                        player.grozaLevel++;   
                    } else if (obj.itemName == "awm"){
                        player.awmLevel++;   
                    }


                    if(!player.itemList.includes(obj.itemName)) {
                        player.itemList.push(obj.itemName);
                    }
                    
                    this.supplyList.splice(i, 1);
                    continue;
            }
        }
    }


    for (var i = this.wall.length -1; i >=0 ; i--) {
        var obj = this.wall[i];

        if (player.x + moveX < obj.x + obj.myimgwidth &&
            player.x + moveX + player.width > obj.x &&
            player.y + moveY< obj.y + (obj.myimgheight) &&
            player.y + moveY + player.height > obj.y) {
                return false;
        }
    }



    for (var i = 1; i < this.entities.length; i++) {
        var obj = this.entities[i];

        if (player.x + moveX < obj.x + obj.myimgwidth/2 &&
            player.x + moveX + player.width > obj.x + 10 &&
            player.y + moveY< obj.y + (obj.myimgheight/3) &&
            player.y + moveY + player.height > obj.y + (obj.myimgheight/4)) {
                return false;
         }
    }

    return true;
}


GameEngine.prototype.canMoveAI = function(index,dir) {
    var player = this.AIList[index];
    var speed = player.speed;

    var moveX, moveY;
    if(dir === 37 ) {
        moveX = -speed; moveY = 0;
    } else if(dir === 38) {
        moveX = 0; moveY = -speed;
    } else if(dir === 39) {
        moveX = speed; moveY = 0;
    } else {
        moveX = 0; moveY = speed;
    }

    for (var i = 1; i < this.entities.length; i++) {
        var obj = this.entities[i];

        if (player.x + moveX < obj.x + obj.myimgwidth/2 &&
            player.x + moveX + player.width > obj.x + 10 &&
            player.y + moveY< obj.y + (obj.myimgheight/3) &&
            player.y + moveY + player.height > obj.y + 10) {
                return false;
         }
    }

    return true;
}



GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();

    for (var i = 0; i < this.wall.length; i++) {
        var entity = this.wall[i];
        entity.draw(this.ctx);
    }


    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }

    for (var i = 0; i < this.playerList.length; i++) {
        this.playerList[i].draw(this.ctx);
    }

    for (var i = 0; i < this.bulletList.length; i++) {
        this.bulletList[i].draw(this.ctx);
    }

    for (var i = 0; i < this.enemybulletList.length; i++) {
        this.enemybulletList[i].draw(this.ctx);
    }

    for (var i = 0; i < this.supplyList.length; i++) {
        this.supplyList[i].draw(this.ctx);
    }
    for(var i = 0; i < this.BombList.length; i++) {
        this.BombList[i].draw(this.ctx);
    }

    for (var i = 0; i < this.AIList.length; i++) {
        this.AIList[i].draw(this.ctx);
    }


    for (var i = 0; i < this.bushList.length; i++) {
        this.bushList[i].draw(this.ctx);
    }



    for(var i = 0; i < this.nodmganimationList.length; i++) {
        this.nodmganimationList[i].draw(this.ctx);
    }

    for(var i = 0; i < this.dmganimationList.length; i++) {
        this.dmganimationList[i].draw(this.ctx);
    }
    for(var i=0; i<this.circleFireList.length; i++){
        this.circleFireList[i].draw(this.ctx);
       
    }
    if(msg != "") {
        this.ctx.font = "36px Arial";
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillText(msg, 400, 350);
    }



    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    if(!isPause){
    if(this.AIList.length == 0) {
        if(currentstage == "normal") {
            //document.getElementById("china").src="";
            //var audio = new Audio('./sound/bossfight.mp3');
            stopMusic();
            //stop the music
            playMusic("boss");
            /////
            // audio.volume = 0.3;
            // audio.play();
            if(currentlevel==1){
                this.AIList.push(new AI
                    (this,15,138,34,52,250,350,77,117,AM.getAsset("./img/skboss.png"),1.1,enemyStat.bossLevel1.hp,3));
            }
            if(currentlevel==2){
                this.AIList.push(new AI
                    (this,15,138,34,52,250,350,77,117,AM.getAsset("./img/blackskull.png"),2.1,enemyStat.bossLevel2.hp,2));
               
            }
            if(currentlevel==3){
                this.AIList.push(new AI
                    (this,15,138,34,52,10,350,77,117,AM.getAsset("./img/goldBoss.png"),3.1,enemyStat.bossLevel3.hp,4));
                this.AIList.push(new AI
                    (this,15,138,34,52,1300,350,77,117,AM.getAsset("./img/goldBoss.png"),3.1,enemyStat.bossLevel3.hp,4));
            } 
            if(currentlevel==4){
                this.AIList.push(new AI
                    (this,0,0,80,80,-200,-200,160,160,AM.getAsset("./img/boss.png"),4.1,enemyStat.bossLevel4.hp,2));
                    this.AIList[0].skipTimer= Math.floor(this.timer.gameTime)+Math.floor(5.0);
            }
            if(currentlevel==5){
                // this.AIList.push(new AI
                //     (this,15,138,34,52,1300,350,77,117,AM.getAsset("./img/blackskull.png"),4.1,10,4));
                    this.AIList.push(new AI
                        (this,15,138,34,52,250,350,77,117,AM.getAsset("./img/skboss.png"),1.1,enemyStat.bossLevel5.hp,4));
            }
            //         (this,15,138,34,52,250,350,77,117,AM.getAsset("./img/skboss.png"),1.1,200));
            currentstage = "boss";
            // this.AIList.push(new AI
            //     (this,15,138,34,52,300,300,77,117,AM.getAsset("./img/skboss.png"),1.1,200));
            // currentstage = "boss";
        } else {
            
            stopMusic();
            playMusic("win");

            
            //var canvas = document.getElementById("myCanvas");
            //var ctx = canvas.getContext("2d");
            if(currentlevel == 5) {
                msg = "Congratulations! You save the world! Press 'L' to play again";
                isGameOver = true;
            } else {
                msg = "Congratulations! Press 'L'\r to next level";
            }
            
            isPause = true;
            this.circleFireList=[];
            this.bulletList = [];
            this.BombList = [];
            
            
        }
        

    }

    this.readKey();

    var entitiesCount = this.entities.length;
    var playerCount = this.playerList.length;
    var bulletCount = this.bulletList.length;
    var supplyCount = this.supplyList.length;

    for (var i = 0; i < this.wall.length; i++) {
        var entity = this.wall[i];

        entity.update();
    }

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        entity.update();
    }

    for (var i = 0; i < playerCount; i++) {
        var entity = this.playerList[i];
        entity.update();
    }

    for (var i = 0; i < supplyCount; i++) {
        var entity = this.supplyList[i];
        entity.update();
    }


    for (var i = bulletCount-1; i >=0; i--) {
        var entity = this.bulletList[i];

        // if(entity.y >  800 || entity.y <  -50|| entity.x >  1450 || entity.x <  -50) {
        //     this.bulletList.splice(i, 1);
        //     continue;
        // }

        if(entity.travelDistance > entity.maxDistance) {
            this.bulletList.splice(i, 1);
            continue;
        }

        //console.log(entity.dir);
        if (this.isHit(i, entity.dir,"human")) {
            this.bulletList.splice(i, 1);
            continue;
        }

        entity.update();
    }

    for (var i = this.enemybulletList.length-1; i >=0; i--) {
        var entity = this.enemybulletList[i];

        // if(entity.y >  800 || entity.y <  -50|| entity.x >  1450 || entity.x <  -50) {
        //     this.bulletList.splice(i, 1);
        //     continue;
        // }

        if(entity.travelDistance > 1000) {
            this.enemybulletList.splice(i, 1);
            continue;
        }

        //console.log(entity.dir);
        if (this.isHit(i, entity.dir, "aimforhuman")) {
            this.enemybulletList.splice(i, 1);
            continue;
        }

        entity.update();
    }

    //console.log("Before the update of AI");
    for (var i = 0; i < this.AIList.length; i++) {
        //console.log("trying update " + i);
        var entity = this.AIList[i];
        if(entity.level==4.1){
        entity.randomGenerate(Math.floor(this.timer.gameTime));
        }
        entity.update(i);
    }

    for (var i = 0; i < this.bushList.length; i++) {
        
        var entity = this.bushList[i];
        entity.update();
    }
//
// if(this.AIList.length>0){
   
//     }
//
//console.log(this.BombList.length+"bomb lenght");
    for(var i = 0; i < this.BombList.length; i++) {
        // console.log(this.AIList.length);
        if(this.AIList.length>0){
        if((this.AIList[0].level == 1.1 && this.AIList.length==1) ){
        
            
            for(var i=0; i<this.BombList.length; i++){
                var angle = this.AIList[0].angle[i];
                // console.log(angle+"angle is");
                var entity = this.BombList[i];
                this.isbomb(i, "aimforplayer");
              
                entity.update();
            }
            }
            else{
        var entity = this.BombList[i];
        this.isbomb(i, "aimforplayer");
        entity.update();
    }
        if(entity.time==50){
            this.BombList.shift();
        }
    }
    }
    for(var i = 0; i < this.dmganimationList.length; i++) {
        var entity = this.dmganimationList[i];
        this.isbomb(i, "aimforenemy");
        entity.update();
        if(entity.time==50){
            this.dmganimationList.shift();
        }
    }

    

    for(var i = 0; i < this.nodmganimationList.length; i++) {
        var entity = this.nodmganimationList[i];
        //this.isHit(i, 0, "enemy");
        entity.update();
        if(entity.time==50){
            this.nodmganimationList.shift();
        }
    }
}
}

GameEngine.prototype.isHit = function(index,dir, type) {
    var bullet
    if(type == "human") {
        bullet = this.bulletList[index];
    } else if(type == "aimforhuman"){
        bullet = this.enemybulletList[index];
    }
    var speed = bullet.myspeed;

    var moveX, moveY;
    if(dir === 37 ) {
        moveX = -speed; moveY = 0;
    } else if(dir === 38) {
        moveX = 0; moveY = -speed;
    } else if(dir === 39) {
        moveX = speed; moveY = 0;
    } else if(dir === 40){
        moveX = 0; moveY = speed;
    } else {
        moveX = 0; moveY = 0;
    }

    if(type == "human" || type == "aimforhuman") {
        for (var i = 1; i < this.entities.length; i++) {
            var obj = this.entities[i];

            if (bullet.x + moveX < obj.x + obj.myimgwidth - 10 &&
                bullet.x + moveX + bullet.width > obj.x + 10&&
                bullet.y + moveY< obj.y + (obj.myimgheight) - 20&&
                bullet.y + moveY + bullet.height > obj.y+ 10) {
                    return true;
            }
        }
    }

    if(type == "aimforhuman") {
        // console.log("enemy");
        for (var i = 0; i < this.playerList.length; i++) {
            var obj = this.playerList[i];
            // console.log("1          " + (bullet.x + moveX) +", "+ (obj.x + obj.width));
            // console.log("2          " + (bullet.x + moveX+ bullet.width)+ ", "+obj.x);
            // console.log("3          " + (bullet.y + moveY) +", "+ (obj.y + (obj.height)));
            // console.log("4         " + (bullet.y + moveY+ bullet.height)+", "+ obj.y);
            if (bullet.x + moveX < obj.x + obj.width &&
                bullet.x + moveX + bullet.width > obj.x &&
                bullet.y + moveY< obj.y + (obj.height) &&
                bullet.y + moveY + bullet.height > obj.y) {
                    // console.log("it is from the sk");
                    obj.damaged(10);
                    return true;
            }
        }
    }

    if(type == "human") {
        //console.log("onlyhur enemy")
        for (var i = this.AIList.length-1; i >=0; i--) {
            var obj = this.AIList[i];
            var dmg = bullet.dmg;

            if (bullet.x + moveX < obj.x + obj.width &&
                bullet.x + moveX + bullet.width > obj.x &&
                bullet.y + moveY< obj.y + (obj.height) &&
                bullet.y + moveY + bullet.height > obj.y) {
                    //console.log("hurted")
                    if(obj.hp - dmg <=0){
                        this.AIList.splice(i, 1);
                    } 
                    else{
                        
                        obj.damaged(dmg);
                    } 
                    return true;
            }
        }
    }
    return false;
}

GameEngine.prototype.isbomb = function(index, type) {
    var bullet
    if(type == "aimforenemy") {
        bullet = this.dmganimationList[index];
    } else {
        //console.log("is not human:" + type);
        bullet = this.BombList[index];
        if(Math.floor(this.BombList[index].scale) === 1){
       //console.log(this.BombList[index].scale);
    }
    }
    if(type == "aimforplayer") {
        // console.log("enemy");
        for (var i = 0; i < this.playerList.length; i++) {
            var obj = this.playerList[i];
            // to handle the circle bullets
            if(Math.floor(this.BombList[index].scale) === 1){
                if (bullet.x < obj.x + obj.width &&
                    bullet.x + bullet.width*(this.BombList[index].scale) > obj.x &&
                    bullet.y< obj.y + (obj.height) &&
                    bullet.y  + bullet.height*(this.BombList[index].scale) > obj.y) {
                        // console.log("it is from the sk");
                        obj.damaged(1);
                        return true;
                }
            }
            if (bullet.x < obj.x + obj.width &&
                bullet.x + bullet.width > obj.x &&
                bullet.y< obj.y + (obj.height) &&
                bullet.y  + bullet.height > obj.y) {
                    // console.log("it is from the sk");
                    obj.damaged(1);
                    return true;
            }
        }
    }

    if(type == "aimforenemy") {
        //console.log("onlyhur enemy")
        for (var i = this.AIList.length-1; i >=0; i--) {
            var obj = this.AIList[i];
            var dmg = 2;
            // if(type == "only hurt enemy" ) {
            //     console.log("bomb x is           " + bullet.x );
            //     dmg = 100;
            // }

            // console.log("bomb x is           " + bullet.x );
            // console.log("bomb y is           "  + bullet.y);
            // console.log("3          " + bullet.y + moveY);
            // console.log("4         " + bullet.y + moveY);


            // console.log("1          " + (bullet.x + moveX) +", "+ (obj.x + obj.width));
            // console.log("2          " + (bullet.x + moveX+ bullet.width)+ ", "+obj.x);
            // console.log("3          " + (bullet.y + moveY) +", "+ (obj.y + (obj.height)));
            // console.log("4         " + (bullet.y + moveY+ bullet.height)+", "+ obj.y);

            if (bullet.x < obj.x + obj.width &&
                bullet.x + bullet.width > obj.x &&
                bullet.y < obj.y + (obj.height) &&
                bullet.y + bullet.height > obj.y) {
                    //console.log("hurted")
                    if(obj.hp - dmg <=0){
                        this.AIList.splice(i, 1);
                    } 
                    else{
                        
                        obj.damaged(dmg);
                    } 
                    return true;
            }
        }
    }
    return false;
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
}

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}

 window.onscroll = function () { window.scrollTo(0, 0); };