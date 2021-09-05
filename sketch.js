  // ALL VARIABLES 
  // tower
  var tower,towerImg;
  //doors 
  var door, doorImg, doorsGroup;
  //CLIMBERS 
  var climber, climberImg, climbersGroup;
  // creating Ghost 
  var ghost,ghostImg;
  // creating invisibleblock 
  var invisibleBlockGroup, invisibleBlock;
  // creating gamestates 
  var gameState = "PLAY";
  var spookySound
  
function preload(){
  //loading Images 
   towerImg = loadImage("tower.png"); 
   doorImg = loadImage("door.png");
   climberImg = loadImage("climber.png");
   ghostImg = loadImage("ghost-standing.png")
  //loading Sound 
  spookySound = loadSound("spooky.wav");
  // creating GROUPS 
   doorsGroup = new Group();
  // creating climbers GROUP 
  climbersGroup = new Group();
  
}

function setup(){
//creating canvas
  createCanvas(600,600);
  spookySound.loop();
  // creating tower 
  tower = createSprite(300,300,10,10);
  tower.addImage(towerImg);
  tower.velocityY = +1;
  
  //creating Ghost 
  ghost = createSprite(200,200,10,10);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  // creating invisibleBlock below the climber
  invisibleBlockGroup = new Group();
}


function draw(){
  //setting for background black  
    background("black");
  if(gameState === "PLAY"){
     // tower movement 
    if(tower.y >600){
         tower.y = 300;
  }
  
  //creating controls for Ghost 
  if(keyDown("space")){
    ghost.velocityY = -6; 
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x -3;
  }
   if(keyDown("right_arrow")){
    ghost.x = ghost.x +3;
  }
  //Adding gravity for ghost
  ghost.velocityY = ghost.velocityY + 0.1;
  
  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
  ghost.destroy();
    gameState = "END";
}
  
  spawnDoors();
  
  drawSprites();
  }
  
  if(gameState === "END"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
 
}


function spawnDoors(){ 
  //function for spawning doors 
  if(frameCount % 144 === 0 ) {
    door = createSprite(200, 50, 10, 10);
    door.x = random(160,450);
    door.velocityY = 3;
    door.addImage(doorImg);
    door.lifetime = 170; 
    doorsGroup.add(door);
    ghost.depth = door.depth;
    ghost.depth+=1
    
    
    
  // spawning the climbers 
    climber = createSprite(200,100,10,10);
    climber.addImage(climberImg);
    climber.velocityY = 3;
    climber.x = door.x;
    climber.lifetime = 170;  
    climbersGroup.add(climber);
    
    //creating invisible block 
    var invisibleBlock = createSprite(200,100);
    invisibleBlock.width = climber.width; 
    invisibleBlock.height = 2;
    
    invisibleBlock.x = door.x; 
    invisibleBlock.velocityY = 3;
    
    invisibleBlock.debug = true; 
    invisibleBlockGroup.add(invisibleBlock);
}
  
}