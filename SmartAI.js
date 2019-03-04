function SmartAI(game,sx,sy,sw,sh,cx,cy,cw,ch,img,level,hp) {
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
    this.thisDir = 38;
    this.speed = 4.5;
    this.hp = hp;
    this.Maxhp = hp;
    this.level = level;
    //this.index = index;
    this.isturn = 0;
    this.turningCoolDown = [100,150,200,300,50].random();

    this.coord = [-1,-1];
    this.lastWorkingCoord;

    this.skillCoolDown =0;

    //this.animation = new Animation(AM.getAsset("./img/greendmg.png"), this.x, this.y, 100, 100, 0.9, 11, true, false);
}

SmartAI.prototype.goForward = function(dir) {
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

SmartAI.prototype.update = function(index) {

    //console.log(Math.floor((this.x+ this.width/2)/70) + ", "+ Math.floor((this.y+ this.height/2)/75));

        //     var posibleDir = [];

        // if(this.game.canMove(index ,37, "AI")) posibleDir.push(37);
        // if(this.game.canMove(index ,38, "AI")) posibleDir.push(38);
        // if(this.game.canMove(index ,39, "AI")) posibleDir.push(39);
        // if(this.game.canMove(index ,40, "AI")) posibleDir.push(40);

    var currentY;
    var currentX;
    if(this.lastDir == 37) {
        currentY = Math.floor((this.x+ this.width)/70);
        currentX = Math.floor((this.y+ this.height)/75);
    } else if(this.lastDir == 38) {
        currentY = Math.floor((this.x+ this.width/2)/70);
        currentX = Math.floor((this.y+ this.height)/75);

    }else if(this.lastDir == 39) {

        currentY = Math.floor((this.x)/70);
        currentX = Math.floor((this.y+ this.height)/75);

    }else if(this.lastDir == 40) {
        currentY = Math.floor((this.x+ this.width/2)/70);
        currentX = Math.floor((this.y+ this.height/7)/75);
    }

    //console.log(this.x,this.y, this.lastDir);


    var currentXP = Math.floor((this.game.playerList[0].x + this.game.playerList[0].width/2)/70);
    var currentYP = Math.floor((this.game.playerList[0].y + this.game.playerList[0].height/2)/75);

    
    
    // if(currentX != this.coord[0] || currentY != this.coord[1]){
        var result;
        // console.log("pass shorst");
        // console.log(currentX,currentY, currentYP, currentXP);
        result = ruitaoyu_shortest_path(map,
                [currentX, currentY],
                [currentYP,currentXP]);
        
        
            if(result == "left") {
                this.thisDir = 37;
            } else if (result == "top") {
                this.thisDir = 38;
            }else if (result == "right") {
                this.thisDir = 39;
            }else if (result == "bot") {
                this.thisDir = 40;
            } else if(result ==0) {
                this.thisDir = 0;
            if(this.skillCoolDown ==0) {
                //var dirs = [37,38,39,40];
                //for(var i = 0; i < dirs.length; i++) {
                    //console.log("before 1st" + i);
                    //this.game.nodmganimationList.push(new Heal(this.game, this));
                    this.game.BombList.push(new Explosion(this.game
                        ,AM.getAsset("./img/fire.png"),this.x-24,this.y, this.lastDir
                        ,  64, 128, 8, 0.05, 32, true, 1.5, 0, this));
                   // console.log("after 1st");
                //}
                this.skillCoolDown = 20;
            }
            if(this.skillCoolDown !=0) this.skillCoolDown--;
            }

        //this.lastWorkingCoord = [currentX,currentY];
 
        this.goForward(this.thisDir);
 
}

SmartAI.prototype.draw = function (ctx) {
    ctx.drawImage(this.img,
        this.sheetX, this.sheetY,  // source from sheet
        this.sheetWidth, this.sheetHeight, // width and height of source
        this.x, this.y, // destination coordinates
        this.width, this.height); // destination width and height
        ctx.beginPath();
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

SmartAI.prototype.damaged = function(hp) {
    this.hp -=hp;
}