const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
const input = document.getElementById("input");

const row = 10;
const col = 10;
const sq = squareSize = 20;

const vacant = "white";
const crateCol = "brown"
const robotColour = "black"

function drawSquare(x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x*sq, y*sq, sq, sq);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*sq, y*sq, sq, sq)
}

//create a board
let board = [ ];
for(let r = 0; r < row; r++){
    board[r] = [ ];
    for(let c = 0; c < col; c++){
        board[r][c] = vacant;
    }
}

//draw the board
function drawBoard(){
    for(r = 0; r < row; r++){
        for(c = 0; c < col; c++){
            drawSquare(c, r, board[r][c])
        }
    }
}
drawBoard();

//initialise robot object
let robot = {
    "x": 3,
    "y": 3,
    "color": robotColour,
    "lifting": false
}
//Draw the robot on the grid
drawSquare(robot.x, robot.y, robot.color)

//Function for robot's movement
function moveRobot(){
    input.addEventListener("keydown", () => {
        if(event.keyCode == 13){
            const commands = input.value.split("");
            getDirection(commands)
            input.value = "";
        }
    });
    
}

moveRobot()

function getDirection(commands){
    const directions = ["N", "S", "W", "E"];
	// Tidies up any whitespace
    commands.forEach((command, index) => {
        if(directions.includes(command)){
            console.log("I got the direction", command);
            if(command === "N"){
                if (robot.y > 0){
                    drawSquare(robot.x, robot.y, vacant);
                    robot.y -= 1;
                    checkIfNotVacant()
                    drawSquare(robot.x, robot.y, robot.color);
                } else {
                    return false;
                }
            } else if(command === 'S'){
                if (robot.y < 9){
                    drawSquare(robot.x, robot.y, vacant);
                    robot.y += 1;
                    checkIfNotVacant()
                    drawSquare(robot.x, robot.y, robot.color);
                } else {
                    return false;        
                }
            } else if(command === 'W'){
                if (robot.x > 0){
                    drawSquare(robot.x, robot.y, vacant);
                    robot.x -= 1;
                    checkIfNotVacant()
                    drawSquare(robot.x, robot.y, robot.color);
                } else {
                    return false;
                }
            } else if(command === 'E'){
                if (robot.x < 9){
                    drawSquare(robot.x, robot.y, vacant);
                    robot.x += 1;
                    
                    checkIfNotVacant()
                    drawSquare(robot.x, robot.y, robot.color);
                } else {
                    return false;
                }
            }
        } else {
            console.log(`Error! Got a wrong command: "${command}", needs tidying`);
            commands.splice(index, 1);
            console.log("Tidying up unwanted commands");
        }
        //something here
    })

}

function Crate(x, y){
    this.x = x;
    this.y = y;
    drawSquare(x, y, crateCol)
}
let crateArr = [];
function createCrates(coordinates){
    crateArr = [...coordinates];
    
    crateArr.forEach( crate => {
        crate = new Crate(crate[0], crate[1])
    })
    return crateArr;
}
createCrates([[5, 5], [9, 0]]);

function checkIfNotVacant(){
    crateArr.forEach( crate => {
        if(robot.x === crate[0] && robot.y === crate[1]){
            alert("there is a crate here!")
        }
    })
}

function pickTheCrate(){
    robot.color = "darkgray";
    robot.lifting = true;
}


// The robot is equipped with a lifting claw which can be used to move crates around the warehouse. We track the locations of all the crates in the warehouse.
// Extend the robot's commands to include the following:
// G grab a crate and lift it
// D drop a crate gently to the ground
// There are some rules about moving crates:
// The robot should not try and lift a crate if it already lifting one
// The robot should not lift a crate if there is not one present
// The robot should not drop a crate on another crate!

// Add diagonal movements.