let countShot = 0; 
let btnShot = document.querySelector('#shot');
let currentPlayer = 1;
let baraban = document.querySelector('#baraban');

btnShot.onclick = start;

function start () {
    disableButton();
    
    let bullet = document.querySelector('#bullet');
        bullet.style.display = 'block';
    let revolver = document.querySelector('#revolver');
        revolver.style.display = 'block'; 

    let rotate = 0;
    let timer = setInterval(function(){
        rotate += 10;
        rotateBaraban(rotate);
        if(rotate > 300) {
            bullet.style.display = 'none';
        }
        if (rotate === 720) {
            clearInterval(timer);
            btnShot.innerText = 'Make a shot!';
            enableButton(shot);
        }
    }, 50);
   
}

function random (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function shot() {
    disableButton();
    let barabanPosition = 0;
    countShot++;
    
    const bulletPosition = random (1, 6);

    const winPosition = countShot <= 6 ? countShot : countShot % 6;

    if (bulletPosition === winPosition) {
        let blood = document.createElement('div');
            blood.id = 'blood';
            blood.className = `player${currentPlayer}`;
        let player = document.querySelector('#player'+currentPlayer);
            player.appendChild(blood);
        endGame();
    } else {
        
        if (currentPlayer === 1){
            rotationRight();
            currentPlayer = 2;
        } else {
            rotationLeft();
            currentPlayer = 1;
        }
        barabanPosition += 60;
        let rotate = barabanPosition;
        let timer = setInterval(function() {
            rotate += 10;
            rotateBaraban(rotate);

            if (rotate === barabanPosition + 300) {
                clearInterval(timer);
                barabanPosition = rotate;
                enableButton(shot);
           }
        }, 50);
        
    }   
}

function enableButton(onclick) {
    btnShot.onclick = onclick;
    btnShot.className = '';
}

function disableButton() {
    btnShot.className = 'off';
    btnShot.onclick = '';
}

let revolver = document.querySelector('#revolver');
function rotationRight () {
    revolver.style.background = 'url("./images/revolver-right.png")';
}

function rotationLeft () {
    revolver.style.background = 'url("./images/revolver-left.png")';
}

function rotateBaraban(rotate) {
    baraban.style.transform = `rotate(${rotate}deg)`;
}

function endGame () {
    rotateBaraban(0); // reset bullet position
    let bullet = document.querySelector('#bullet');
        bullet.style.display = 'block';

    btnShot.innerText = 'Restart';
    enableButton(restart);
    alert ('Game Over!');
}

function restart () {
    location.reload();
}
