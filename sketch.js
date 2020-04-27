var ball,img,paddle,restart;
var count=0;
var time=0;

var PLAY=1;
var gameState=PLAY;
var END=0;

function preload() {
  ballimg = loadImage("ball.png");
  paddleimg=loadImage("paddle.png")
  restartimg=loadImage("restart.jpg")
}
function setup() {
  createCanvas(400, 400);
  ball=createSprite(60,200,20,20);
  ball.addImage (ballimg); 
  ball.velocityX=9;  
  paddle=createSprite(350,200,20,100);
  paddle.addImage(paddleimg);
  restart=createSprite(190,220,20,100);
  restart.addImage(restartimg);
  restart.visible=false;
  restart.scale=0.4;

}

function draw() {
  background(205,153,0);
   background(200,150,150);
    fill("yellow");
  textSize(15);
  textFont("Comic Sans MS");
  text("Single Player Squash Game",100,30);
  
  textFont("Cooper Black");
  fill("blue");
  text("Score:" + count,20,380);
  text("Timer:" + time,320,380);
  
  fill("yellow");
  line(95,40,295,40);
  line(95,45,295,45);
  
  edges=createEdgeSprites();
  paddle.collide(edges);  
  
if(gameState===PLAY){
  
  //Bounce Off the Left Edge only
  ball.bounceOff(edges[0]); 
  
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  
  ball.bounceOff(paddle,explosion);
  
  if(keyDown(UP_ARROW))
  {
    paddle.y=paddle.y-20;
  }
  
  if(keyDown(DOWN_ARROW))
  {
    paddle.y=paddle.y+20;
  }
  
  if (ball.x>400){
    gameState=END;
  }
  
  if(mousePressedOver(restart)){
      reset();
    }
  
  if(frameCount%10===0){
  time=time +Math.round(getFrameRate()/30);
  }
  
}
  
  else if(gameState===END){
    ball.velocityX=0;
    paddle.velocityY=0;
    restart.visible=true;
    time=0;
    textFont("Algerian");
    fill("green");
    text("Game Over",150,200);

    if(mousePressedOver(restart)){
      reset();
    }
  }
  drawSprites();
  
}

function reset(){
  gameState=PLAY;
  restart.visible=false;
  ball.x=60;
  ball.y=200;
  ball.velocityX=9;  
  score=0;
}

function explosion(){
  count++
  ball.velocityY=random(-8,8);
}

