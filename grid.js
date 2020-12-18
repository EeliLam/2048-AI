class Grid {
  constructor(rows, cols, tileWidth, scoreHeight) {
    this.rows = rows
    this.cols = cols
    this.tileWidth = tileWidth

    this.score = 0

    this.values = new Array(rows).fill(0).map(() => new Array(cols).fill(0))
    this.moves = [this.moveUp, this.moveRight, this.moveDown, this.moveLeft]

    this.addTiles(2)
  }

  /*printGrid() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        console.log(this.grid[i][j].value)
        console.log(' ')
      }
      console.log('\n')
    }
    console.log('\n')
  }*/

  /*showGrid() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j].show()
      }
    }
  }*/

  addTile() {
    let row = Math.floor(Math.random() * this.rows)
    let col = Math.floor(Math.random() * this.cols)
    /*console.log('row:', row)
    console.log('col', col)
    console.log('grid: ', this.grid)
    console.log(this.grid[row][col])
    console.log(this.grid[row][col].value)*/
    while (true) {
      //print('adding tile')
      let value = this.values[row][col]
      if (value == 0) {
        let v = Math.random() < 0.9 ? 2 : 4
        this.values[row][col] = v
        this.score += v
        return
      } else {
        row += 1
        if (row == this.rows) {
          row = 0
          col += 1
          col %= this.cols
        }
      }
    }
  }

  addTiles(n) {
    for (let i = 0; i < n; i++) {
      this.addTile()
    }
  }

  rotateRight () {
    const newGrid = new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(0))
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        newGrid[j][this.rows - i - 1] = this.values[i][j]
      }
    }
    const temp = this.cols
    this.cols = this.rows
    this.rows = temp
    this.values = newGrid
  }

  rotateNTimes(n) {
    for (let i = 0; i < n; i++) {
      this.rotateRight()
    }
  }

  moveRight() {
    this.rotateNTimes(2)
    const moved = this.moveLeft()
    this.rotateNTimes(2)
    return moved
  }

  moveUp() {
    this.rotateNTimes(3)
    const moved = this.moveLeft()
    this.rotateRight()
    return moved
  }

  moveDown() {
    this.rotateRight()
    const moved = this.moveLeft()
    this.rotateNTimes(3)
    return moved
  }

  /*moveRight() {
    let moved = false
    let visited = new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(false))
    //console.log(visited)

    for (let i = 0; i < this.rows; i++) {
      for (let j = this.cols - 2; j >= 0; j--) {
        const tile = this.grid[i][j]
        if (tile.value == 0) {
          continue
        }

        let colIdx = j + 1
        while (colIdx < this.cols) {
          const targetTile = this.grid[i][colIdx]
          if (targetTile.value == tile.value && !visited[i][colIdx]) {
            targetTile.value *= 2
            visited[i][colIdx] = true
            tile.value = 0
            moved = true
            
            break

          } else if (targetTile.value != 0 && colIdx != j + 1) {
            this.grid[i][colIdx-1].value = tile.value
            tile.value = 0
            moved = true

            break

          } else if (colIdx == this.cols - 1 && targetTile.value == 0) {
            moved = true
            targetTile.value = tile.value
            tile.value = 0
          }

          colIdx++
        }
      }
    }

    return moved

  }*/

  moveLeft() {
    let moved = false

    for (let i = 0; i < this.rows; i++) {
      let row = this.values[i]
      let copy = Array.from(row)
      let newRow = this.operateRowToLeft(row)
      this.values[i] = newRow

      //console.log(newRow)

      // Check if the row has changed
      if (!moved) {
        for (let j = 0; j < this.cols; j++) {
          if (copy[j] != newRow[j]) {
            moved = true
            break
          }
        }
      }
    }

    return moved
  }

  operateRowToLeft(row) {
    let filtered = row.filter(value => value != 0)
    let newRow = Array(row.length).fill(0)

    /*let k = 0
    for (let j = 0; j < filtered.length - 1; j++) {
      if (filtered[j] == filtered[j+1]) {
        newRow[k] = 2*filtered[j]
        j += 1
        k += 1
      }
    }*/

    let j = 0
    let k = 0
    while (j < filtered.length) {
      if (j < filtered.length && filtered[j] == filtered[j+1]) {
        newRow[k] = 2*filtered[j]
        j += 2
        this.score += newRow[k]
      } else {
        newRow[k] = filtered[j]
        j += 1
      }
      k += 1
    }

    //if (j == filtered.length + 1) newRow[k] = filtered[filtered.length-1]
    
    //while (newRow.length < this.cols) newRow.push(0)

    return newRow
  }

}