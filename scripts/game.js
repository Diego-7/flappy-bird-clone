
let frames = 0;
const hitSound = new Audio();
hitSound.src = 'sounds/hit.wav';

const sprites = new Image();
sprites.src = 'img/sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');


// Background
const background = {
  spriteX: 390,
  spriteY: 0,
  widthFLB: 275,
  heightFLB: 204,
  x: 0,
  y: canvas.height - 204,
  draw() {
    context.fillStyle = '#70c5ce';
    context.fillRect(0,0, canvas.width, canvas.height)

    context.drawImage(
      sprites,
      background.spriteX, background.spriteY,
      background.widthFLB, background.heightFLB,
      background.x, background.y,
      background.widthFLB, background.heightFLB,
    );

    context.drawImage(
      sprites,
      background.spriteX, background.spriteY,
      background.widthFLB, background.heightFLB,
      (background.x + background.widthFLB), background.y,
      background.widthFLB, background.heightFLB,
    );
  },
};

// Ground
function newGround() {
  const ground = {
    spriteX: 0,
    spriteY: 610,
    widthFLB: 224,
    heightFLB: 112,
    x: 0,
    y: canvas.height - 112,
    refresh() {
      const groundMove = 1;
      const replaysIn = ground.widthFLB / 2;
      const moving = ground.x - groundMove;

      // console.log('[ground.x]', ground.x);
      // console.log('[replaysIn]',replaysIn);
      // console.log('[moving]', moving % replaysIn);
      
      ground.x = moving % replaysIn;
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

function colide(flappyBird, ground) {
  const flappyBirdY = flappyBird.y + flappyBird.heightFLB;
  const groundY = ground.y;

  if(flappyBirdY >= groundY) {
    return true;
  }

  return false;
}

function newFlappybird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    widthFLB: 33,
    heightFLB: 24,
    x: 10,
    y: 50,
    jumping: 4.6,
    jump() {
  
      flappyBird.speed =  - flappyBird.jumping;
     
    },
    gravity: 0.25,
    speed: 0,
    refresh() {
      if(colide(flappyBird, globals.ground)) {
        
        hitSound.play();

        changeScreen(screen.GAME_OVER);
        return;
      }
  
      flappyBird.speed = flappyBird.speed + flappyBird.gravity;
      flappyBird.y = flappyBird.y + flappyBird.speed;
    },
    moves: [
      { spriteX: 0, spriteY: 0, }, // wing up
      { spriteX: 0, spriteY: 26, }, // wings in the middle
      { spriteX: 0, spriteY: 52, }, // wings down
      { spriteX: 0, spriteY: 26, }, // wings in the middle
    ],
    currentFrame: 0,
    frameRefresh() {     
      const frameInterval = 10;
      const intervalPassed = frames % frameInterval === 0;
      

      if(intervalPassed) {
        const incrementBase = 1;
        const increment = incrementBase + flappyBird.currentFrame;
        const replayBase = flappyBird.moves.length;
        flappyBird.currentFrame = increment % replayBase
      }
        // console.log('[increment]', increment);
        // console.log('[replayBase]',replayBase);
        // console.log('[frame]', increment % replayBase);
    },
    draw() {
      flappyBird.frameRefresh();
      const { spriteX, spriteY } = flappyBird.moves[flappyBird.currentFrame];

      context.drawImage(
        sprites,
        spriteX, spriteY, // Sprite X, Sprite Y
        flappyBird.widthFLB, flappyBird.heightFLB, // cut out size
        flappyBird.x, flappyBird.y,
        flappyBird.widthFLB, flappyBird.heightFLB,
      );
    }
  }
  return flappyBird;  
}


// Get Ready Message
const getReadyMessage = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  draw() {
    context.drawImage(
      sprites,
      getReadyMessage.sX, getReadyMessage.sY,
      getReadyMessage.w, getReadyMessage.h,
      getReadyMessage.x, getReadyMessage.y,
      getReadyMessage.w, getReadyMessage.h
    );
  }
}

// Game Over Message
const gameOverMessage = {
  sX: 134,
  sY: 153,
  w: 226,
  h: 200,
  x: (canvas.width / 2) - 226 / 2,
  y: 50,
  draw() {
    context.drawImage(
      sprites,
      gameOverMessage.sX, gameOverMessage.sY,
      gameOverMessage.w, gameOverMessage.h,
      gameOverMessage.x, gameOverMessage.y,
      gameOverMessage.w, gameOverMessage.h
    );
  }
}

// 
// Pipes
// 

function newPipes() {
  const pipes = {
    widthFLB: 52,
    heightFLB: 400,
    ground: {
      spriteX: 0,
      spriteY: 169,
    },
    sky: {
      spriteX: 52,
      spriteY: 169,
    },
    space: 80,
    draw() {
      pipes.pairs.forEach(function(pair) {
        const yRandom = pair.y;
        const pipesSpace = 90;
  
        const skyPipesX = pair.x;
        const skyPipesY = yRandom; 

        // Sky Pipes
        context.drawImage(
          sprites, 
          pipes.sky.spriteX, pipes.sky.spriteY,
          pipes.widthFLB, pipes.heightFLB,
          skyPipesX, skyPipesY,
          pipes.widthFLB, pipes.heightFLB,
        )
        
        // Ground Pipes
        const pipesGroundX = pair.x;
        const pipesGroundY = pipes.heightFLB + pipesSpace + yRandom; 
        context.drawImage(
          sprites, 
          pipes.ground.spriteX, pipes.ground.spriteY,
          pipes.widthFLB, pipes.heightFLB,
          pipesGroundX, pipesGroundY,
          pipes.widthFLB, pipes.heightFLB,
        )

        pair.skyPipe = {
          x: skyPipesX,
          y: pipes.heightFLB + skyPipesY
        }
        pair.groundPipe = {
          x: pipesGroundX,
          y: pipesGroundY
        }
      })
    },
    flappybirdColide(pair) {
      const flappybirdHead = globals.flappyBird.y;
      const flappybirdFoot = globals.flappyBird.y + globals.flappyBird.heightFLB;
      
      if((globals.flappyBird.x + globals.flappyBird.widthFLB) >= pair.x) {
        if(flappybirdHead <= pair.skyPipe.y) {
          return true;
        }

        if(flappybirdFoot >= pair.groundPipe.y) {
          return true;
        }
      }
      return false;
    },
    pairs: [],
    refresh() {
      const FramesPassed100 = frames % 100 === 0;
      if(FramesPassed100) {
        pipes.pairs.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }



      pipes.pairs.forEach(function(pair) {
        pair.x = pair.x - 2;

        if(pipes.flappybirdColide(pair)) {
          hitSound.play();
          changeScreen(screen.GAME_OVER);
        }

        if(pair.x + pipes.widthFLB <= 0) {
          pipes.pairs.shift();
        }
      });

    }
  }

  return pipes;
}

function newScore() {
  const score = {
    scores: 0,
    draw() {
      context.font = '35px "VT323"';
      context.textAlign = 'right';
      context.fillStyle = 'white';
      context.fillText(`Score ${score.scores}`, canvas.width - 10, 35);
      
      //score = placar
      //scores = pontuação
    },
    refresh() {
      const frameInterval = 20;
      const intervalPassed = frames % frameInterval === 0;

      if(intervalPassed) {
        score.scores = score.scores + 1;
      }
    }
  }
  return score;
}


// 
// [screen]
// 
const globals = {};
let activeScreen = {};
function changeScreen(newScreen) {
  activeScreen = newScreen;

  if(activeScreen.initialize) {
    activeScreen.initialize();
  }
}

const screen = {
  START: {
    initialize() {
      globals.flappyBird = newFlappybird();
      globals.ground = newGround();
      globals.pipes = newPipes();
    },
    draw() {
      background.draw();
      globals.flappyBird.draw();
      
      globals.ground.draw();
      getReadyMessage.draw();
    },
    click() {
      changeScreen(screen.GAME);
    },
    refresh() {
      globals.ground.refresh();
    }
  }
};

screen.GAME = {
  initialize() {
    globals.score = newScore();
  },
  draw() {
    background.draw();
    globals.pipes.draw();
    globals.ground.draw();
    globals.flappyBird.draw();
    globals.score.draw();
  },
  click() {
    globals.flappyBird.jump();
  },
  refresh() {
    globals.pipes.refresh();
    globals.ground.refresh();
    globals.flappyBird.refresh();
    globals.score.refresh();
  }
};

screen.GAME_OVER = {
  draw() {
    gameOverMessage.draw();
  },
  refresh() {
    
  },
  click() {
    changeScreen(screen.START);
  }
}

function loop() {

  activeScreen.draw();
  activeScreen.refresh();

  frames = frames + 1;
  requestAnimationFrame(loop);
}


document.addEventListener('click', ()=> {
  if(activeScreen.click) {
    activeScreen.click();
  }
});

document.addEventListener('keypress', e=>{
  if (e.key === 'Enter'){
      activeScreen.click();
  }
 });

changeScreen(screen.START);
loop();