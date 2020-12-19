let game, mode, prevMode
let gridWidth = 400
let gridHeight = 400
let scoreBarHeight = 50
let interfaceWidth = 250

function setup() {
  canvas = createCanvas(gridWidth + interfaceWidth, gridHeight + scoreBarHeight)
  canvas.parent('sketch_holder')
  background(220)
  //noLoop()
  game = new Game(4, 4, scoreBarHeight)
  console.log(game.grid)

  setupInterface(gridWidth, scoreBarHeight)

  setMode('mc_search_tree')

}

function draw() {
  background(220)
  game.showGame()

  mode = getMode()
  //console.log('mode', mode)

  switch (mode) {
    case 'mc_search_tree':
    case 'search_tree':
    case 'neural_network':
      game.AIControl = true
      runAIGame(game, getAIMoveMC)
      break
    case 'manual':
      game.AIControl = false
      break
  }

  if (game.paused) {
    fill(0, 0, 0, 100)
    rectMode(CORNER)
    rect(0, scoreBarHeight, gridWidth, gridHeight)

    fill(255)
    rectMode(CENTER)
    rect(gridWidth/2, scoreBarHeight + gridHeight/2, 230, 60)

    fill(0)
    textAlign(CENTER)
    text('Game paused\nPress space to continue', gridWidth/2, scoreBarHeight + gridHeight/2)
  }

  //game.printGrid()

}

function keyPressed() {
  game.keyPressed()
  game.showGame()
  
  //console.log(game.grid)

  //console.log(game.grid.operateRowToLeft([0,4,2,4]))
}



