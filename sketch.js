var play = 1;
var end = 0;
var gamestate = 1;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(650,600);
  
  monkey = createSprite(100,550,20,20)
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(200,550,5000,10);
  ground.velocityX = -4;
  ground.x = ground.width /2;

  
  bananasGroup = createGroup();
  obstaceGroup = createGroup();
   
  Score = 0;
  
}

function draw() {
  background("lightgreen");
  
  text("Score:"+ Score,300,100)
  if(gamestate === play)
    {
      if(ground.x < 0)
  {
   ground.x = ground.width /2;
  }
      
      if(keyDown("space")&& monkey.y >= 300)
    {
     monkey.velocityY = -12;
    }
      
      monkey.velocityY = monkey.velocityY + 0.8
  
       monkey.collide(ground);
  
     if(bananasGroup.isTouching(monkey))
    {
      bananasGroup.destroyEach();
      Score = Score + 1;
    }
      if(obstaceGroup.isTouching(monkey))
        {
          gamestate = end;
        }
      
    }
  else if(gamestate === end)
  {
    if(obstaceGroup.isTouching(monkey))
      {
      textSize(35)
      fill("red")
      text("gameOver?",250,300)
      monkey.setVelocityX(2,-2);
      obstaceGroup.setVelocityX(-2,2);
      bananasGroup.setVelocityX(2,-2);
      }
  }
  
  
  fruit();
  obstacle();
  
  drawSprites();
}
 
function fruit()
{
  if (frameCount % 60 === 0) 
    {
      var banana = createSprite(500,450,20,10)
      banana.y = Math.round(random(80,400))
      banana.addImage(bananaImage)
      banana.scale = 0.1;
      banana.velocityX = -9;
      bananasGroup.add(banana);
    }
}
  


function obstacle()
{
  if(frameCount % 60 === 0)
    {
      var stone = createSprite(300,520) 
      stone.addImage(obstaceImage );
      stone.scale = 0.2;
      stone.x =Math.round(random(300,600))
      stone.velocityX = -9;
      obstaceGroup.add(stone)
    }
  
}




