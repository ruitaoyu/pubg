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
    this.entities = [];
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.keyDown = [];
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

    // this.ctx.canvas.addEventListener("keypress", function (e) {
    //     var speed = 15;
    //     if (e.code === "KeyS")         that.entities[that.entities.length-1].goForward(40); 
        
    //     if (e.code === "KeyA")         that.entities[that.entities.length-1].goForward(37); 
    //     if (e.code === "KeyD")         that.entities[that.entities.length-1].goForward(39); 
    //     if (String.fromCharCode(e.which) === ' ') that.entities[1].jumping = true;
    //     //that.chars[e.code] = true;
    //     //console.log(e);
    //     //console.log("Key Pressed Event - Char " + e.charCode + " Code " + e.keyCode);
    // console.log(e);
    // console.log("Key press Event - Char " + e.code + " Code " + e.keyCode);
    //  }, false);

    this.ctx.canvas.addEventListener("keyup", function (e) {
        that.keyDown.splice(that.keyDown.indexOf(e.keyCode),1);
        //console.log(e);
        console.log("Key Up Event - Char " + e.code + " Code " + e.keyCode);
    }, false);

    
    var update = function () {
    //console.log("XXXXXXXXXXXXXX");
        
        for(var i=0; i<that.keyDown.length; i++) {
            //console.log(that.keyDown[i]);
            if (that.keyDown[i] === 83)         that.entities[that.entities.length-2].goForward(40); 
            else if (that.keyDown[i] === 87)         that.entities[that.entities.length-2].goForward(38);
            else if (that.keyDown[i] === 65)         that.entities[that.entities.length-2].goForward(37); 
            else if (that.keyDown[i] === 68)         that.entities[that.entities.length-2].goForward(39);
            if (that.keyDown[i] === 40)         that.entities[that.entities.length-1].goForward(40); 
            else if (that.keyDown[i] === 38)         that.entities[that.entities.length-1].goForward(38);
            else if (that.keyDown[i] === 37)         that.entities[that.entities.length-1].goForward(37); 
            else if (that.keyDown[i] === 39)         that.entities[that.entities.length-1].goForward(39);
        }
    };
    setInterval(update,50);


    // console.log('Input started');

//     var keysDown = {};

// this.ctx.canvas.addEventListener("keydown", function (v) {keysDown[v.keyCode] = true;}, false);
// this.ctx.canvas.addEventListener("keyup", function (v) {delete keysDown[v.keyCode];}, false);
  


// setInterval(update,10);
}



GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        entity.update();
    }
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