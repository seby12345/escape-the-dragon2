var PLAY = 1;
var END = 0;
var gamestate = PLAY;


var explorer;
var explorerImage;
var dragon, dragonImage;
var backgroundImage;
var invisibleGround;
var background;
var obstacle1Image;
var obstacle2Image;
var score=0;
var whiteBox;
var whiteBoxImage;
var ledge1;
var ledge2;
var restartButton;
var restartButtonImage;
var obstaclesGroup,obstacle1,obstacle2;

function setup() {
createCanvas(800,400);

bk = createSprite(400,200,800,400);
bk.addImage(backgroundImage);
bk.scale = 2.3;
bk.velocityX = 3;
edges = createEdgeSprites();
whiteBox = createSprite(760,25);
whiteBox.addImage(whiteBoxImage);
whiteBox.scale = .13
ledge1 = createSprite(705,25, 20, 120)
ledge2 = createSprite(755, 80, 120, 20)

restartButton = createSprite(400,200);
restartButton.addImage(restartButtonImage);
restartButton.scale = 0.5
restartButton.visible = false;

dragon = createSprite(638,270,50,50);
dragon.addImage(dragonImage);
dragon.scale = 0.7;


explorer = createSprite(250,200,20,20);
explorer.addImage(explorerImage);
explorer.scale = 0.44

obstaclesGroup = new Group();

}

function preload() {
dragonImage = loadImage("dragon.png");
backgroundImage = loadImage("bk.jpg");
obstacle1Image = loadImage("redfireball.png");
obstacle2Image = loadImage("bluefire.png");
whiteBoxImage = loadImage("whitebox.jpg");
explorerImage = loadImage("explorer.png");
restartButtonImage = loadImage("restart.png");


}

function spawnObstacles() {
    if(frameCount % 55 == 0) {
        obstacle1 = createSprite(500, dragon.y, 100 , 35);
        obstacle1.addImage(obstacle1Image);
        obstacle1.scale = .3
        obstacle1.velocityX = -3.5;
        obstacle1.lifetime = 220;
    }
    if(frameCount % 125 == 0) {
        obstacle2 = createSprite(600, dragon.y, 100 , 35);
        obstacle2.addImage(obstacle2Image);
        obstacle2.scale = .3
        obstacle2.velocityX = -10;
        obstacle2.lifetime = 220;
    }
}



function draw() {
background(0);
spawnObstacles();



    if(gameState = PLAY) {
        if(bk.x > 480){
            bk.x = bk.width/2
        }
        
        if(keyDown("w")){
            explorer.y = explorer.y - 8;
        }
        
        
        
        
        
        if(keyDown("s")) {
            explorer.y = explorer.y + 8;
        }
        score = score + Math.round(getFrameRate()/60);
        explorer.collide(edges);
        
        
        dragon.y = explorer.y
        
        
        if(obstaclesGroup.isTouching(explorer)){
            gameState = END;
        }

    }

    else if(gameState===END){
        restartButton.visible = true; 

        dragon.changeAnimation("end", restartButton);

        if(mousePressedOver(restartButton)){
            reset();
        }
    }




drawSprites();
text("Score: " + score,725,50);
text("Lives:",725,25)






}


function reset(){
    gameState = PLAY;
    restartButton.visible = false;
    obstaclesGroup.destroy();

    
   
    score = 0;

}

