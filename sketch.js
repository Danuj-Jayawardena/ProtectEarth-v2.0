var backgroundImage;
var jet, jetImage;
var bullet, bulletImage;

var asteroid, asteroidImage;

var score = 0
var lives = 2

function preload() {

  backgroundImage = loadImage("assets/background.jpg");
  
  jetImage = loadImage("assets/jet.png")

  bulletImage = loadImage("assets/bullet.png")

  asteroidImage = loadImage("assets/asteroid.png")

  restartImage = loadImage("assets/reset.png")

  gameOverImage = loadImage("assets/gg.png")

}

function setup() {
  createCanvas(windowWidth, windowHeight - 1)

  bg = createSprite(width / 2, height / 2)
  bg.addImage(backgroundImage)
  bg.scale = 1.8

  jet = createSprite(width - 750, height - 98)
  jet.addImage(jetImage)
  jet.scale = 0.2

  asteroidGroup = createGroup();
  bulletGroup = createGroup()

  leftSide = createSprite(0 , height/2 , 1, height)
  leftSide.visible = false

  rightSide = createSprite(width , height/2 , 1 , height)
  rightSide.visible = false

  bottomSide = createSprite(width/2 , height-10 , width , 10)
  bottomSide.visible = false

}

function draw() {
  background(0);

  drawSprites();

  if (keyDown("left")) {
    jet.x = jet.x + -15
  }

  if (keyDown("right")) {
    jet.x = jet.x + 15
  }

  createAsteroids();

  if (keyWentDown("space")) {
    createBullets()
  }


  if(asteroidGroup.isTouching(bulletGroup)) {
    for(var i = 0; i < asteroidGroup.length; i++) {
      if(asteroidGroup[i].isTouching(bulletGroup)) {
        asteroidGroup[i].destroy()
        bulletGroup.destroyEach() 
        score += 10
      }
    }
  }


  if(asteroidGroup.isTouching(bottomSide)  ) {
    for(var i = 0; i < asteroidGroup.length; i++) {
      if(asteroidGroup[i].isTouching(bottomSide)) {
        asteroidGroup[i].destroy()
       lives -= 1
      }
    }
  }

  if(lives <= 0){

    gameOver = createSprite(width/2 , height/2)
    gameOver.addImage(gameOverImage)
    gameOver.scale = 0.7


    restart = createSprite(width/2 , height/2 + 150)
    restart.addImage(restartImage)
    restart.scale = 0.5

    asteroidGroup.destroyEach()
    bulletGroup.destroyEach()
    jet.destroy()

    textSize(24)
    fill("yellow")
    textFont("verdana")
    text("Click RESET to try again" , width/2 - 165 , height/2 + 270)  

    if(mousePressedOver(restart)){
      location.reload()
    }

  }

  jet.collide(leftSide)
  jet.collide(rightSide)



  textSize(30)
  fill("purple")
  textFont("verdana")
  text("Score : " + score , 50 , 60)

  textSize(30)
  fill("purple")
  textFont("verdana")
  text("Lives : " + lives , width-200 , 60)

 
}

function createAsteroids() {
  if (frameCount % 90 == 0) {
    asteroid = createSprite(round(random(30, windowWidth - 30)), round(random(10, height - 700)))
    asteroid.velocityY = 6
    asteroid.scale = 1.4
    asteroid.addImage(asteroidImage)
    asteroidGroup.add(asteroid)
  }
}



function createBullets( ) {

  bullet = createSprite(jet.x, jet.y - 80)
  bullet.velocityY = -(score/100 + 6)
  bullet.scale = 0.03
  bullet.addImage(bulletImage)
  bulletGroup.add(bullet)

}
