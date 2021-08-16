var ctx;
var ballX;
var ballY;
var ballSize;
var ballSpeed; // 공 관련 변수
var batter1 = new Image();
batter1.src = "../img/batter1.png"; // 타자 대기이미지 변수
var batter2 = new Image();
batter2.src;
var pitcher = new Image();
pitcher.src="../img/pitcher.png"; //투수 대기이미지 변수
var score = 0;
var outCount;
var gamePlay = false;
var pressed = false;

function init() {
  ballX = 600;
  ballY = 340;
  ballSize = 5;
  ballSpeed = 1;
  ctx = document.getElementById("gameCanvas").getContext("2d");
}

function draw() {

  ctx.clearRect(0,0,700,400);
  drawBatter();
  drawPitcher();
  if (gamePlay==true) {
    drawBall();
    update();
  }
}

function drawBatter() {
  ctx.drawImage(batter1,30,300,50,100);
}


function drawPitcher() {
  ctx.drawImage(pitcher,600,330,80,76);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX,ballY,ballSize,0, Math.PI*2, true);
  ctx.fillStyle="red";
  ctx.fill();
  ctx.closePath();
}

function update() {
  ballX -= ballSpeed;
  if(ballX < 0 )
  {
    outCount--;
  }
}

function gameStart() {
  outCount = 3;
  gamePlay = true;
  if(outCount = 0) {
    gamePlay = false;
  }
  if(pressed){
    ballSpeed = -ballSpeed;
  }
  window.requestAnimationFrame(game);
}


document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(e) {
  if(e.keyCode==32) {
    pressed = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 32){
    pressed = false;
  }
}


function game(){
  draw();

  window.requestAnimationFrame(game);
}

function startMenu(){
  drawBatter();
  drawPitcher();
}
