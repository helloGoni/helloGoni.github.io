var ctx;
var canvas;
var ballX;
var ballY;
var level;
var ballSize;
var ballSpeedX; // 공 관련 변수
var ballSpeedY;
var audio = new Audio('../img/ggang.mp3');
audio.volume = 0.1;
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
  ballSpeedX = 4;
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
  ballX -= ballSpeedX;
  ballY -= ballSpeedY;
  if(ballSpeedX<0){
  ballSpeedY -= 0.07;
  }
}

function drawScore() {
  var text = " Score : "+ score;
  var text2 = " 남은 기회 : "+outCount;
  ctx.font = '20px Calibri';
  ctx.fillText(text,50,110);
  ctx.fillText(text2,50,130);
}
function drawStart() {
  var text = "A키를 누르면 스윙!"
  ctx.font = '40px Calibri';
  ctx.fillText('A 키를 누르면 스윙!',50,110);
}
function gameStart() {
  outCount = 5;
  ballSpeedX= 4;
  ballSpeedY= 0;
  level = 4;
  score = 0;
  gamePlay = true;  
  window.requestAnimationFrame(game);
}


document.addEventListener("keydown",keyDownHandler,false);
function keyDownHandler(e) {
  if(e.keyCode==65) {
    pressed = true;
    setTimeout(function() {pressed=false;},250);
  }
}



function game(){
  draw();
  if (ballX<0 || ballX>700 || ballY < 0 )
  { 
    if (ballX<0) { outCount--; ballSpeedY=0;}    
    if (ballX>700) { ballSpeedX = (-ballSpeedX); ballSpeedX++; score++; ballSpeedY=0;}
    ballX=600; ballY=340;   
    level++;
    var random = Math.floor(Math.random() * level*0.5) +2;
    ballSpeedX = random;
  }
  
  if(pressed && ballX> 60 && ballX<90 && ballSpeedX>0 && ballY>325 && ballY<355){
    ballSpeedX = -(ballSpeedX+4);
    ballSpeedY = 3;
    audio.play();
  }
  if(outCount>0){
    window.requestAnimationFrame(game);
  }
  else{
    draw();
    ctx.font = '40px Calibri';
    ctx.fillText('Score : '+score,270,110);
  }
}



