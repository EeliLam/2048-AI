class Game {
  constructor(rows, cols, scoreBarHeight) {
    this.rows = rows
    this.cols = cols

    this.w = 400
    this.h = 400
    this.tileWidth = this.w / rows

    this.scoreHeight = scoreBarHeight

    this.AIControl = true
    this.paused = false

    this.grid = new Grid(this.rows, this.cols, this.tileWidth)
    this.moves = this.grid.moves

    this.gameEnded = false

    // Init neural network
    let model = tf.sequential() // Architecture [16, 16, 16, 4]
    model.add(tf.layers.dense({units: 16, inputShape: 16, batchSize: 1, activation: 'sigmoid'}))
    //model.add(tf.layers.dense({units: 16, activation: 'sigmoid'}))
    model.add(tf.layers.dense({units: 4, activation: 'softmax'}))
    this.neural_network = model

  }

  clone() {
    let newGame = new Game(this.rows, this.cols)
    newGame.grid.values = Array.from(this.grid.values)
    newGame.grid.score = this.grid.score

    return newGame
  }

  reset() {
    this.grid.reset()
    this.gameEnded = false
  }

  pause() {
    this.paused = !this.paused
  }

  score() {
    return this.grid.score
  }

  showGame () {
    this.showGrid()
    this.showScore()
  }

  showScore() {
    fill(255)
    rect(0, 0, width, this.scoreHeight)
    textSize(20)
    textAlign(LEFT, CENTER)
    fill(0)
    text('Score: ' + this.score(), 10, this.scoreHeight/2)
  }

  showGrid () {
    //console.log('drawing')

    let colors = [color(255), color(100), color(0, 255, 0), color(0, 0, 255), color(255, 0, 0)]
    rectMode(CORNER)

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const value = this.grid.values[i][j]
        const x = this.tileWidth * j
        const y = this.tileWidth * i + this.scoreHeight

        let color
        if (value == 0) {
          color = 255
        } else {
          let inter = map(log(value), 0, 12, 0, colors.length-1)
          //console.log('inter', inter)
          color = lerpColors(colors, inter)
        }
        
        fill(color)
        rect(x, y, this.tileWidth, this.tileWidth, 10)

        if (value != 0) {
          fill(0)
          textSize(30)
          textAlign(CENTER, CENTER)
          text(value, x + this.tileWidth/2, y + this.tileWidth/2)
        }
      }
    }
    
  }

  keyPressed() {
    if (!this.AIControl && !this.paused) {
      let moved = false
      switch (keyCode) {
        case RIGHT_ARROW:
          moved = this.grid.moveRight()
          break
        case LEFT_ARROW:
          moved = this.grid.moveLeft()
          break
        case UP_ARROW:
          moved = this.grid.moveUp()
          break
        case DOWN_ARROW:
          moved = this.grid.moveDown()
          break
      }

      if (moved) this.grid.addTile()
    } 
    
    if (keyCode == 32) { // Space bar
      this.pause()
    }

    switch (key) {
      case 'k':
        this.pause()
        break
      case 'r':
        this.reset()
        break
    }
  }
}