var database ,dog,dog1,dog2
var position

var feed,add
var foodObject
var Feedtime
var lastFeed


function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	
}

function setup() {
	createCanvas(700, 700);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("Feed the dog")
  feed.position(600,100)
  feed.mousePressed(FeedDog)
  add = createButton("Add food")
  add.position(400,100)
  add.mousePressed(AddFood)


} 

function draw(){
 background(46,139,87);

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);


 fedtime=database.ref('FeedTime')
 fedtime.on("value",function(data){ lastFed=data.val(); });
 if(lastFed>=12)
 {
   text("Last Fed :" + lastFed%12 + "PM", 150,100);
 }else if(lastFed ===0 )
 {
   text("Last Feed : 12 AM" , 150,100)
 }else
 {
   text("Last Feed :" + lastFed + "AM", 150,100);
 }

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}