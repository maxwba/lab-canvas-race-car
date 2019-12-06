window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
};

const raceGame = {
  frames: 0,
  axisX: 1000,
  axisY: 1000,
  startMap: function() {
    const roadMap = document.getElementById("roadMap");
    roadMap.width = this.axisX;
    roadMap.height = this.axisY;
    ctx = roadMap.getContext("2d");
    ctx.fillStyle = `green`;
    ctx.fillRect(0, 0, roadMap.width, roadMap.height);
    ctx.beginPath();
    ctx.fillStyle = `gray`;
    ctx.fillRect(roadMap.width * 0.1, 0, roadMap.width * 0.8, roadMap.height);
    ctx.strokeStyle = "white";
    ctx.moveTo(roadMap.width * 0.15, 0);
    ctx.lineTo(roadMap.width * 0.15, roadMap.height);
    ctx.stroke();
    ctx.moveTo(roadMap.width * 0.85, 0);
    ctx.lineTo(roadMap.width * 0.85, roadMap.height);
    ctx.stroke();
    this.interval = setInterval(startGame, 20);
  },

  // Motor das coisa se atualizarem.
  clear: function() {
    this.ctx.clearRect(0, 0, this.roadMap.width, this.roadMap.height);
  },

  // Bloqueia o carro (Parte do game over)
  stop: function() {
    clearInterval(this.interval);
  }
};

// Criador de componentes.
class Component {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    // nova propriedade de velocidade.
    this.speedX = 0;
    this.speedY = 0;
  }

  // moviementacao das coisas
  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  // mostra onde estao as coisas
  update() {
    const roadMap = document.getElementById("roadMap");
    ctx = roadMap.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // colisao das coisas
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }

  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}

// Carro
const player = new Component(40, 70, "red", 400, 500);



//Movimentacao do carro
document.onkeydown = function(e) {
  switch (e.keyCode) {
    // case 38: // up arrow
    //   player.speedY -= 1;
    //   break;
    // case 40: // down arrow
    //   player.speedY += 1;
    //   break;
    case 37: // left arrow
      player.speedX -= 0.03;
      break;
    case 39: // right arrow
      player.speedX += 0.03;
      break;
  }
};

document.onkeyup = function(e) {
  player.speedX = 0;
  player.speedY = 0;
};

//Funcao que starta tudo
function startGame() {
  raceGame.startMap();
  player.newPos();
  player.update();
}

// const newCar = {
//   carX: roadMap.width / 2,
//   carY: roadMap.height / 2,
//   drawCar: function() {
//     ctx.beginPath();
//     ctx.fillStyle = `red`;
//     ctx.fillRect(this.carX, this.carY, 158, 319);
//   }
// };

// Funcao de start
// function updateGameArea() {
//   //Exempplos:
//   //     myGameArea.clear();
//   //     player.newPos();
//   //     player.update();
//   //     updateObstacles();
//   //     checkGameOver();
//   //     myGameArea.score();
// }

//   rect()	Creates a rectangle
// fillRect()	Draws a "filled" rectangle
// strokeRect()	Draws a rectangle (no fill)
// clearRect()	Clears the specified pixels within a given rectangle

// fill()	Fills the current drawing (path)
// stroke()	Actually draws the path you have defined
// beginPath()	Begins a path, or resets the current path
// moveTo()	Moves the path to the specified point in the canvas, without creating a line
// closePath()	Creates a path from the current point back to the starting point
// lineTo()	Adds a new point and creates a line to that point from the last specified point in the canvas
// clip()	Clips a region of any shape and size from the original canvas
// quadraticCurveTo()	Creates a quadratic Bézier curve
// bezierCurveTo()	Creates a cubic Bézier curve
// arc()	Creates an arc/curve (used to create circles, or parts of circles)
// arcTo()	Creates an arc/curve between two tangents
// isPointInPath()

// {
//   var myGameArea = {
//     canvas: document.createElement("canvas"),
//     frames: 0,
//     start: function() {
//       this.canvas.width = 480;
//       this.canvas.height = 270;
//       this.context = this.canvas.getContext("2d");
//       document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//       this.interval = setInterval(updateGameArea, 20);
//     },

//     clear: function() {
//       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     },

//     stop: function() {
//       clearInterval(this.interval);
//     },

//     score: function() {
//       var points = Math.floor(this.frames / 5);
//       this.context.font = "18px serif";
//       this.context.fillStyle = "black";
//       this.context.fillText("Score: " + points, 350, 50);
//     }
//   };

//   class Component {
//     constructor(width, height, color, x, y) {
//       this.width = width;
//       this.height = height;
//       this.color = color;
//       this.x = x;
//       this.y = y;
//       // new speed properties
//       this.speedX = 0;
//       this.speedY = 0;
//     }

//     newPos() {
//       this.x += this.speedX;
//       this.y += this.speedY;
//     }

//     update() {
//       var ctx = myGameArea.context;
//       ctx.fillStyle = this.color;
//       ctx.fillRect(this.x, this.y, this.width, this.height);
//     }

//     left() {
//       return this.x;
//     }
//     right() {
//       return this.x + this.width;
//     }
//     top() {
//       return this.y;
//     }
//     bottom() {
//       return this.y + this.height;
//     }

//     crashWith(obstacle) {
//       return !(
//         this.bottom() < obstacle.top() ||
//         this.top() > obstacle.bottom() ||
//         this.right() < obstacle.left() ||
//         this.left() > obstacle.right()
//       );
//     }
//   }

//   const player = new Component(30, 30, "red", 0, 110);
//   myGameArea.start();

//   document.onkeydown = function(e) {
//     switch (e.keyCode) {
//       case 38: // up arrow
//         player.speedY -= 1;
//         break;
//       case 40: // down arrow
//         player.speedY += 1;
//         break;
//       case 37: // left arrow
//         player.speedX -= 1;
//         break;
//       case 39: // right arrow
//         player.speedX += 1;
//         break;
//     }
//   };

//   document.onkeyup = function(e) {
//     player.speedX = 0;
//     player.speedY = 0;
//   };

//   function updateGameArea() {
//     myGameArea.clear();
//     player.newPos();
//     player.update();
//     updateObstacles();
//     checkGameOver();
//     myGameArea.score();
//   }

//   function updateObstacles() {
//     myGameArea.frames += 1;
//     for (i = 0; i < myObstacles.length; i++) {
//       myObstacles[i].x += -1;
//       myObstacles[i].update();
//     }
//     if (myGameArea.frames % 120 === 0) {
//       var x = myGameArea.canvas.width;
//       var minHeight = 20;
//       var maxHeight = 200;
//       var height = Math.floor(
//         Math.random() * (maxHeight - minHeight + 1) + minHeight
//       );
//       var minGap = 50;
//       var maxGap = 200;
//       var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
//       myObstacles.push(new Component(10, height, "green", x, 0));
//       myObstacles.push(
//         new Component(10, x - height - gap, "green", x, height + gap)
//       );
//     }
//   }

//   function checkGameOver() {
//     var crashed = myObstacles.some(function(obstacle) {
//       return player.crashWith(obstacle);
//     });

//     if (crashed) {
//       myGameArea.stop();
//     }
//   }
// }
