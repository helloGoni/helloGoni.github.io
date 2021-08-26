var ctx;
var canvas;
var ballX;
var ballY;
var level;
var ballSize;
var ballSpeedX; // 공 관련 변수
var ballSpeedY;
var audio = new Audio('../img/ggang.mp3');
audio.volume = 0.15;

var audio2 = new Audio('../img/wow.mp3');
audio2.volume = 0.06;

var backgroundImage = new Image();
backgroundImage.src = "../img/background.jpg";

var batter1 = new Image();
batter1.src = "../img/batter1.png"; // 타자 대기이미지 변수
var batter2 = new Image();
batter2.src = "../img/batter2.png"; //타자 휘두르는중!
var batter3 = new Image();
batter3.src = "../img/batter3.png"; //타자 휘두르기 끝남!
var pitcher = new Image();
pitcher.src="../img/pitcher.png"; //투수 대기이미지 변수
var score = 0;
var outCount;
var gamePlay = false;
var pressed = false;
var swing = 0;
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
  drawBackground();
  drawBatter();
  drawPitcher();
  drawBall();
  update();

  drawScore();
}
function drawBackground() {
  ctx.save();
  ctx.globalAlpha = 0.4;
  ctx.drawImage(backgroundImage,0,0);
  ctx.restore();

}
function drawBatter() {
  (pressed?
    ctx.drawImage(batter2,30,310,80,100)
    :ctx.drawImage(batter1,30,300,50,100));
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
    if (ballX<0) { outCount--; ballSpeedY=0;}    // 못 쳤음

    if (ballX>700) { ballSpeedX = (-ballSpeedX); ballSpeedX++; score++; ballSpeedY=0; //
      if(ballY<30) { score++; audio2.play();} //홈런치면 스코어 3점
      if(ballY<100) { score++; } //약간 더 밑이면 스코어 +2점
      if(ballY<200) { score++;} //약간 더 밑이면 스코어 +1점
    }
    ballX=600; ballY=340;   
    level++;
    var random = Math.floor(Math.random() * level*0.5) +2;
    ballSpeedX = random;
    ballSpeedY = 0;
  }
  //쳤는지 확인!
  if(pressed && ballX> 60 && ballX<90 && ballSpeedX>0 && ballY>325 && ballY<355){
    ballSpeedX = -(ballSpeedX+5);
    var random1 = Math.floor(Math.random()*5)+3;
    ballSpeedY = random1;
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



