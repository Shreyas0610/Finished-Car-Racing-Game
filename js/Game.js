class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];

    car1.addImage(car1Image);
    car2.addImage(car2Image);
    car3.addImage(car3Image);
    car4.addImage(car4Image);

  }

    displayRanks(){
      camera.position.x = 0;
      camera.position.y = 0;
      Player.getPlayerInfo();
      textAlign(CENTER);
      textSize(50);


      for(var plr in allPlayers){
        console.log(allPlayers[plr]);
         if(allPlayers[plr].rank===1){
          text("First " + allPlayers[plr].name,0,85);
        }
        else if(allPlayers[plr].rank===2){
          text("Second " + allPlayers[plr].name,displayWidth/4,displayHeight/9);
        }
        else if(allPlayers[plr].rank===3){
          text("Third " + allPlayers[plr].name,displayWidth/-4,displayHeight/10);
        }
        else if(allPlayers[plr].rank===4){
          text("Honorable Mention " + allPlayers[plr].name,0,225)
        }
      }
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getcarsatEnd();

    if(allPlayers !== undefined){
      //var display_position = 100;
      background("#c68767");
      image(groundImage,0,-displayHeight*5,displayWidth,displayHeight*7);
      image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 300;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 250;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        

        if (index === player.index){
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          }
        
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    
    if(player.distance>4000){
       gameState = 2;

       player.rank += 1
       Player.updatecarsatEnd(player.rank);

    }


    drawSprites();
  }


    end(){
      console.log(player.rank);

  }
}

