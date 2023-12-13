// Simple Platformer

// Setup canvas variables
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global variables
let player = {
    x: 310,
    y: 300,
    w: 30,
    h: 30,
    speed: 10,
    gravitySpeed: 0,
    color: "purple"
};

let objects = []; // Array to hold multiple objects
// Example: Adding objects to the array

let topWall = {
    x: 0,
    y: 0,
    w: 800,
    h: 40,
    color: "green"
};

let bottomWall = {
    x: 0,
    y: 560,
    w: 800,
    h: 40,
    color: "green"
};

let rightWall = {
    x: 0,
    y: 0,
    w: 40,
    h: 630,
    color: "green"
};

let leftWall = {
    x: 760,
    y: 0,
    w: 40,
    h: 630,
    color: "green"
};

let obj8 = {
    x: 100,
    y: 480,
    w: 200,
    h: 20,
    color: "blue"
};

let obj9 = {
    x: 350,
    y: 400,
    w: 200,
    h: 20,
    color: "blue"
};

let obj10 = {
    x: 140,
    y: 310,
    w: 200,
    h: 20,
    color: "blue"
};

let obj11 = {
    x: 440,
    y: 240,
    w: 200,
    h: 20,
    color: "blue"
};

objects.push(topWall);
objects.push(bottomWall);
objects.push(rightWall);
objects.push(leftWall);
objects.push(obj8);
objects.push(obj9);
objects.push(obj10);
objects.push(obj11);


let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let gravity = 0.5


// Draw function
window.addEventListener("load", draw);

function draw() {
    // ---------------- LOGIC ---------------------

    // Move Player Vertically
    player.gravitySpeed += gravity
    player.y += player.gravitySpeed
    if (player.gravitySpeed > 0) {
        checkCollision("down");
    } else {
        checkCollision("up");
    }

    

    // Move Player Horizontally
    if (rightPressed) {
        player.x += player.speed;
        checkCollision("right");
    } else if (leftPressed) {
        player.x -= player.speed;
        checkCollision("left");
    } 


    // --------------- DRAWING ----------------------
    // Clear the canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // Draw and manage other objects
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    }



    requestAnimationFrame(draw);
}

// Function to check collision at a specific position
function checkCollision(dir) {
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        if (rectCollide(player, obj)) {
            if (dir === "left") {
                player.x = obj.x + obj.w;
            } else if (dir === "right") {
                player.x = obj.x - player.w;
            } else if (dir === "down") {
                player.y = obj.y - player.h;
                player.gravitySpeed = 0;
            } else if (dir === "up") {
                player.y = obj.y + obj.h;
                player.gravitySpeed = 0;
            }
        }
    }
}

function rectCollide(rect1, rect2) {
    return rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x && rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y;    
}

// ... (Event handlers and object creation remain the same)


// Event handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(e) {
    if (e.code === "ArrowLeft") {
        leftPressed = true;
    } else if (e.code === "ArrowRight") {
        rightPressed = true;
    } else if (e.code === "ArrowUp") {
        player.gravitySpeed = -10;
    } 
}

function keyupHandler(e) {
    if (e.code === "ArrowLeft") {
        leftPressed = false;
    } else if (e.code === "ArrowRight") {
        rightPressed = false;
    } else if (e.code === "ArrowUp") {
        upPressed = false;
    } else if (e.code === "ArrowDown") {
        downPressed = false;
    }
}
