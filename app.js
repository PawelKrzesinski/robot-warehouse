// Add controls to the robot so we can control it
// Make a grid 10 x 10
// Create a way to send a series of commands to the robot
// Make sure that the robot doesn't try to move outside the warehouse

const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
const input = document.getElementById("input");



const row = 10;
const col = 10;

const sq = squareSize = 20;
const vacant = "white";
const crate = "brown";
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

let robot = {
    "x": 3,
    "y": 3,
    "color": robotColour
}

drawSquare(robot.x, robot.y, robot.color)


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
    commands.forEach((command, index) => {
        if(command === " "){
            commands.splice(index, 1);
        }
    })
    commands.forEach(command => {
        if(command === "N"){
            console.log("I got the direction", command)
            drawSquare(robot.x, robot.y, vacant)
            robot.y -= 1;
            drawSquare(robot.x, robot.y, robot.color)
        } else if(command === 'S'){
            console.log("I got the direction", command)
            drawSquare(robot.x, robot.y, vacant)
            robot.y += 1;
            drawSquare(robot.x, robot.y, robot.color)
        } else if(command === 'W'){
            console.log("I got the direction", command)
            drawSquare(robot.x, robot.y, vacant)
            robot.x += 1;
            drawSquare(robot.x, robot.y, robot.color)
        } else if(command === 'E'){
            console.log("I got the direction", command)
            drawSquare(robot.x, robot.y, vacant)
            robot.x -= 1;
            drawSquare(robot.x, robot.y, robot.color)
        } else {
            console.log("error");
        }
    })

}























// Part two
// The robot is equipped with a lifting claw which can be used to move crates around the warehouse. We track the locations of all the crates in the warehouse.

// Model the presence of crates in the warehouse. Initially one is in the centre and one in the north-east corner.

// Extend the robot's commands to include the following:

// G grab a crate and lift it
// D drop a crate gently to the ground
// There are some rules about moving crates:

// The robot should not try and lift a crate if it already lifting one
// The robot should not lift a crate if there is not one present
// The robot should not drop a crate on another crate!

// Add diagonal movements.