function AI(game,sx,sy,sw,sh,cx,cy,cw,ch,img,level,hp,speed) {
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
    this.speed = speed;
    this.hp = hp;
    this.Maxhp = hp;
    this.level = level;
    this.angle = [0,60,120,180,240,300];
    //this.index = index;
    this.isturn = 0;
    this.turningCoolDown = [100,150,200,300,50].random();
    this.bossBulletFire = true;
    //this.animation = new Animation(AM.getAsset("./img/greendmg.png"), this.x, this.y, 100, 100, 0.9, 11, true, false);
    //for disappear
    
    this.bossAnimation = true;
    this.fireCancel = true;
    // for appearing boss in random position
    this.random = 9;
    this.randomizeBossPosition = false;
    this.bossHealthDisplay = true;

    //
    this.releaseSmartAI = true;
}

AI.prototype.goForward = function(dir) {
    //console.log("go");
    switch(dir) {
      case 38:
      //looking up
      if(this.lastDir == dir && this.level== 4.1){
        //console.log("looking 38")
        this.sheetY=240;
        
        if(this.sheetX>320) this.sheetX=0;
        this.sheetX += 80;
        this.lastDir = dir;
      }else if(this.lastDir == dir) {
            
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
      //looking down
      if(this.lastDir == dir && this.level== 4.1){
        // console.log("looking 40")
        this.sheetY=0;
        
        if(this.sheetX>320) this.sheetX=0;
        this.sheetX += 80;
        this.lastDir = dir;

    } else if(this.lastDir == dir) {
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
       
                //console.log(temp);
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


AI.prototype.level11=function(){
    let timeClock = Math.floor(this.game.timer.gameTime);

    if((timeClock%5) == 0 ){
            
        if(this.bossBulletFire==true  ){

            for(var i=0; i<6; i++){
                this.game.BombList.push(new FireCircle(this
                    .game, AM.getAsset("./img/purpledmg.png"),this.x,this.y
                        , 100, 100, 5, 0.15, 11, true, 0.5, 7,this.angle[i]));
            }   
                    this.bossBulletFire = false;
                }

     

    }
    if((timeClock%5) == 1 ){
     
        this.bossBulletFire = true;
    }
}

AI.prototype.level33=function(){
    // console.log("+++THELEVELIS++++ "+ this.level);
                var dirs = [37,3738,38,3839,39,3940,40,4037];
                for(var i = 0; i < dirs.length; i++) {
                    this.game.BombList.push(new Explosion(this.game
                        ,AM.getAsset("./img/greendmg.png"),this.x,this.y, dirs[i]
                        , 100, 100, 5, 0.15, 11, true, 2, 7));
                }
                

}

AI.prototype.level44 = function(){
    
}

AI.prototype.update = function(index) {
    //console.log(this.hp + " health");
   // console.log(currentlevel+" current level is"+ this.level);
    let timeClock = Math.floor(this.game.timer.gameTime);
    if(currentlevel ==5 && this.level==1.1 && (this.hp<140 && this.hp>70) ){
        this.level = 2.1;
        this.img=AM.getAsset("./img/blackskull.png");
        // console.log("success");
    }else if(currentlevel ==5 && this.level==2.1 && this.hp<=70  ){
        // console.log("not success");
        this.img=AM.getAsset("./img/goldBoss.png");
        this.level = 3.1;
    }else{
        // this.img=AM.getAsset("./img/blackskull.png");
    }
    if(this.level==1.1 ){
        
        this.level11();
        // this.level33();
    }
    if (this.level == 5.1) {
        // it(this.hp)
        // this.level11();
        // console.log("level 5.5");
        // this.level33();
    
    
} 
    //
    
    if(this.level ==1 || this.level == 1.1 ||this.level == 1.2 || this.level == 3.1 || this.level == 2.1 || this.level == 5.1)  {
        var posibleDir = [];

        if(this.game.canMove(index ,37, "AI")) posibleDir.push(37);
        if(this.game.canMove(index ,38, "AI")) posibleDir.push(38);
        if(this.game.canMove(index ,39, "AI")) posibleDir.push(39);
        if(this.game.canMove(index ,40, "AI")) posibleDir.push(40);
    
        if(this.isturn == this.turningCoolDown) {
            this.goForward(posibleDir.random());
            this.isturn = 0;
            if(this.level == 1) {
                this.game.BombList.push(new Explosion(this.game
                    ,AM.getAsset("./img/greendmg.png"),this.x,this.y, this.lastDir
                    , 100, 100, 5, 0.15, 11, true, 0.9, 5));
            } else if (this.level == 1.2) {
                console.log("black man just shoot");
                this.game.enemybulletList.push(new Bullet(this.game,AM.getAsset("./img/circleBullet.png"),this.x + 30,this.y + 30,20,20,5,this.lastDir,0,itemInfo.m9.damage, 0 , 1000));
            } else if (this.level == 3.1) {
                this.level33();
            } else if (this.level == 5.1) {
                
                //console.log("level 5.5");
                this.level33();
                this.level11();
            
            
        } 
            
            return;
        }

        this.isturn++;
        if(this.game.canMove(index ,this.lastDir, "AI")) {
            this.goForward(this.lastDir);
        } else {
            this.goForward(posibleDir.random());
        }
    }
    // this is for invisible 
    if(this.level==4.1){
        // this.goForward(this.lastDir);
        if(this.random==1){
            this.x = 550;
            this.y =0;
            
            // this.animation = new Animation(this.spritesheet, 80,80,4, 0.10, 4, true, 2.0);
            // this.animation.loop=true;
        }else if(this.random==2){
            this.x = 0;
            this.y =0;
            // this.animation.loop=true;
            // this.animation = new Animation(this.spritesheet, 80,80,4, 0.10, 4, true, 2.0);
        }else if(this.random==3){
            this.x = 1200;
            this.y =0;
            // this.animation.loop=true;
            // this.animation = new Animation(this.spritesheet, 80,80,4, 0.10, 4, true, 2.0);
        }else if(this.random==4){
            this.x = 0;
            this.y =600;
            // this.animation.loop=true;
        } else if(this.random==5){
            this.x = 1200;
            this.y =600;
            // this.animation.loop=true;
        }else if(this.random==0){
            this.x = 550;
            this.y =600;
            // this.animation.loop=true;
        }
        if(this.random == 1 || this.random ==2 || this.random == 3){
            this.goForward(40);
        }else{
            this.goForward(38);
        }
        // console.log("+++invisible++++ "+ this.level);
        let time = ((this.game.timer.gameTime));
        
        let result =  ((parseFloat(time).toFixed(1))-((Math.floor(time)))).toFixed(1);
        let value1 = Math.floor(result*10);
            if((Math.floor(time)%10)==0 || (Math.floor(time)%10)==3 || (Math.floor(time)%10)==6){
        // invisible
        if(value1==0 || value1==2 || value1==5) this.bullethit = true;
        if((value1==1 || value1==3 || value1==6) && this.bullethit == true){
                var dirs = [37,3738,38,3839,39,3940,40,4037];
                for(var i = 0; i < dirs.length; i++) {
                    if(this.x!=-200){
                    this.game.BombList.push(new Explosion(this.game
                        ,AM.getAsset("./img/greendmg.png"),this.x,this.y, dirs[i]
                        , 100, 100, 5, 0.15, 11, true, 2, 7));
                    }
                }
                this.bullethit = false;
            }

            }
        // if(this.bossBulletFire==true && this.fireCancel== true){
        //     var dirs = [37,3738,38,3839,39,3940,40,4037];
        //     for(var i = 0; i < dirs.length; i++) {
        //         this.game.BombList.push(new Explosion(this.game
        //             ,AM.getAsset("./img/greendmg.png"),this.x,this.y, dirs[i]
        //             , 100, 100, 5, 0.15, 11, true, 2, 7));
        //     }
        //     this.fireCancel=false;
        //     this.bossBulletFire == false;
        // }
    }
    if(this.level==2.1){
        
       
        
        let time = ((this.game.timer.gameTime));
   
        if((Math.floor(this.game.timer.gameTime)%3)==2 ){
            let whichPlayer = Math.floor(Math.random() * this.game.playerList.length) + 1;
            let playerPositionX = this.game.playerList[whichPlayer-1].x;
            let playerPositionY = this.game.playerList[whichPlayer-1].y;
            
         
            let result =  ((parseFloat(time).toFixed(1))-((Math.floor(time)))).toFixed(1);
            // console.log(result);
            // console.log(Math.floor(result*10)+"     =====");
            let value1 = Math.floor(result*10);
            // let value2 = 5;
            
            // console.log(value1==5);

            
                if(true){
                    // console.log("hit the bullet");
              
                //to get the exact angle
                xdiff= playerPositionX-this.x;
                ydiff = playerPositionY-this.y;
                let theta =Math.atan2(ydiff, xdiff);
                this.game.exactAngle= theta;
                // console.log("-----------------"+this.game.exactAngle);
                // this.exactAngle = theta;
                // console.log( xdiff + " "+ ydiff);
                // console.log(Math.floor((theta*180)/Math.PI)+" huh  angle is")
                    // if(Math.floor(the))
                    
                    let degree = Math.floor((theta*180)/Math.PI);
                //
                
               //dir use for shooting 
                let rightdir = [3839,38390,39,39400,3940];
                let leftdir = [37,3738,4037,37380,37400];
                let updir = [3738,373800,38,383900,3839];
                let downdir = [3940,403900,40,403700,4037];

                var dirs = [];
                // console.log(this.game.exactAngle+"------");
                if(degree>45 && degree<135){
                     dirs = [3940,403900,40,403700,4037];
                     if(this.game.canMove(index ,40, "AI")) {
                        this.goForward(40);
                     }
                } else if(degree>-135 && degree<-45){
//for up
                 dirs = [3738,373800,38,383900,3839];
                 if(this.game.canMove(index ,38, "AI")) {
                    this.goForward(38);
                 }
                } else if((degree>135 && degree<=179) || (degree<-135 && degree>-179)){
                    dirs= [37,3738,4037,37380,37400];
                    if(this.game.canMove(index ,37, "AI")) {
                        this.goForward(37);
                     }
                }else{
                    dirs = [3839,38390,39,39400,3940];
                    if(this.game.canMove(index ,39, "AI")) {
                        this.goForward(39);
                     }
                }
                if(value1==0) this.bullethit = true;
                for(var i = 0; i < dirs.length; i++) {
                    if(value1==1 && this.bullethit == true){
                    this.game.BombList.push(new Explosion(this.game
                    ,AM.getAsset("./img/greendmg.png"),this.x,this.y, dirs[0]
                    , 100, 100, 5, 0.15, 11, true, 1, 7));
                    this.bullethit = false;
                    // console.log("From 1");
                    }
                    if(value1==2) {
                        if(this.bullethit == false) {
                            this.game.BombList.push(new Explosion(this.game
                                ,AM.getAsset("./img/greendmg.png"),this.x,this.y, 0
                                , 100, 100, 5, 0.15, 11, true, 1, 7));
                        }
                        this.bullethit = true;}
                    if(value1==3 && this.bullethit == true){
                        this.game.BombList.push(new Explosion(this.game
                        ,AM.getAsset("./img/greendmg.png"),this.x,this.y, dirs[1]
                        , 100, 100, 5, 0.15, 11, true, 1, 7));
                        this.bullethit = false;
                        // console.log("From 2");
                        }

                        if(value1==4) this.bullethit = true;
                    if(value1==5 && this.bullethit == true){
                        this.game.BombList.push(new Explosion(this.game
                        ,AM.getAsset("./img/greendmg.png"),this.x,this.y, dirs[2]
                        , 100, 100, 5, 0.15, 11, true, 1, 7));
                        this.bullethit = false;
                        console.log("From 3");
                        }
                        if(value1==6) this.bullethit = true;
                    if(value1==7 && this.bullethit == true){
                        this.game.BombList.push(new Explosion(this.game
                        ,AM.getAsset("./img/greendmg.png"),this.x,this.y, dirs[3]
                        , 100, 100, 5, 0.15, 11, true, 1, 7));
                        this.bullethit = false;
                        console.log("From 4");
                        }
                        if(value1==8) {
                            if(this.bullethit == false) {
                                this.game.BombList.push(new Explosion(this.game
                                    ,AM.getAsset("./img/greendmg.png"),this.x,this.y, 0
                                    , 100, 100, 5, 0.15, 11, true, 1, 7));
                            }
                            this.bullethit = true;}
                    if(value1==9 && this.bullethit == true){
                        this.game.BombList.push(new Explosion(this.game
                        ,AM.getAsset("./img/greendmg.png"),this.x,this.y, dirs[4]
                        , 100, 100, 5, 0.15, 11, true, 1, 7));
                        this.bullethit = false;
                        console.log("From 5");
                        }

                }
                
                }
        }
    }
}
AI.prototype.randomGenerate = function(num){
    
    if(Math.floor(num%5)==1){
        this.bossBulletFire = true;
        
    }
    if(Math.floor(num%5)==0  ){
        this.fireCancel = true;
        
    }
    //change animation
    if((Math.floor(num%10)==8) && this.bossAnimation==true){
        this.bossHealthDisplay = false;
       
        this.animation = new Animation(AM.getAsset("./img/monstersfire.png"), 72,72,4, 0.1, 8, true, 1.0);
        this.width = 0;
    this.height = 0;
    this.bossAnimation==false;
    
    }else if(Math.floor(num%10)==1){
        if(this.bossHealthDisplay == false){
            playSoundEffect("Evil_Laugh");
            // console.log("bhoot");
        }
        
        this.bossHealthDisplay = true;
        // this.animation = new Animation(this.spritesheet, 80,80,4, 0.10, 4, true, 2.0);
        this.width = 160;
    this.height = 160;
    this.bossAnimation==true;
    // music.normal = music.laugh;
        // music.normal.play();
    }
    // console.log(num + "+++++++==========")
    if(Math.floor(num%10)==0){
        this.randomizeBossPosition = true;
    }
    if((Math.floor(num%10)==1) && this.randomizeBossPosition==true){
        this.random = Math.floor(Math.random() * Math.floor(6));
        this.randomizeBossPosition = false;
    }
}
AI.prototype.draw = function (ctx) {
    ctx.drawImage(this.img,
        this.sheetX, this.sheetY,  // source from sheet
        this.sheetWidth, this.sheetHeight, // width and height of source
        this.x, this.y, // destination coordinates
        this.width, this.height); // destination width and height
        ctx.beginPath();
        if(this.level == 4.1){
            ctx.font = "30px Arial";

    ctx.fillStyle = "red";
    ctx.fillText("Danger Zone" , 20, 40);
    ctx.fillText("Danger Zone" , 550, 40);
    ctx.fillText("Danger Zone" , 1200, 40);
    ctx.fillText("Danger Zone" , 20, 700);
    ctx.fillText("Danger Zone" , 550, 700);
    ctx.fillText("Danger Zone" , 1200, 700);

//     this.ctx.restore();
        }
        //
        // if(this.random==1){
        //     this.x = 550;
        //     this.y =0;
            
        //     // this.animation = new Animation(this.spritesheet, 80,80,4, 0.10, 4, true, 2.0);
        //     // this.animation.loop=true;
        // }else if(this.random==2){
        //     this.x = 0;
        //     this.y =0;
        //     // this.animation.loop=true;
        //     // this.animation = new Animation(this.spritesheet, 80,80,4, 0.10, 4, true, 2.0);
        // }else if(this.random==3){
        //     this.x = 1200;
        //     this.y =0;
        //     // this.animation.loop=true;
        //     // this.animation = new Animation(this.spritesheet, 80,80,4, 0.10, 4, true, 2.0);
        // }else if(this.random==4){
        //     this.x = 0;
        //     this.y =600;
        //     // this.animation.loop=true;
        // } else if(this.random==5){
        //     this.x = 1200;
        //     this.y =600;
        //     // this.animation.loop=true;
        // }else if(this.random==0){
        //     this.x = 550;
        //     this.y =600;
        //
        if(this.bossHealthDisplay==true){
    if(this.level == 1  || this.level == 1.2) {
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.hp/this.Maxhp*50, this.y);
        //console.log((this.x + this.hp) * 0.2);
        ctx.lineWidth = 10;
    } else if (this.level == 1.1 || this.level == 4.1 || this.level == 3.1 || this.level == 2.1|| this.level == 5.1){
        ctx.moveTo(this.x-20, this.y);
        ctx.lineTo((this.x-20 + this.hp/this.Maxhp * 120), this.y);
        ctx.lineWidth = 20;
    }else if (this.level == 4.1 ){
        ctx.moveTo(this.x-20, this.y);
        ctx.lineTo((this.x-20 + this.hp/this.Maxhp * 400), this.y);
        ctx.lineWidth = 20;
    }
    if(this.hp/this.Maxhp  > 0.5){
        ctx.strokeStyle = 'green';
    }else if(this.hp/this.Maxhp > 0.3){
        ctx.strokeStyle = 'yellow';
    }else{
        ctx.strokeStyle = 'red';
    }
    ctx.stroke();
}
}

AI.prototype.damaged = function(hp) {
    this.hp -=hp;
    if((this.hp/this.Maxhp < 0.5) && this.releaseSmartAI == true && this.level == 1.1){
        var that = this;
        releaseSmartAI(this.game);
        setTimeout(function() {releaseSmartAI(that.game);}, 800);
        // this.game.AIList.push(new SmartAI
        //     (this.game,15,138,34,52,0,650,51,78,AM.getAsset("./img/sk.png"),1, 10,2));
        this.releaseSmartAI = false;
        
        setTimeout(function() {resetSmartAI(that);}, 5000);
    }
}
function resetSmartAI(game) {
    game.releaseSmartAI = true;
}

function releaseSmartAI(game) {
    var spot = fastSkullSpot.random();

    game.AIList.push(new SmartAI
        (game,15,138,34,52,spot[0],spot[1],51,78,AM.getAsset("./img/skfast.png"),1, enemyStat.skullFastLevel1.hp,2));
}