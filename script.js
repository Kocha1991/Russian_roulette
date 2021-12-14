let countShot = 0;
let bulletPosition = random (1, 6); 
let btnShot = document.querySelector('#shot');
let currentPlayer = 1;
let baraban = document.querySelector('#baraban');

btnShot.onclick = start;

function start () {
    btnShot.className = 'off';
    let bullet = document.querySelector('#bullet');
        bullet.style.display = 'block';
    let revolver = document.querySelector('#revolver');
        revolver.style.display = 'block'; 
    
    btnShot.onclick = ''; 

    let rotate = 0;
    let timer = setInterval(function(){
        rotate += 10;
        baraban.style.transform = 'rotate('+rotate+'deg)';
        if(rotate > 300) {
            bullet.style.display = 'none';
        }
        if (rotate === 720) {
            clearInterval(timer);
            btnShot.innerText = 'Make a shot!';
            btnShot.onclick = shot;
            btnShot.className = '';
        }
    }, 10);
   
}

function random (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let rotateBaraban = 0;
function shot() {
    countShot += 1;

    if (bulletPosition === countShot) {
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
            rotationLeft ();
            currentPlayer = 1;
        }
        rotateBaraban += 60;
        let rotate = rotateBaraban;
        let timer = setInterval(function() {
            rotate += 1;
            baraban.style.transform = 'rotate('+rotate+'60deg)';
            if (rotate === rotateBaraban + 60) {
               clearInterval(timer);
               rotateBaraban = rotate;
           }
        }, 10);
        
    }    
}

let revolver = document.querySelector('#revolver');
function rotationRight () {
    revolver.style.background = 'url("/images/revolver-right.png")';
}
rotationRight();

function rotationLeft () {
    revolver.style.background = 'url("/images/revolver-left.png")';
}
rotationLeft();

function endGame () {
    btnShot.innerText = 'Restart';
    btnShot.onclick = restart   ;
    alert ('Game Over!');
}

function restart () {
    location.reload();
}
