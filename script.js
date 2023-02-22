let start = document.querySelector('.start');
let h1 = document.querySelector('h1');
let main = document.querySelector('.game');
let ball = document.querySelector('.ball');
let platform = document.querySelector('.platform');
let platformPosition = 0;
let game = false;
let windowInnerWidth = window.innerWidth;
let windowInnerHeight = window.innerHeight;
let speed = 1;
let score = 0;

start.addEventListener('click', () => {
    startGame();
});

var keyState = {};

window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);

window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

function gameLoop() {
    if (keyState[37] || keyState[65]){
        if(platformPosition > -(windowInnerWidth / 2) + 150){
            platformPosition -= 5;
        }
    }

    if (keyState[39] || keyState[68]){
        if(platformPosition < (windowInnerWidth / 2) - 150){
            platformPosition += 5;
        }
    }
    
    platform.style.transform = `translateX(${platformPosition}px)`;
    
    setTimeout(gameLoop, 10);
}

function endGame(){
    start.classList.remove('display_none');
    h1.classList.remove('display_none');
    game = false;
    ball.style = '';
    start.innerHTML = 'Заново';
    h1.innerHTML = `Ты проиграл со счетом ${score}, лашара`;
}
                                   
function animate (angle, direction, previousLeft, previousTop){
    let sinAngle = Math.sin(angle);
    let cosAngle = Math.cos(angle);
    let left;
    let top;
    let futureDirection;
    if (direction == 'top right'){
        if ((previousLeft + (70 + windowInnerHeight * .9) * sinAngle) > (windowInnerWidth / 2 - 20)){
            left = (windowInnerWidth / 2) - 20;
            top = (70 - windowInnerHeight * .9) + cosAngle * (left - previousLeft);
            futureDirection = 'top left';
        } else {
            left = previousLeft + (70 + windowInnerHeight * .9) * sinAngle;
            top = 70 - windowInnerHeight * .9;
            futureDirection = 'bottom right';
        }
        score++;
        h1.innerHTML = `Счет: ${score}`;
    } else if (direction == 'bottom right'){
        if ((previousLeft + (70 + windowInnerHeight * .9) * sinAngle) > (windowInnerWidth / 2 - 20)){
            left = (windowInnerWidth / 2) - 20;
            top = (70 - windowInnerHeight * .9) + cosAngle * (left - previousLeft);
            futureDirection = 'bottom left';
        } else {
            left = previousLeft + (70 + windowInnerHeight * .9) * sinAngle;
            top = 0;
            futureDirection = 'top right';
        }
    } else if (direction == 'bottom left'){
        if (-(previousLeft - (70 + windowInnerHeight * .9) * sinAngle) > (windowInnerWidth / 2 - 20)){
            left = -(windowInnerWidth / 2) + 20;
            top = (70 - windowInnerHeight * .9) - cosAngle * (left - previousLeft);
            futureDirection = 'bottom right';
        } else {
            left = previousLeft - (70 + windowInnerHeight * .9) * sinAngle;
            top = 0;
            futureDirection = 'top left';
        }
    } else if (direction == 'top left') {
        if (-(previousLeft - (70 + windowInnerHeight * .9) * sinAngle) > (windowInnerWidth / 2 - 20)){
            left = -(windowInnerWidth / 2) + 20;
            top = (70 - windowInnerHeight * .9) - cosAngle * (left - previousLeft);
            futureDirection = 'top right';
        } else {
            left = previousLeft - (70 + windowInnerHeight * .9) * sinAngle;
            top = 70 - windowInnerHeight * .9;
            futureDirection = 'bottom left';
        }
        score++;
        h1.innerHTML = `Счет: ${score}`;
    }
    let animationDuration = Math.sqrt(Math.pow((left - previousLeft), 2) + Math.pow((top - previousTop), 2)) / speed;
    let animation = ball.animate([
        {transform: `translate(${left}px, ${top}px)`}
    ], {
        duration: animationDuration
    });

    animation.addEventListener('finish', () => {
        ball.style.transform = `translate(${left}px, ${top}px)`;
        if(top == 0){
            if(left < (platformPosition - 150) || left > (platformPosition + 150)){
                ball.style.backgroundColor = 'red';
                setTimeout(endGame, 1000);
            } else {
                animate(angle, futureDirection, left, top);
            }
        } else{
            animate(angle, futureDirection, left, top);
        }
    })
}

function startGame (){
    start.classList.add('display_none');
    main.classList.remove('display_none');
    game = true;
    animate(.3, 'top right', 0, 0);
    gameLoop();
    ball.style.transform = 'translate(0, 0)';
    platform.style.transform = `translateX(0)`;
    platformPosition = 0;
    score = 0;
    h1.innerHTML = `Счет: ${score}`;
};