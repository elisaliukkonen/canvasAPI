var Pallot = [];
var Pisteet;
var pisteluku = 0;

function startGame() {
    Pisteet = new component("20px", "Consolas", "black", 580, 40, false, "text");
    Pisteet.text = "Pisteet: 0";
    myGameArea.start();  
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function everyinterval(n) {
    return (myGameArea.frameNo / n) % 1 === 0;
}

function component(width, height, color, x, y, isCircle = false, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.text = "";
    this.isCircle = isCircle;

    this.update = function() {
        var ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = this.color;
            if (this.isCircle) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
                ctx.fill();
            } else {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    }
}

function isOverlapping(x, y, Pallot, alue) {
    for (let i = 0; i < Pallot.length; i++) {
        let dx = Pallot[i].x - x;
        let dy = Pallot[i].y - y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < alue * 2) {
            return true;
        }
    }
    return false;
}

function updateGameArea() {
    myGameArea.clear();   
    myGameArea.frameNo += 1;

    if (myGameArea.frameNo == 1 || everyinterval(Math.floor(Math.random() * 30) + 20)) {
        let radius = 10;
        let maxTries = 200;

        for (let n = 0; n < Math.random() * 3; n++) {
            let tries = 0;
            while (tries < maxTries) {
                let x = Math.random() * (800 - 2 * radius) + radius;
                let y = radius;
                if (!isOverlapping(x, y, Pallot, radius)) {
                    let väri = Math.random() < 0.5 ? "red" : "green";
                    Pallot.push(new component(20, 20, väri, x, y, true));
                    break;
                }
                tries++;
            }
        }
    }

    for (let i = Pallot.length - 1; i >= 0; i--) {
        Pallot[i].y += 2;
        Pallot[i].update();

        if (Pallot[i].y > myGameArea.canvas.height - Pallot[i].width / 2) {
            if (Pallot[i].color === "red") {
            }
            if (Pallot[i].color === "green") {  
            }
            Pallot.splice(i, 1); 
        }
    }

    Pisteet.text = "Pisteet: " + pisteluku;
    Pisteet.update();
}
