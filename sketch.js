var spaceship;
var spaceshipImg;
var asteroid;
var asteroidImg;
var canvas;
var laser;
//var laserImg;
var laserGroup;
var asteroidGroup;
var score=0;
//var bottomEdge;

function preload(){
spaceshipImg = loadImage("spaceship.png");
asteroidImg = loadImage("asteroid.png");
//laserImg = loadImage("laser.png");
}

function setup(){
canvas = createCanvas(1000,800);

spaceship = createSprite(145,650,50,50);
spaceship.addImage(spaceshipImg);
spaceship.scale=0.2;

laserGroup = new Group();
asteroidGroup = new Group();

//bottomEdge = createSprite(100,800,1000,1)
}

function draw(){

  background("black");

  var edges;
  edges = createEdgeSprites();
  spaceship.bounceOff(edges);
  
  mousePressed();
  createAsteroids();
  touchControl();

  drawSprites();

  textSize(20);
  text("Score : "+score,10,25);
}

function mousePressed(){

  if(keyDown("RIGHT_ARROW")){
    console.log("yay");
    spaceship.x+=15;
  }
  
  if(keyDown("LEFT_ARROW")){
    console.log("yay2");
    spaceship.x-=15;
  }

  if(keyDown("SPACE")){
    console.log("yay3");
    laser = createSprite(spaceship.x,spaceship.y,10,15);
    //laser.addImage(laserImg);
    laser.velocityY-=30;
    laser.shapeColor="white";
    laser.lifetime=100;

    laserGroup.add(laser);

    spaceship.depth=laser.depth;
    spaceship.depht+=1;
    
  
    if(score%100==0){
    laser.shapeColor="red";
   }
  }

}

function createAsteroids(){

  if(frameCount%60===0){
    asteroid = createSprite(Math.round(random(140,750)),1,50,50);
    asteroid.addImage(asteroidImg);
    asteroid.velocityY+=6;
    asteroid.scale = 0.2;
    asteroidGroup.add(asteroid);
    asteroid.lifetime=150;
    spaceship.depth=asteroid.depth;
    spaceship.depth+=1;
  }
}

function touchControl(){
 
  if(asteroidGroup.isTouching(laserGroup)){
    asteroidGroup.destroyEach();
    laserGroup.destroyEach();
    score+=5;
  }
}