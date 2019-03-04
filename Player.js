function Player(game,sx,sy,sw,sh,cx,cy,cw,ch,img,playerName, name) {
    this.game= game;
    this.sheetX = sx;
    this.sheetY = sy;
    this.sheetWidth = sw;
    this.sheetHeight = sh;
    this.x = cx;
    this.y = cy;
    this.width = cw;
    this.height = ch;
    this.img =img;
    this.lastDir = 40;
    this.speed = 4;
    this.hp = PLAYER_MAX_HP;
    this.playerName = playerName;
    this.name = name;
    this.itemIndex = 0;
    this.itemList = [];
    this.fireCoolDown = false;
    this.grenadeCoolDown = false;
    this.numOfGrenade = 0;
    this.isBoost = false;
    this.numOfDrink = 0;
    this.numOfAid = 0;

    this.isHealing = false;

    this.m9Level = 0;
    
    this.akmLevel = 0;
    
    this.grozaLevel = 0;
    
    this.awmLevel = 0;

    // this.healAnimation = new Animation(AM.getAsset("./img/heal.png"), this.x, this.y, 185, 185, 0.05, 20, false, 0.5);
    
    document.getElementById(this.playerName + "Icon").src = "./img/" + this.name + "Icon.png";
;
}

Player.prototype.goForward = function(dir) {
    //console.log("go");
    switch(dir) {
      case 38:
        if(this.lastDir == dir) {
            //console.log("yes");
            this.sheetX += 64;

            this.y -=this.speed;

            if(this.sheetX >= 576) {
                this.sheetX =15;
            }
        } else {
            this.sheetX = 15;
            this.sheetY = 10;
            this.lastDir =dir;
        }
        break;
      case 40:
        if(this.lastDir == dir) {
            //console.log("yes");
            this.sheetX += 64;
            this.y +=this.speed;

            if(this.sheetX >= 576) {
                this.sheetX =15;
            }
        } else {
            this.sheetX = 15;
            this.sheetY = 138;
            this.lastDir =dir;
        }
        break;
      case 37:
        if(this.lastDir == dir) {
            //console.log("yes");
            this.sheetX += 64;
            this.x -=this.speed;

            if(this.sheetX >= 576) {
                this.sheetX =15;
            }
        } else {
            this.sheetX = 15;
            this.sheetY = 74;
            this.lastDir =dir;
        }
        break;
      case 39:
        if(this.lastDir == dir) {
            //console.log("yes");
            this.sheetX += 64;
            this.x +=this.speed;

            if(this.sheetX >= 576) {
                this.sheetX =15;
            }
        } else {
            this.sheetX = 15;
            this.sheetY = 202;
            this.lastDir =dir;
        }
        break;
      default:
        // code block
    }
}

Player.prototype.update = function() {
    //console.log(this.itemIndex);
    // console.log("we have grenade" + this.numOfGrenade);
    // console.log("we have aid" + this.numOfAid);
    // console.log("we have boost" + this.numOfDrink);
    if(this.itemList.length !== 0) {        
        document.getElementById(this.playerName + "Item").src = "./img/"+this.itemList[this.itemIndex]+".png";
    } else {
        document.getElementById(this.playerName + "Item").src = "./img/unknown.png";
    }
}

Player.prototype.shoot = function() {

    var that = this;

    if(this.itemList.length != 0) {

        if(this.itemList[this.itemIndex] == "m9"
        ||  this.itemList[this.itemIndex] == "akm"
        || this.itemList[this.itemIndex] == "groza" 
        || this.itemList[this.itemIndex] == "awm")
        {
            //console.log("Can we? " + this.fireCoolDown);
            //if(this.itemList[this.itemIndex].itemName == "m9") this.gunFireFreq = 40;
            if(this.fireCoolDown == false && this.itemList[this.itemIndex] == "m9" && !this.grenadeCoolDown)  {

                if(this.m9Level >= 3) {// max level of m9 effect

                    if(this.lastDir == 37 || this.lastDir ==39) {
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/circleBullet.png"),this.x + 30,this.y + 20,20,20,itemInfo.m9.speed,this.lastDir,0,itemInfo.m9.damage,0, itemInfo.m9.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/circleBullet.png"),this.x + 30,this.y + 50,20,20,itemInfo.m9.speed,this.lastDir,0,itemInfo.m9.damage,0, itemInfo.m9.range));
                    } else if (this.lastDir ==38 || this.lastDir ==40) {
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/circleBullet.png"),this.x + 30,this.y + 30,20,20,itemInfo.m9.speed,this.lastDir,0,itemInfo.m9.damage,0, itemInfo.m9.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/circleBullet.png"),this.x ,this.y + 30,20,20,itemInfo.m9.speed,this.lastDir,0,itemInfo.m9.damage,0, itemInfo.m9.range));

                    }
                    

                } else {// normal level of m9 effect
                    this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/circleBullet.png"),this.x + 30,this.y + 30,20,20,itemInfo.m9.speed,this.lastDir,0,itemInfo.m9.damage,0,itemInfo.m9.range));
                }
                


                playSoundEffect("m9");
                this.fireCoolDown = true;
                //console.log("just change the fire cooldown from here: " + this.fireCoolDown);
                //var that = this;
                setTimeout(function() {reload(that);}, 500);
            } else if (this.fireCoolDown == false && this.itemList[this.itemIndex] == "akm" && !this.grenadeCoolDown){





                if(this.akmLevel >= 3) {// max level of m9 effect

                    if(this.lastDir == 37 || this.lastDir ==39) {
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 30,45,25,itemInfo.akm.speed,this.lastDir,0,itemInfo.akm.damage, -2,itemInfo.akm.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 40,45,25,itemInfo.akm.speed,this.lastDir,0,itemInfo.akm.damage,0,itemInfo.akm.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 50,45,25,itemInfo.akm.speed,this.lastDir,0,itemInfo.akm.damage,2,itemInfo.akm.range));



                    } else if (this.lastDir ==38 || this.lastDir ==40) {
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 20,this.y + 30,25,45,itemInfo.akm.speed,this.lastDir,0,itemInfo.akm.damage,2,itemInfo.akm.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x +10 ,this.y + 30,25,45,itemInfo.akm.speed,this.lastDir,0,itemInfo.akm.damage,0,itemInfo.akm.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x ,this.y + 30,25,45,itemInfo.akm.speed,this.lastDir,0,itemInfo.akm.damage,-2,itemInfo.akm.range));

                    }
                    

                } else {// normal level of m9 effect
                    if(this.lastDir == 37 || this.lastDir == 39 ) {
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 30,45,25,itemInfo.akm.speed,this.lastDir,0,itemInfo.akm.damage,0,itemInfo.akm.range));
                    } else {
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet2.png"),this.x + 30,this.y + 30,25,45,itemInfo.akm.speed,this.lastDir,0,itemInfo.akm.damage,0,itemInfo.akm.range));
                    }
                }










                
                
                playSoundEffect("akm");
                this.fireCoolDown = true;
                //console.log("just change the fire cooldown from here: " + this.fireCoolDown);
                //var that = this;
                setTimeout(function() {reload(that);}, 150);
            } else if (this.fireCoolDown == false && this.itemList[this.itemIndex] == "groza" && !this.grenadeCoolDown){


                if(this.grozaLevel >= 3) {// max level of m9 effect

                    if(this.lastDir == 37 || this.lastDir ==39) {
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 30,30,15,itemInfo.groza.speed,this.lastDir,0,itemInfo.groza.damage, -4,itemInfo.groza.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 30,30,15,itemInfo.groza.speed,this.lastDir,0,itemInfo.groza.damage, -2,itemInfo.groza.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 30,30,15,itemInfo.groza.speed,this.lastDir,0,itemInfo.groza.damage,0,itemInfo.groza.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 30,30,15,itemInfo.groza.speed,this.lastDir,0,itemInfo.groza.damage,2,itemInfo.groza.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 30,30,15,itemInfo.groza.speed,this.lastDir,0,itemInfo.groza.damage, 4,itemInfo.groza.range));
                    } else if (this.lastDir ==38 || this.lastDir ==40) {
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 30,15,30,itemInfo.groza.speed,this.lastDir,0,itemInfo.groza.damage, -4,itemInfo.groza.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 30,15,30,itemInfo.groza.speed,this.lastDir,0,itemInfo.groza.damage, -2,itemInfo.groza.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 30,15,30,itemInfo.groza.speed,this.lastDir,0,itemInfo.groza.damage,0,itemInfo.groza.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 30,15,30,itemInfo.groza.speed,this.lastDir,0,itemInfo.groza.damage,2,itemInfo.groza.range));
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 30,15,30,itemInfo.groza.speed,this.lastDir,0,itemInfo.groza.damage, 4,itemInfo.groza.range));

                    }
                    

                } else {// normal level of m9 effect
                    if(this.lastDir == 37 || this.lastDir == 39 ) {
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet.png"),this.x + 30,this.y + 30,30,15,itemInfo.groza.speed,this.lastDir,0,itemInfo.groza.damage,0,itemInfo.groza.range));
                    } else {
                        this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/longbullet2.png"),this.x + 30,this.y + 30,15,30,itemInfo.groza.speed,this.lastDir,0,itemInfo.groza.damage,0,itemInfo.groza.range));
                    }
                }












                
                
                playSoundEffect("groza");
                this.fireCoolDown = true;
                //console.log("just change the fire cooldown from here: " + this.fireCoolDown);
                //var that = this;
                setTimeout(function() {reload(that);}, 70);
            } else if (this.fireCoolDown == false && this.itemList[this.itemIndex] == "awm" && !this.grenadeCoolDown){
                this.game.bulletList.push(new Bullet(this.game,AM.getAsset("./img/circleBullet.png"),this.x + 30,this.y + 30,40,40,itemInfo.awm.speed, this.lastDir, 0, itemInfo.awm.damage,0));
                playSoundEffect("awm");
                this.fireCoolDown = true;
                //console.log("just fire awm ");
                //var that = this;
                setTimeout(function() {reload(that);}, 2000);
                
            }
        } else if (this.itemList[this.itemIndex] == "grenade" && !this.grenadeCoolDown){
            this.game.nodmganimationList.push(new Grenade(this.game,AM.getAsset("./img/grenademotion.png"),this.x,this.y, this.lastDir ));
            //console.log("before splice index is "+ this.itemIndex + ", list length is " + this.itemList.length);
            this.grenadeCoolDown = true;
            this.numOfGrenade--;
            if(this.numOfGrenade ==0){
                this.itemList.splice(this.itemIndex,1);
                // if(this.itemIndex != 0)this.itemIndex--;
            } 
            
            //console.log("after splice index is "+ this.itemIndex + ", list length is " + this.itemList.length);
            
            if (this.itemIndex!=0 && this.itemIndex >= this.itemList.length) this.itemIndex--;
            //console.log("before update index is "+ this.itemIndex + ", list length is " + this.itemList.length);
            setTimeout(function() {reloadGrenade(that);}, 300);
        } else if(this.itemList[this.itemIndex] == "drink" && !this.grenadeCoolDown) {
            if(this.speed < 6){
                this.speed += 0.4;
                isBoost = true;
                this.numOfDrink--;
            } else {
                this.numOfDrink--;
            }
            if(this.numOfDrink == 0){
                this.itemList.splice(this.itemIndex,1);
                //if(this.itemIndex != 0)this.itemIndex--;
            }
            this.grenadeCoolDown = true;
            if (this.itemIndex!=0 && this.itemIndex >= this.itemList.length) this.itemIndex--;
            setTimeout(function() {reloadGrenade(that);}, 300);
        } else if(this.itemList[this.itemIndex] == "firstaid"&& !this.grenadeCoolDown) {
            this.isHealing = true;

            this.hp = PLAYER_MAX_HP;
            this.damaged(0);
            // if(this.speed < 6){
            //     this.speed += 0.4;
            //     isBoost = true;
            //     this.numOfDrink--;
            // } else {
            //     this.numOfDrink--;
            // }
            // if(this.numOfDrink == 0)this.itemList.splice(this.itemIndex,1);
            this.grenadeCoolDown = true;
            this.numOfAid--;
            if(this.numOfAid == 0){
                this.itemList.splice(this.itemIndex,1);
                //if(this.itemIndex != 0)this.itemIndex--;
            }

            //this.itemList.splice(this.itemIndex,1);
            if (this.itemIndex!=0 && this.itemIndex >= this.itemList.length) this.itemIndex--;
            setTimeout(function() {reloadGrenade(that);}, 300);
        }
            
    } else {
        console.log("you have no item")
    }
    


}
function reload(player) {
    player.fireCoolDown = false;
}

function reloadGrenade(player) {
    player.grenadeCoolDown = false;
}

Player.prototype.draw = function (ctx) {
    //console.log("m9 level:" + this.m9Level + ", akm level: " + this.akmLevel 
    //+ "groza level:" + this.grozaLevel + ", awm level: " + this.awmLevel);
    ctx.drawImage(this.img,
        this.sheetX, this.sheetY,  // source from sheet
        this.sheetWidth, this.sheetHeight, // width and height of source
        this.x, this.y, // destination coordinates
        this.width, this.height); // destination width and height

    if(this.isHealing == true) {

        this.game.nodmganimationList.push(new Explosion(this.game
            ,AM.getAsset("./img/heal.png"),this.x-24,this.y, this.lastDir
            , 192, 185, 5, 0.05, 20, false, 0.5, 0));
            // this.healAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
        this.isHealing =false;
            
    }
}

Player.prototype.damaged = function(hp) {
    // var w = document.getElementById("bar2").style.width;
    // var value = parseInt(w,10);
    // //  //w -=10;
    // // var nw = (w)+ "px";
    // value -=10;
    //console.log(this.hp );
    this.hp -=hp;
    var newW = this.hp + "px";


    //console.log(newW );
    document.getElementById(this.playerName + "Bar").style.width = newW;

    if(this.hp <= 0) {
        // window.alert("WINNER WINNER CHINKEN DINNER!");
        // this.game.ctx=null;
        // clearInterval(this.game.readKey);

        stopMusic();
        playMusic("fail");

        isGameOver = true;
        
        //var canvas = document.getElementById("myCanvas");
        //var ctx = canvas.getContext("2d");
        msg = "Loser! Was it too hard? Press 'L' to try again";
        isPause = true;
        this.game.bulletList = [];
        this.game.BombList = [];
        this.game.AIList = [];
        
        //currentlevel = 1;
        //this.hp = 210;
        //currentstage = "normal";
        //startNextLevel(this.game);
    }
}