var game

function setup() {
  createCanvas(400, 450)
  background(255)
  //noLoop()
  game = new Game(4, 4)
  console.log(game.grid)
}

function draw() {
  background(220)
  game.showGrid()
  game.showScore()
  runAIGame(game, getAIMoveMC)
  //game.printGrid()
}

function keyPressed() {
  game.keyPressed()
  game.showGrid()
  game.showScore()
  //console.log(game.grid)

  //console.log(game.grid.operateRowToLeft([0,4,2,4]))
}


