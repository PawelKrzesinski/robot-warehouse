const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
const input = document.getElementById("input");

const row = 10;
const col = 10;
const sq = squareSize = 20;

const vacant = "white";
const crateCol = "brown"
const robotColour = "black"

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * sq, y * sq, sq, sq);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x * sq, y * sq, sq, sq)
}

//create a board
let board = [];
for (let r = 0; r < row; r++) {
    board[r] = [];
    for (let c = 0; c < col; c++) {
        board[r][c] = vacant;
    }
}

//draw the board
function drawBoard() {
    for (r = 0; r < row; r++) {
        for (c = 0; c < col; c++) {
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
function moveRobot() {
    input.addEventListener("keydown", () => {
        if (event.keyCode == 13) {
            const receivedCommands = input.value.split("");
            getDirection(receivedCommands)
            input.value = "";
        }
    });
}

moveRobot()

function Crate(x, y) {
    this.x = x;
    this.y = y;
    drawSquare(x, y, crateCol)
}
let crateArr = [];
function createCrates(coordinates) {
    crateArr = [...coordinates];
    crateArr.forEach(crate => {
        crate = new Crate(crate.x, crate.y)
    })
    return crateArr;
}
createCrates([{ x: 5, y: 5 }, { x: 9, y: 0 }]);




function getDirection(receivedCommands) {
    const commands = ["N", "S", "W", "E", "G", "D"];
    // Tidies up any whitespace
    receivedCommands.forEach((command, index) => {
        if (commands.includes(command)) {
            console.log("I got the direction", command);
            if (command === "N") {
                moveNorth();
            } else if (command === 'S') {
                moveSouth();
            } else if (command === 'W') {
                moveWest();
            } else if (command === 'E') {
                moveEast();
            } else if (command === 'G') {
                pickTheCrate();                
            } else if (command === 'D') {
                dropTheCrate()
            }
        } else {
            console.log(`Error! Got a wrong command: "${command}", needs tidying`);
            receivedCommands.splice(index, 1);
            console.log("Tidying up unwanted receivedCommands");
        }
    })
}

function moveNorth(){
    if (robot.y > 0) {
        robot.y -= 1;
        let wasOnCrate = crateArr.some(crate => crate.x == robot.x && crate.y == robot.y+1)
        let isOnCrate = crateArr.some(crate => crate.x == robot.x && crate.y == robot.y)
        if(isOnCrate){
            drawSquare(robot.x, robot.y, "chocolate");
            drawSquare(robot.x, robot.y+1, vacant);
        } else if(wasOnCrate){
            drawSquare(robot.x, robot.y, robot.color);
            drawSquare(robot.x, robot.y+1, crateCol);
        } else {
            drawSquare(robot.x, robot.y, robot.color);
            drawSquare(robot.x, robot.y+1, vacant);
        }
        crateArr.forEach(crate => {
            if(robot.lifting && crate.x == robot.x && crate.y == robot.y+1){
                crate.y -= 1;
                drawSquare(robot.x, robot.y + 1, vacant);
            }
        })
        console.log(crateArr);
    } else {
        console.log("Path blocked, you hit the wall");
        return false;
    }
}
function moveSouth(){
    if (robot.y < 9) {
        robot.y += 1;
        let wasOnCrate = crateArr.some(crate => crate.x == robot.x && crate.y == robot.y-1)
        let isOnCrate = crateArr.some(crate => crate.x == robot.x && crate.y == robot.y)
        if(isOnCrate){
            drawSquare(robot.x, robot.y, "chocolate");
            drawSquare(robot.x, robot.y-1, vacant);
        } else if(wasOnCrate){
            drawSquare(robot.x, robot.y, robot.color);
            drawSquare(robot.x, robot.y-1, crateCol);
        } else {
            drawSquare(robot.x, robot.y, robot.color);
            drawSquare(robot.x, robot.y-1, vacant);
        }
        crateArr.forEach(crate => {
            if(robot.lifting && crate.x == robot.x && crate.y == robot.y-1){
                crate.y += 1;
                drawSquare(robot.x, robot.y - 1, vacant);
            }
        })
        console.log(crateArr);
    } else {
        console.log("Path blocked, you hit the wall");
        return false;
    }
}
function moveWest(){
    if (robot.x > 0) {
        robot.x -= 1;
        let wasOnCrate = crateArr.some(crate => crate.x == robot.x+1 && crate.y == robot.y)
        let isOnCrate = crateArr.some(crate => crate.x == robot.x && crate.y == robot.y)
        if(isOnCrate){
            drawSquare(robot.x, robot.y, "chocolate");
            drawSquare(robot.x + 1, robot.y, vacant);
        } else if(wasOnCrate){
            drawSquare(robot.x, robot.y, robot.color);
            drawSquare(robot.x + 1, robot.y, crateCol);
        } else {
            drawSquare(robot.x, robot.y, robot.color);
            drawSquare(robot.x + 1, robot.y, vacant);
        }
        crateArr.forEach(crate => {
            if(robot.lifting && crate.x == robot.x+1 && crate.y == robot.y){
                crate.x -= 1;
                drawSquare(robot.x + 1, robot.y, vacant);
            }
        })
        console.log(crateArr);
    } else {
        console.log("Path blocked, you hit the wall");
        return false;
    }
}
function moveEast(){
    if (robot.x < 9) {
        robot.x += 1;
        let wasOnCrate = crateArr.some(crate => crate.x == robot.x-1 && crate.y == robot.y)
        let isOnCrate = crateArr.some(crate => crate.x == robot.x && crate.y == robot.y)
        if(isOnCrate){
            drawSquare(robot.x, robot.y, "chocolate");
            drawSquare(robot.x - 1, robot.y, vacant);
        } else if(wasOnCrate){
            drawSquare(robot.x, robot.y, robot.color);
            drawSquare(robot.x - 1, robot.y, crateCol);
        } else {
            drawSquare(robot.x, robot.y, robot.color);
            drawSquare(robot.x - 1, robot.y, vacant);
        }
        crateArr.forEach(crate => {
            if(robot.lifting && crate.x == robot.x-1 && crate.y == robot.y){
                crate.x += 1;
                drawSquare(robot.x - 1, robot.y, vacant);
            }
        })
        console.log(crateArr);
    } else {
        console.log("Path blocked, you hit the wall");
        return false;
    }
}





function pickTheCrate() {
    let isCratePresent = crateArr.some(crate => crate.x === robot.x && crate.y === robot.y)
    if(isCratePresent){
        console.log("Picking up a crate!");
        robot.lifting = true;
        robot.color = "darkgray";
        drawSquare(robot.x, robot.y, robot.color);
    } else {
        console.log("No crates to pick up!");
    }
}

function dropTheCrate() {
    crateArr.forEach(crate => {
        if (robot.lifting === true && crate.x === robot.x && crate.y === robot.y) {
            robot.color = robotColour;
            robot.lifting = false;
            drawSquare(robot.x, robot.y, crateCol)
        } else {
            console.log("You are not lifting anything!");
        }
    })
}



// The robot is equipped with a lifting claw which can be used to move crates around the warehouse. We track the locations of all the crates in the warehouse.
// Extend the robot's receivedCommands to include the following:
// G grab a crate and lift it
// D drop a crate gently to the ground
// There are some rules about moving crates:
// The robot should not try and lift a crate if it already lifting one
// The robot should not lift a crate if there is not one present
// The robot should not drop a crate on another crate!

// Add diagonal movements.