 ////////Explosion
 function AIFire(game, spritesheet,xval,yval
    , dir, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, owner) {
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

AIFire.prototype.update = function () {
    //console.log("draged");
    this.time++;
    
    
    Entity.prototype.update.call(this);
}

AIFire.prototype.draw = function (ctx) {
    
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Fire(game) {
    this.animation = new Animation(AM.getAsset("./img/fire.png"), 0, 0, 64, 128, 0.05, 32, true, false, owner);
    //this.jumpAnimation = new Animation(AM.getAsset("./img/fire.png"), 0, 885, 165, 295, 0.05, 28, false, false);
    this.jumping = false;
    this.radius = 100;
    this.ground = 100;
    this.owner = owner;
    Entity.call(this, game, 500, 370, 64, 128);
}

Fire.prototype = new Entity();
Fire.prototype.constructor = Fire;

Fire.prototype.update = function () {
    this.x = this.owner.x;
    this.y = this.owner.y;
    // if (this.x < -64) this.x = 864;
    Entity.prototype.update.call(this);
}

Fire.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y,1.5);
    Entity.prototype.draw.call(this);
}