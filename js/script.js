const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const score = document.querySelector('.score');

const defaultPipeRightPosition = -80;
const defaultCloudsRightPosition = -550;

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

document.addEventListener('keydown', jump);

function startGame() {
    const startGameElement = document.querySelector('.start-game');
    startGameElement.remove();

    let level = 1;
    
    const loop = setInterval(() => {
        const pipeLeftPosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
        if (pipeLeftPosition <= 120 && pipeLeftPosition > 0 && marioPosition < 110) {
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            
            mario.src = './images/game-over.png';
            mario.style.width = '72px';
            mario.style.marginLeft = '50px';
            
            clearInterval(loopScore);
            clearInterval(loopAnimation);
            clearInterval(loop);

            document.querySelector('.game-board').innerHTML += '<button class="start-game" type="button" onclick="document.location.reload(true)"><span class="text-start-game">Recarregar</span></button>';
        }
    }, 10);
    
    function pipeAnimation() {
        const pipeLeftPosition = pipe.offsetLeft;
        const pipeRightPosition = +window.getComputedStyle(pipe).right.replace('px', '');
        
        if (pipeLeftPosition <= -80) {
            pipe.style.right = `${defaultPipeRightPosition}px`;
        } else {
            pipe.style.right = `${pipeRightPosition + 10}px`;
        }
    }
    
    function cloudsAnimation() {
        const cloudsLeftPosition = clouds.offsetLeft;
        const clouldsRightPosition = +window.getComputedStyle(clouds).right.replace('px', '');
        
        if (cloudsLeftPosition <= -550) {
            clouds.style.right = `${defaultCloudsRightPosition}px`;
        } else {
            clouds.style.right = `${clouldsRightPosition + 1}px`;
        }
    }
    
    function setTimeLevel() {
        return 15 - level;
    }
    
    function animations() {
        pipeAnimation();
        cloudsAnimation();
    }
    
    let loopAnimation = setInterval(animations, 15);
    
    const loopScore = setInterval(() => {
        let scoreNumber = +score.textContent;
        score.textContent = (++scoreNumber).toString();
    
        if (scoreNumber >= level * 100) {
            clearInterval(loopAnimation);
            level++;
            loopAnimation = setInterval(animations, setTimeLevel());
        }
    }, 50);
    
}