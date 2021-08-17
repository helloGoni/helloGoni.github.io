var ctx;
var canvas;
var ballX;
var ballY;
var ballSize;
var ballSpeed; // 공 관련 변수
var batter1 = new Image();
batter1.src = "../img/batter1.png"; // 타자 대기이미지 변수
var batter2 = new Image();
batter2.src = "../img/batter2.png";
var pitcher = new Image();
pitcher.src="../img/pitcher.png"; //투수 대기이미지 변수
var score = 0;
var outCount;
var gamePlay = false;
var pressed = false;
var swing = false;
function init() {
  ballX = 600;
  ballY = 340;
  ballSize = 5;
  ballSpeed = 1;
  canvas = document.getElementById("gameCanvas")
  ctx = canvas.getContext("2d");
}

function draw() {
  ctx.clearRect(0,0,700,400);
  drawBatter();
  drawPitcher();
  drawBall();
  update();

  drawScore();
}

function drawBatter() {
  (pressed?ctx.drawImage(batter2,30,310,80,100):ctx.drawImage(batter1,30,300,50,100));
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
}

function drawScore() {
  var text = " Score : "+outCount;
  ctx.font = '20px Calibri';
  ctx.fillText(text,50,110);
}
function drawStart() {
  var text = "A키를 누르면 스윙!"
  ctx.font = '40px Calibri';
  ctx.fillText('A 키를 누르면 스윙!',50,110);
}
function gameStart() {
  outCount = 3;
  gamePlay = true;  
  window.requestAnimationFrame(game);
}


document.addEventListener("keydown",keyDownHandler,false);
//document.addEventListener("keyup",keyUpHandler,false);
function keyDownHandler(e) {
  if(e.keyCode==65) {
    pressed = pressed?false:true;
  }
}
/*function keyUpHandler(e) {
  if(e.keyCode == 32){
    pressed = false;
  }
}*/


function game(){
  outCount=3;
  draw();
  if (ballX<0 || ballX>700)
  {    
    ballX=600;    
    ballSpeed = 1;
  }
  if(pressed && ballX> 0 && ballX<100){
    ballSpeed = -3;
  }

  if(outCount>0){
    window.requestAnimationFrame(game);
  }
}



