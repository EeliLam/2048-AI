let game, mode, prevMode
let gridWidth = 400
let gridHeight = 400
let scoreBarHeight = 50
let interfaceWidth = 250

// Setup neural network population
let popSize = 10
let nnGames = new Array(popSize) // The NN games that are not shown. Only played when NN is selected
let generation = 1
let meanScore = 0
let maxScore = 0

function setup() {
  canvas = createCanvas(gridWidth + interfaceWidth, gridHeight + scoreBarHeight)
  canvas.parent('sketch_holder')
  background(220)
  //noLoop()
  game = new Game(4, 4, scoreBarHeight)
  console.log(game.grid)

  setupInterface(gridWidth, scoreBarHeight, game)

  setMode('mc_search_tree')

  // Setup neural network population
  for (let i = 0; i < popSize; i++) {
    let newGame = new Game(4, 4, scoreBarHeight)
    nnGames[i] = newGame
  }

}

function draw() {
  background(220)
  game.showGame()
  showInterface(gridWidth, scoreBarHeight)

  mode = getMode()
  //console.log('mode', mode)

  switch (mode) {
    case 'mc_search_tree':
      game.AIControl = true
      runAIGame(game, getAIMoveMC)
      break
    case 'search_tree':
      game.AIControl = true
      runAIGame(game, getAIMoveSearchTree)
      break
    case 'neural_network':
      game.AIControl = true
      runAIGame(game, getAIMoveNN)

      // Run the rest of the population
      let gamesEnded = 0
      for (let i = 0; i < popSize; i++) {
        let nnGame = nnGames[i]
        if (!nnGame.gameEnded) {
          runAIGame(nnGames[i], getAIMoveNN)
        } else {
          gamesEnded += 1
        }
      }

      if (game.gameEnded && gamesEnded == popSize) {
        let scores = new Array(popSize)
        for (let i = 0; i < popSize; i++) {
          scores[i] = nnGames[i].score()
        }
        meanScore = (scores.reduce((a, b) => a + b, 0) + game.score()) / (popSize+1) // Include the game that is shown
        maxScore = max(max(scores), game.score())

        generation += 1
        newGeneration(game, nnGames)
      }

      textAlign(RIGHT)
      rectMode(CORNERS)
      text(`Generation ${generation}, players finished: ${gamesEnded}/${popSize}`, 0, 0, gridWidth-20, scoreBarHeight)
      textAlign(LEFT)
      text(`Mean score from previous generation: ${meanScore.toFixed()}\nMax score from previous generation: ${maxScore}`, gridWidth, 0, interfaceWidth, scoreBarHeight)

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
    rect(gridWidth/2, scoreBarHeight + gridHeight/2, 150, 50)

    fill(0)
    textAlign(CENTER)
    textSize(20)
    text('Game paused', gridWidth/2, scoreBarHeight + gridHeight/2)
  }

}

function keyPressed() {
  game.keyPressed()
  game.showGame()
  
  //console.log(game.grid)

  let prevents = [UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW, 32] // 32 is space bar
  if (prevents.includes(keyCode)) return false // Prevents default (arrow keys and space bar scrolling the page)

  return true
}



