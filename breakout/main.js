import { Wall, Brick } from './rectangle.js';
import { Ball } from './ball.js';
import { Paddle } from './paddle.js';
import { GAME_CONFIG } from './config.js';

window.onload = () => {

    const stateDiv = document.querySelector("#game-state");
    const gameDiv = document.querySelector("#play-area");
    const borderThickness = GAME_CONFIG.borderThickness;
    const innerGameWidth = GAME_CONFIG.canvasWidth - 2 * borderThickness;

    // const log = document.getElementById("log");
    let gameState = 'Unstarted';
    let isPressingLeft, isPressingRight, paddle, ball, wallArray, brickArray, autoplay = false, rebound = false, gameLevel = 1;

    let topWall;
    let leftWall;
    let rightWall;
    let bottomWall;

    document.addEventListener("keydown", event => handleKeyDown(event));
    document.addEventListener("keyup", event => handleKeyUp(event));

    startNewGame();


    function startNewGame() {

         paddle = createPaddle();
         ball = createBall();
         wallArray = createWalls();
         brickArray = createBricks();


         topWall = wallArray[0];
         leftWall = wallArray[1];
         rightWall = wallArray[2];
         bottomWall = wallArray[3];


        updateGameStateDisplay();

        gameLoop();

    }

    function clearOldElements() {
        paddle.visible, ball.visible = false;
        paddle.element.remove();
        ball.element.remove();
        brickArray.forEach(brick => brick.element.remove());
    }


    function gameLoop(){

        if(brickArray.length === 0){
            gameState = 'Won';
            gameLevel++;

            updateGameScreen();

        }
        else if(ball.y >= bottomWall.top){
            gameState = 'Lost';

            updateGameScreen();
        }
        else if(['Playing', 'Unstarted' , 'Paused'].includes(gameState)) {
            updateGameScreen();

            if (['Playing'].includes(gameState)) {
                // if(autoplay) console.log('autoplay', paddle.speed, paddle.center, ball.x, paddle.center > ball.x ,paddle.center < ball.x );

                if (isPressingRight || (autoplay && paddle.center < ball.x )) {
                    console.log('Pressing Right');
                    paddle.move('right', rightWall.left)
                } else if (isPressingLeft || (autoplay && paddle.center > ball.x )) {
                    console.log('Pressing Left');
                    paddle.move('left', leftWall.right)
                }

                ball.move();

                const paddleHit = ball.detect_paddle_collision(paddle, rebound);

                let wallHit = false;
                for (let i = 0; i < wallArray.length;i++) {
                    if(ball.detect_wall_collision(wallArray[i])){
                        wallHit = wallArray[i].name;
                        break
                    }}

                let remainingBricks = ball.detect_brick_collisions(brickArray);

                if (paddleHit) {
                    // console.log('paddleHit', paddleHit);
                }

                if (wallHit) {
                    // console.log('wallHit', wallHit);
                }

                if (remainingBricks.length !== brickArray.length) {
                    // console.log('brickHit -', remainingBricks.length, ' bricks remaining.');
                    brickArray = remainingBricks;
                }
                // wait(delay);
            }
            requestAnimationFrame(gameLoop);

        }



    }



    function handleKeyDown(e) {
        // console.log(wallArray[1].right, wallArray[2].left)
        // log.textContent += ` ${e.code}`;
        if (e.key === 'a') {
            autoplay = !autoplay;
        }
        if (e.key === 'r') {
            rebound = !rebound;
        }
        if (e.keyCode === 37) {
            isPressingLeft = true;
        }
        if (e.keyCode === 39) {
            isPressingRight = true;
        }
        if (e.code === 'Space') {
            if (gameState === 'Won' || gameState === 'Lost') {
                gameState = 'Unstarted';
                clearOldElements()

                startNewGame();
            }
            else if (['Unstarted', 'Paused'].includes(gameState)) {
                gameState = 'Playing'
                updateGameStateDisplay();
            }
            else {
                gameState = 'Paused'
                updateGameStateDisplay();
            }
        }
    };

    function startPaddleMovement(e) {
        if (isPressingLeft) {
            paddle.move('left', leftWall.right);
        }
        if (isPressingRight) {
            paddle.move('right', rightWall.left);
        }
    };

    function handleKeyUp(e) {
        // log.textContent += ` ${e.code}`;
        if (e.keyCode === 37) {
            isPressingLeft = false;
        }
        if (e.keyCode === 39) {
            isPressingRight = false;
        }
        // log.textContent += ` ${e.code}`;
    };


    function getStateMessage() {
        if (gameState === 'Unstarted') {
            return "Press space bar to begin. \n Press 'a' to toggle autoplay feature" }
        else if (gameState === 'Paused') {
            return 'Game is paused. Press space bar to resume.' }
        else if (gameState === 'Won') {
            return  `You won! Congrats. Press space bar to play level ${gameLevel}` }
        else if (gameState === 'Lost') {
            return 'You lost! Try again.' }
        else if (gameState === 'Playing') {
            return `Level ${gameLevel} - Game in Progress.` }
        else return '';
    };

    function updateGameStateDisplay() {
        console.log(gameState, getStateMessage());
        stateDiv.innerText = getStateMessage();
        //debugger
    };


    function  createPaddle() {
        const paddle = new Paddle('paddle', 325,550, GAME_CONFIG.paddleWidth, GAME_CONFIG.paddleWidth/6, 'paddle', GAME_CONFIG.initialVelocity + gameLevel);
        gameDiv.appendChild(paddle.element);
        return paddle;
    }

    function  createBall() {
        const ball = new Ball('ball', paddle.x + 0.5 * paddle.width, paddle.y - 2 * paddle.height , GAME_CONFIG.ballSize, GAME_CONFIG.initialVelocity + gameLevel, -GAME_CONFIG.initialVelocity-gameLevel, 'ball');
        gameDiv.appendChild(ball.element);
        return ball;
    }

    function  createWalls() {

        const walls = [
            new Wall('top', 0, 0, 800, 10, 'black', 'top-wall'),
            new Wall('left', 0, 0, 10, 590, 'black', 'left-wall'),
            new Wall('right', 790, 0, 10, 590, 'black', 'right-wall'),
            new Wall('bottom', 0, 590, 800, 10, 'black', 'bottom-wall')
        ];

        walls.forEach(wall => gameDiv.appendChild(wall.element));

        return walls;

    }


    function createBricks(number_of_bricks= 45){
        const bricks_per_row = 9;
        const brick_gap = 5;

        const brick_width = Math.ceil((innerGameWidth - brick_gap * bricks_per_row)/(bricks_per_row));
        const brick_height = Math.floor(brick_width/3);

        const rows = Math.ceil(number_of_bricks/bricks_per_row);
        const cols = Math.ceil(number_of_bricks/rows);

        const partial_row = number_of_bricks % bricks_per_row;
        let bricks = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * (brick_width + brick_gap) + borderThickness;
                const y = row * (brick_height + brick_gap) + borderThickness;
                const brick = new Brick('brick', x, y, brick_width, brick_height, 'brick');

                gameDiv.appendChild(brick.element);
                bricks.push(brick);
            }
        }
        // debugger
        return bricks
    }

    function updateGameScreen() {
        let message = getStateMessage(gameState);

        if (gameState !== 'Playing') {
            updateGameStateDisplay();
        }
        else {
            paddle.draw();
            ball.draw();
            brickArray.forEach(brick => brick.draw())
            wallArray.forEach(wall => wall.draw())
        }

    }





}

