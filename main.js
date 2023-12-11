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
    color: "purple"
};

let objects = []; // Array to hold multiple objects

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;


// Draw function
window.addEventListener("load", draw);

function draw() {
    // Calculate the offset for the camera to follow the player
    let cameraX = player.x - cnv.width / 2;
    let cameraY = player.y - cnv.height / 2;

    // Ensure the camera doesn't go out of bounds
    if (cameraX < 0) {
        cameraX = 0;
    } else if (cameraX > cnv.width - player.w) {
        cameraX = cnv.width - player.w;
    }

    if (cameraY < 0) {
        cameraY = 0;
    } else if (cameraY > cnv.height - player.h) {
        cameraY = cnv.height - player.h;
    }

    // Clear the canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Move the player
    let playerMoved = false; // Flag to check if the player has moved

    if (rightPressed && !checkCollision(player.x + player.speed, player.y)) {
        player.x += player.speed;
        playerMoved = true;
    } else if (leftPressed && !checkCollision(player.x - player.speed, player.y)) {
        player.x -= player.speed;
        playerMoved = true;
    } else if (upPressed && !checkCollision(player.x, player.y - player.speed)) {
        player.y -= player.speed;
        playerMoved = true;
    } else if (downPressed && !checkCollision(player.x, player.y + player.speed)) {
        player.y += player.speed;
        playerMoved = true;
    }
    

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // Draw and manage other objects
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

        // Check for collision with player
        if (
            player.x < obj.x + obj.w &&
            player.x + player.w > obj.x &&
            player.y < obj.y + obj.h &&
            player.y + player.h > obj.y
        ) {
            // Collision detected! Stop the player
            playerMoved = false;
        }
    }

    if (!playerMoved) {
        // Reset movement flags to stop the player
        rightPressed = false;
        leftPressed = false;
        upPressed = false;
        downPressed = false;
    }

    requestAnimationFrame(draw);
}

// Function to check collision at a specific position
function checkCollision(x, y) {
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        if (
            x < obj.x + obj.w &&
            x + player.w > obj.x &&
            y < obj.y + obj.h &&
            y + player.h > obj.y
        ) {
            return true; // Collision detected at this position
        }
    }
    return false; // No collision at this position
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
        upPressed = true;
    } else if (e.code === "ArrowDown") {
        downPressed = true;
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

// Example: Adding objects to the array
let obj1 = {
    x: 100,
    y: 100,
    w: 20,
    h: 20,
    color: "blue"
};

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

objects.push(obj1);
objects.push(topWall);
objects.push(bottomWall);
objects.push(rightWall);
objects.push(leftWall);
