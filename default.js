var delay = 40;
var speed = 5;
var maxDY = 12;
var maxDX = 1;

var width = 100;
var height = 10;

var numPlatforms = 5;
var platforms = [];

var pointsPerRound = 5;
var points = 0;
var score;
var scoreBlock;
var instructions;
var instructions2;

var player;
var dy = 0;
var dx = 0;
var pressing = false;
var aKey = false;
var dKey = false;

var maxX = 370;
var minX = 0;

function start() {
    setup();
    setTimer(game, delay);
    keyDownMethod(e => {
        if (e.keyCode === Keyboard.letter('d')) {
            dKey = true;
        }
        if (e.keyCode === Keyboard.letter('a')) {
            aKey = true;
        }
    });
    keyUpMethod(e => {
        if (e.keyCode === Keyboard.letter('d')) {
            dKey = false;
        }
        if (e.keyCode === Keyboard.letter('a')) {
            aKey = false;
        }
    });
}
function setup() {
	setBackgroundColor(Color.white);
	player = new WebImage("https://codehs.com/uploads/edb03402760a6a5eef5c0a790e4a55a2");
	player.setSize(45, 50);
	player.setPosition(getWidth()/2, getHeight()/2);
	player.setColor(Color.blue);
	add(player);
	addPlatforms();
	scoreBlock = new Text("0");
	scoreBlock.setColor(Color.white);
	scoreBlock.setPosition(10, 30);
	add(scoreBlock);
	score = new Text("0");
	score.setColor(Color.black);
	score.setPosition(10, 30);
	add(score);
	instructions = new Text("Move side to side with 'a' and 'd', Don't touch the ground", "8pt Arial");
	instructions.setColor(Color.black);
	instructions.setPosition(110, 15);
	add(instructions);
	
	instructions2 = new Text("Dont touch the ceiling, Get 2k points to win!", "8pt Arial");
	instructions2.setColor(Color.black);
	instructions2.setPosition(110, 25);
	add(instructions2);
}
function game() {
    updateScore();
    if(points > 1995){
        win();
        return;
    }
    if(hitTopBottom()){
        lose();
        return;
    }
    var collider = getCollider();
    if(collider != null && collider != player){
        dy -= 30;
        if (dy < +maxDY) {
            dy = -maxDY;
        }
    }
    if (dKey) {
        if(collider != null && collider != player){
            dy -= 30;
            if (dy < +maxDY) {
                dy = -maxDY;
            }
        }
        dx += 1;
        dy += 0.5;
        if (dx < +maxDX) {
            dx = +maxDX;
        }
    }
    else if (aKey) {
        if(collider != null && collider != player){
            dy -= 30;
            if (dy < +maxDY) {
                dy = -maxDY;
            }
        }
        dx -= 1;
        dy += 0.5;
        if (dy < +maxDX) {
            dy = +maxDX;
        }
    }
    else {
        dy += 0.5;
        dx = 0;
        if(dx > maxDX){
            dx = maxDX;
        }
        if (dy > maxDY) {
            dy = maxDY;
        }
    }
    player.move(0, dy);
    player.move(dx, 0);
    movePlatforms();
    updatePlayerPosition(player.getX(), player.getY());
}
function updateScore(){
    points += pointsPerRound;
    scoreBlock.setText(points);
    score.setText(points);
}
function addPlatforms() {
    for(var i = 0; i < numPlatforms; i++){
        var platform = new Rectangle(width, height);
        platform.setColor(Color.green);
        platform.setPosition(Randomizer.nextInt(0, getWidth() - width), 0 + i * (getHeight()/numPlatforms));
        platforms.push(platform);
        add(platform);
    }
}
function movePlatforms() {
    for(var i = 0; i < platforms.length; i++){
        var platform = platforms[i];
        platform.move(0, speed);
        if(platform.getY() > 500) {
            platform.setPosition(Randomizer.nextInt(0, getWidth() - width), 0);
        }
    }
}
function updatePlayerPosition(newX, newY){
    if( newX < minX){ 
        newX = minX;
    }
    else if ( newX > maxX){
        newX = maxX;
    }
    player.setPosition(newX, newY)
}
function hitTopBottom(){
    var hitTop = player.getY() < 0;
    var hitBottom = player.getY() + player.getHeight() > getHeight();
    return hitBottom || hitTop;
}
function getCollider(){
    var topLeft = getElementAt(player.getX() - 1, player.getY() - 1);
    if(topLeft !=  null){
        return topLeft;
    }
    var topRight = getElementAt(player.getX() + player.getWidth() + 1, player.getY() - 1);
    if(topRight !=  null){
        return topRight;
    }       
    
    var bottomLeft = getElementAt(player.getX() - 1, player.getY() + player.getHeight() + 1);
    if(bottomLeft !=  null){
        return bottomLeft;
    }
    var bottomRight = getElementAt(player.getX() + player.getWidth() + 1, player.getY() + player.getHeight() + 1);
    if(bottomRight !=  null){
        return bottomRight;
    }   
    return null;
}
function lose(){
    stopTimer(game);
    var text = new Text("You Lose!");
    text.setColor(Color.red);
    text.setPosition(getWidth()/2 - text.getWidth()/2, getHeight()/2);
    add(text);
}
function win(){
    stopTimer(game);
    var text = new Text("You Win, you hit 2000 points!");
    text.setColor(Color.red);
    text.setPosition(getWidth()/2 - text.getWidth()/2, getHeight()/2);
    add(text);
}