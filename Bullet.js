function Bullet(game, spritesheet,thex,they, theimgwidth,theimgheight,speed,dir, owner,dmg, angle, maxDistance) {
    this.x = thex;
    this.y = they;
    this.width = theimgwidth;
    this.height = theimgheight;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.myspeed = speed;
    this.dir=dir;
    this.owner = owner;
    this.travelDistance = 0;
    this.dmg = dmg;
    this.angle = angle;
    this.maxDistance = maxDistance;
};

Bullet.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y,this.width,this.height);
};

Bullet.prototype.update = function () {

    //console.log(this.game.bulletList.indexOf(this));
    if(this.dir == 37) {
        this.x-=this.myspeed;
        this.y += this.angle;
    } else if(this.dir == 38) {
        this.y-=this.myspeed;
        this.x += this.angle;
    } else if(this.dir == 39) {
        this.x+=this.myspeed;
        this.y += this.angle;
    } else {
        this.y+=this.myspeed;
        this.x += this.angle;
    }
    
    this.travelDistance += Math.abs(this.myspeed);
    // if(this.y>  550) this.y = -200;

    // this.x+=this.myspeed;
    // if(this.x> 800) this.x = -300;
};