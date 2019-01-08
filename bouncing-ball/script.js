const ball = document.querySelector('.ball');

const second = 1000;
const frameRate = 25;
const intervalTime = second/frameRate;
const smoothness = 15;
const tIncrement = 1/smoothness;
const g = 9.81;
const dessipation = 0.7;

let hPrevious = h = H = 300;
let t = 0;
let v_0 = v = 0;
let blur = 0;
let isMovable = false;
let isMoving = false;
let scaleY = 1;
let startPositionX = startPositionY = 0;
let positionX = 0;
let interval;

initPosition();
setTimeout(throwBall, 100);

ball.addEventListener('mousedown', handleDown);
window.addEventListener('mouseup', handleUp);
window.addEventListener('mousemove', handleMove);

function initPosition() {
  ball.style.transform = `translate(${positionX}px, ${-h}px) scaleY(${scaleY})`;
}

function throwBall() {
  isMovable = false;
  ball.classList.remove('holdable');

  interval = setInterval(() => {
    h = H + v_0*t - g*t**2/2;

    if (h < 0) {
      v_0 = v*dessipation;
      h = 0;
      H = 0;
      t = 0;

      // scaleY = (90 - v_0/3)/90;
      // setTimeout(() => {
      //   scaleY = 1;
      // }, 30);

      if (v_0 < tIncrement) {
        clearInterval(interval);
        isMovable = true;
        ball.classList.add('holdable');
      }
    } else {
      t += tIncrement;
    }

    ball.style.transform = `translate(${positionX}px, ${-h}px) scaleY(${scaleY})`;

    // blur = v*tIncrement/2;
    // ball.style.filter = `blur(${blur}px)`;

    v = (hPrevious - h)/tIncrement;
    hPrevious = h;
  }, intervalTime*tIncrement);
}

function handleDown(e) {
  if (isMovable) {
    isMoving = true;
    ball.classList.add('holding');
    startPositionX = e.screenX;
    startPositionY = e.screenY;
    startBallPositionX = positionX;
  }
}

function handleUp() {
  if (isMoving) {
    isMoving = false;
    ball.classList.remove('holding');
    throwBall();
  }
}

function handleMove(e) {
  if (isMoving) {
    const deltaX = e.screenX - startPositionX;
    const deltaY = e.screenY - startPositionY;
    positionX = startBallPositionX + deltaX;
    if (deltaY > 0) deltaY = 0;
    ball.style.transform = `translate(${positionX}px, ${deltaY}px)`;
    hPrevious = h = H = -deltaY;
  }
}