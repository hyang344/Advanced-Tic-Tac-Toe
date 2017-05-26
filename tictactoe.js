//startup();
// 2D array to check which box is pressed
// BigBoxNum: SmallBoxNum
// only use index 1 to 9; index 0 is undefined
var box;
// value to see whether to draw O or X
var type = 0;
//
var CanvX = 540;
var CanvY = 540;
//
var BigBoxX = CanvX / 3;
var BigBoxY = CanvY / 3;
//
var SmallBoxX = BigBoxX / 3;
var SmallBoxY = BigBoxY / 3;
//
var prevBigBox = 0;
var prevSmallBox = 0;

var game;
var ctx;

function handleStart(evt) {
    evt.preventDefault();
    console.log("touchstart.");
    console.log("click count: " + evt.detail);
    console.log("click X: " + evt.screenX + " click Y: " + evt.screenY);
    
    drawOX(evt.screenX - 8, evt.screenY - 195 - 8);
}

// x & y position in canvas
function drawOX(x, y){
    console.log(x + " " + y);
    
    BigBoxNum = (Math.floor(x / BigBoxX) + 1) + 3 * (Math.floor(y / BigBoxY));
    SmallBoxNum = ((Math.floor(x / SmallBoxX) % 3 + 1) + 3 * (Math.floor(y / SmallBoxY) % 3));
    
    console.log("BigBoxNum: " + BigBoxNum + " SmallBoxNum: " + SmallBoxNum);
    
    // check whether it follows the rules
    if(BigBoxNum != prevSmallBox && prevSmallBox != 0)
        return;
    
    // check whether it is empty
    if (box[BigBoxNum][SmallBoxNum] != 0){
        return;
    }
    
    image = new Image(60, 60);
    if (type == 0){
        image.src = "Circle.gif";
        type = 1;
        box[BigBoxNum][SmallBoxNum] = 1;
        console.log("circle");
    } else {
        image.src = "X.gif";
        type = 0;
        box[BigBoxNum][SmallBoxNum] = 2;
        console.log("X");
    }

    console.log("drawing!!!");
    image.onload = function () {
        ctx.drawImage(image, x - x % 60 + 4, y - y % 60 + 4, 52, 52);
    };
    
    // erase previous rectangle 
    if (prevSmallBox != 0){
        ctx.strokeWidth = 5;
        ctx.strokeStyle="#000000";
        ctx.strokeRect((prevSmallBox - 1) % 3 * BigBoxX
                       , Math.floor((prevSmallBox - 1) / 3) * BigBoxY, BigBoxX,BigBoxY);
    }

    prevBigBox = BigBoxNum;
    if (box[SmallBoxNum][0] == 0){
        prevSmallBox = SmallBoxNum;
    }
    else{
        prevSmallBox = 0;
    }
    
    // draw the rectangle to tell the next user which box they should be in
    if (prevSmallBox != 0){
        ctx.strokeWidth = 5;
        ctx.strokeStyle="#00FF00";
        ctx.strokeRect((prevSmallBox - 1) % 3 * BigBoxX
                       , Math.floor((prevSmallBox - 1) / 3) * BigBoxY, BigBoxX,BigBoxY);
    }
    
    
    // checkwhether someone wins a small box
    if (checkWinBox(prevBigBox)){
        // if that box has been win and the next box is the same box, then the user
        // can use whatever box
        if (prevBigBox == prevSmallBox){
            ctx.strokeWidth = 5;
            ctx.strokeStyle="#000000";
            ctx.strokeRect((prevSmallBox - 1) % 3 * BigBoxX
                       , Math.floor((prevSmallBox - 1) / 3) * BigBoxY, BigBoxX,BigBoxY);
            prevSmallBox = 0;
        }
    }
    
}

function checkWinBox(prevBigBox){
    var i = prevBigBox;
    if (box[i][1] == box[i][2] && box[i][2] == box[i][3] && box[i][3] == 1 ||
        box[i][4] == box[i][5] && box[i][5] == box[i][6] && box[i][6] == 1 ||
        box[i][7] == box[i][8] && box[i][8] == box[i][9] && box[i][9] == 1 ||
        box[i][1] == box[i][4] && box[i][4] == box[i][7] && box[i][7] == 1 ||
        box[i][2] == box[i][5] && box[i][5] == box[i][8] && box[i][8] == 1 ||
        box[i][3] == box[i][6] && box[i][6] == box[i][9] && box[i][9] == 1 ||
        box[i][1] == box[i][5] && box[i][5] == box[i][9] && box[i][9] == 1 ||
        box[i][3] == box[i][5] && box[i][5] == box[i][7] && box[i][7] == 1 ){
        // circle wins
        
        image = new Image(CanvX / 3, CanvY / 3);
        image.src = "Circle.gif";
        
        console.log("circle wins one");

        console.log("drawing!!!");
        image.onload = function () {
            ctx.drawImage(image, (i - 1) % 3 * 180, 
                          Math.floor((i - 1) / 3) * 180, 180, 180);
        };
        
        box[i][0] = 1;
        
    }
    else if (box[i][1] == box[i][2] && box[i][2] == box[i][3] && box[i][3] == 2 ||
        box[i][4] == box[i][5] && box[i][5] == box[i][6] && box[i][6] == 2 ||
        box[i][7] == box[i][8] && box[i][8] == box[i][9] && box[i][9] == 2 ||
        box[i][1] == box[i][4] && box[i][4] == box[i][7] && box[i][7] == 2 ||
        box[i][2] == box[i][5] && box[i][5] == box[i][8] && box[i][8] == 2 ||
        box[i][3] == box[i][6] && box[i][6] == box[i][9] && box[i][9] == 2 ||
        box[i][1] == box[i][5] && box[i][5] == box[i][9] && box[i][9] == 2 ||
        box[i][3] == box[i][5] && box[i][5] == box[i][7] && box[i][7] == 2 ){
        // X wins
        
        image = new Image(CanvX / 3, CanvY / 3);
        image.src = "X.gif";
        
        console.log("X wins one");

        console.log("drawing!!!");
        image.onload = function () {
            ctx.drawImage(image, (i - 1) % 3 * 180, 
                          Math.floor((i - 1) / 3) * 180, 180, 180);
        };
        
        box[i][0] = 2;
    }
    else
        return false;
    
    checkWinGame();
    
    return true;
}

function checkWinGame(){
    if (box[1][0] == box[2][0] && box[2][0] == box[3][0] && box[3][0] == 1 ||
        box[4][0] == box[5][0] && box[5][0] == box[6][0] && box[6][0] == 1 ||
        box[7][0] == box[8][0] && box[8][0] == box[9][0] && box[9][0] == 1 ||
        box[1][0] == box[4][0] && box[4][0] == box[7][0] && box[7][0] == 1 ||
        box[2][0] == box[5][0] && box[5][0] == box[8][0] && box[8][0] == 1 ||
        box[3][0] == box[6][0] && box[6][0] == box[9][0] && box[9][0] == 1 ||
        box[1][0] == box[5][0] && box[5][0] == box[9][0] && box[9][0] == 1 ||
        box[3][0] == box[5][0] && box[5][0] == box[7][0] && box[7][0] == 1 ){
        console.log("Circle Wins!!!");
    }
    else if (box[1][0] == box[2][0] && box[2][0] == box[3][0] && box[3][0] == 2 ||
        box[4][0] == box[5][0] && box[5][0] == box[6][0] && box[6][0] == 2 ||
        box[7][0] == box[8][0] && box[8][0] == box[9][0] && box[9][0] == 2 ||
        box[1][0] == box[4][0] && box[4][0] == box[7][0] && box[7][0] == 2 ||
        box[2][0] == box[5][0] && box[5][0] == box[8][0] && box[8][0] == 2 ||
        box[3][0] == box[6][0] && box[6][0] == box[9][0] && box[9][0] == 2 ||
        box[1][0] == box[5][0] && box[5][0] == box[9][0] && box[9][0] == 2 ||
        box[3][0] == box[5][0] && box[5][0] == box[7][0] && box[7][0] == 2 ){
        console.log("X Wins!!!");
    }
    else
        return;
    
}

function drawLines(){
    for (var i = 1; i < 9; i++){
        ctx.beginPath();
        ctx.moveTo(i * SmallBoxX, 0);
        ctx.lineTo(i * SmallBoxX, CanvY);
        ctx.stroke();
        
        if (i == 3 || i == 6){
            for (var j = -2; j <= 2; j++){
                ctx.beginPath();
                ctx.moveTo(i * SmallBoxX + j, 0);
                ctx.lineTo(i * SmallBoxX + j, CanvY);
                ctx.stroke();
            }
        }
        
        ctx.beginPath();
        ctx.moveTo(0, i * SmallBoxY);
        ctx.lineTo(CanvX, i * SmallBoxY);
        ctx.stroke();
        
        if (i == 3 || i == 6){
            for (var j = -2; j <= 2; j++){
                ctx.beginPath();
                ctx.moveTo(0, i * SmallBoxY + j);
                ctx.lineTo(CanvX, i * SmallBoxY + j);
                ctx.stroke();
            }
        }
    }
    
}

// give all box value 0
function initBox() {
    box = new Array(10);
    for (var i = 1; i < 10; i++){
        box[i] = new Array(10);
    } 
    for (var i = 1; i < 10; i++){
        for (var j = 0; j < 10; j++){
            box[i][j] = 0;
        }
    }
}

function startup() {
    game = document.getElementsByTagName("canvas")[0];
    game.addEventListener("click", handleStart, false);
    ctx = canvas.getContext('2d');
    drawLines();
    initBox();
    console.log("initialized.");
}