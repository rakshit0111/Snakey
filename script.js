const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
console.log(board);
let gameInterval = undefined;
let snake = [{x:10,y:10}];
let gameDelay = 200;
let gridSize = 20;
let food = generateFood();
let direction = 'right';
let startedGame = false;
function draw()
{
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}
function drawSnake()
{
    snake.forEach((segment) => {
     const snakeElement = createGameElement('div','snake');
    setPosition(snakeElement,segment);
    board.appendChild(snakeElement);
});
}
function createGameElement(tag,className)
{
    const element = document.createElement(tag);
    element.className = className ;
    return element;
}
function setPosition(element,position)
{
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}
// draw();
function drawFood ()
{
    const foodElement = createGameElement('div','food');
    setPosition(foodElement,food);
    board.appendChild(foodElement);
}
function generateFood()
{
    const x = Math.floor((Math.random() * gridSize)) + 1;
    const y = Math.floor((Math.random() * gridSize)) + 1;
    return {x,y};
}
function move()
{
    const head = { ...snake[0] };
    switch(direction)
    {
        case 'right' :
                head.x++;
                break;
        case 'left' :
               head.x--;
               break;
        case 'up' :
                head.y--;
                break;
        case 'down' :
               head.y++;
               break;
    }
    snake.unshift(head);
    if(head.x === food.x && head.y === food.y)
    {
        food = generateFood();
        speedChanger();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        },gameDelay);
    }
    else
    {
        snake.pop();
    }
}
function startGame()
{
    startedGame = true;
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move() ;
         checkCollision () ;
        draw();
    },gameDelay);
}
function handleKeyPress(event)
    {
        if(!startedGame && event.code === 'Space' || !startedGame && event.key === ' ')
        {
            startGame();
        }
        else
        {
            switch(event.key)
            {
                case 'ArrowUp' :
                    direction = 'up';
                    break;
                case 'ArrowDown' :
                    direction = 'down';
                    break;
                case 'ArrowLeft' :
                    direction = 'left';
                    break;
                case 'ArrowRight' :
                    direction = 'right';
                    break;
            }
        }
    }
    document.addEventListener('keydown',handleKeyPress);
    function speedChanger()
    {   
        console.log(gameDelay);
        if(gameDelay >150)
        {
            gameDelay -= 15;
        }
    }
    function checkCollision()
    {
        const head = snake[0];
        if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize)
        {
            resetter();
        }
        for(let i = 1; i < snake.length; i++)
        {
            if(head.x === snake[i].x && head.y === snake[i].y)
            {
                resetter();
            }
        }
    }
    function resetter()
    {
        snake = [{x:10,y:10}];
        food = generateFood();
        direction = 'right';
        gameDelay = 200;
        updateScore();
    }
    function updateScore()
    {
        const currentScore = snake.length -1; 
        score.textContent = currentScore.toString().padStart(3,'0');
    }

