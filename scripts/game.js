console.log('[Diego] Flappy Bird');

let frames = 0;
const hitSound = new Audio();
hitSound.src = 'sounds/hit.wav'
const jumpSound = new Audio();
jumpSound.src = 'sounds/jump.wav'

const sprites = new Image();
sprites.src = 'img/sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Background
const Background = {
    spriteX: 390,
    spriteY: 0,
    widthFLB: 275,
    heightFLB: 204,
    x: 0,
    y: canvas.height - 204,
    draw(){
        context.fillStyle = '#70C5CE';
        context.fillRect(0,0, canvas.width, canvas.height)

        
    
        context.drawImage(
            sprites,
            Background.spriteX, Background.spriteY,
            Background.widthFLB, Background.heightFLB,
            Background.x, Background.y,
            Background.widthFLB, Background.heightFLB,
        )
            context.drawImage(
                sprites,
                Background.spriteX, Background.spriteY,
                Background.widthFLB, Background.heightFLB,
                (Background.x + Background.widthFLB), Background.y,
                Background.widthFLB, Background.heightFLB,
            )
}
}



// Ground

function newGround() {
const ground = {
    spriteX: 0,
    spriteY: 610,
    widthFLB: 224,
    heightFLB: 112,
    x: 0,
    y: canvas.height - 112,
    
    refresh(){
       const groundMove = 1;
       const repeatOn = ground.widthFLB / 2;
       const groundMoving = ground.x - groundMove;

        // console.log('[chao.x]', chao.x);
      // console.log('[repeteEm]',repeteEm);
      // console.log('[movimentacao]', movimentacao % repeteEm);

       ground.x = groundMoving % repeatOn;
    },
    draw() {
        context.drawImage(
            sprites,
            ground.spriteX, ground.spriteY,
            ground.widthFLB, ground.heightFLB,
            ground.x, ground.y,
            ground.widthFLB, ground.heightFLB,
        );

        context.drawImage(
            sprites,
            ground.spriteX, ground.spriteY,
            ground.widthFLB, ground.heightFLB,
            (ground.x + ground.widthFLB), ground.y,
            ground.widthFLB, ground.heightFLB,
        );
    },
};
return ground;

}

function collide(flappyBird, ground) {

    const flappyBirdY = flappyBird.y + flappyBird.heightFLB;
    const groundY = ground.y;

    if(flappyBirdY >= groundY) {
        return true;
    }
    return false;
}

function newFlappyBird() {
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    widthFLB: 33,
    heightFLB: 24,
    x: 10,
    y: 50,
    jump: 4.6,
    Jump() {
        console.log('devo pular')
        console.log('antes', flappyBird.speed)
        flappyBird.speed = - flappyBird.jump;
        console.log('depois', flappyBird.speed) 
    },
    gravity: 0.25,
    speed: 0,
refresh(){
    if(collide(flappyBird, globals.ground)) {
        console.log('colidiu');
        hitSound.play();

        changeScreen(screen.START);
        return;

    }
    flappyBird.speed =  flappyBird.speed + flappyBird.gravity;
    flappyBird.y = flappyBird.y + flappyBird.speed;
},
 moves: [
    { spriteX:0, spriteY:0,}, //wings up
    { spriteX:0, spriteY:26,}, //wings in the middle
    { spriteX:0, spriteY:52,}, //wings down
    { spriteX:0, spriteY:26,}, //wings in the middle
],
actualFrame: 0,
frameRefresh() {
    const framesInterval = 10;
    const passInterval = frames % framesInterval === 0;

    if(passInterval) {
    const increaseBase = 1;
    const increase = increaseBase + flappyBird.actualFrame;
    const repeatBase = flappyBird.moves.length;
    flappyBird.actualFrame = increase % repeatBase   
    }
},
    draw(){
        flappyBird.frameRefresh();

        const { spriteX, spriteY } = flappyBird.moves[flappyBird.actualFrame]
        
        context.drawImage(
        sprites,
    spriteX, spriteY, // Sprite X, Sprite Y
    flappyBird.widthFLB, flappyBird.heightFLB, //cutting size in sprite
    flappyBird.x, flappyBird.y,
    flappyBird.widthFLB, flappyBird.heightFLB,
        ); 
    }
}
return flappyBird;
}


// Message Get Ready
const messageGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    draw() {
        context.drawImage(
            sprites,
            messageGetReady.sX, messageGetReady.sY,
            messageGetReady.w, messageGetReady.h,
            messageGetReady.x, messageGetReady.y,
            messageGetReady.w, messageGetReady.h,

        );
    }
}

//
// screen
//
const globals = {}
let screenActive = {};

function changeScreen(newScreen) {
    screenActive = newScreen;

    if(screenActive.initialize) {
        screenActive.initialize();

    }
}
const screen ={
    START: {
        initialize() {
        globals.flappyBird = newFlappyBird();
        globals.ground = newGround();
        },
       draw(){
        Background.draw();
        globals.ground.draw();
        globals.flappyBird.draw();
        messageGetReady.draw();
       },
       click() {

           changeScreen(screen.game);
       },
        refresh(){
            globals.ground.refresh();
        }
    }
};

screen.game = {
    draw() {
    Background.draw();
    globals.ground.draw();
    globals.flappyBird.draw();
    },
    click() {
        globals.flappyBird.Jump();
        jumpSound.play();

        

    },
    refresh(){
        globals.flappyBird.refresh();  
        globals.ground.refresh();
    }
};

function loop(){

    screenActive.draw();
    screenActive.refresh();
    frames = frames + 1;

requestAnimationFrame(loop);

}

document.addEventListener('click', ()=>{
 if (screenActive.click){
     screenActive.click();
 }

});

document.addEventListener('keypress', e=>{
 if (e.key === 'Enter'){
     screenActive.click();
 }
});

changeScreen(screen.START);
loop();