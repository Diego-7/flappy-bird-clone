console.log('[Diego] Flappy Bird');

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
const ground = {
    spriteX: 0,
    spriteY: 610,
    widthFLB: 224,
    heightFLB: 112,
    x: 0,
    y: canvas.height - 112,
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
        )
    }
}

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    widthFLB: 33,
    heightFLB: 24,
    x: 10,
    y: 50,
    gravity: 0.25,
    speed: 0,

refresh(){
    flappyBird.speed =  flappyBird.speed + flappyBird.gravity;
    
    flappyBird.y = flappyBird.y + flappyBird.speed;
},
    draw(){
        context.drawImage(
        sprites,
    flappyBird.spriteX, flappyBird.spriteY, // Sprite X, Sprite Y
    flappyBird.widthFLB, flappyBird.heightFLB, //cutting size in sprite
    flappyBird.x, flappyBird.y,
    flappyBird.widthFLB, flappyBird.heightFLB,
        ); 
    }
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
let screenActive = {};

function changeScreen(newScreen) {

    screenActive = newScreen;
}
const screen ={
    START: {
       draw(){
        Background.draw();
        ground.draw();
        flappyBird.draw();
           messageGetReady.draw();
           
           
       },
       click() {
           changeScreen(screen.game);

       },
        refresh(){

        }
    }
};

screen.game = {
    draw() {
    Background.draw();
    ground.draw();
    flappyBird.draw();
    },

    refresh(){
        flappyBird.refresh();
        
    }
};


function loop(){

    screenActive.draw();
    screenActive.refresh();

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