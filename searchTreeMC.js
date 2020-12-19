function runAIGame(game, newMoveAlgorithm) {
  if (!game.gameEnded && game.AIControl && !game.paused) {
    let move = newMoveAlgorithm(game)
    newAIMove(game, move)
  }
}

function newAIMove(game, moveIdx, moveCount=0) {
  if (moveCount >= 4) {
    game.gameEnded = true
    return
  }

  let moved
  switch (moveIdx) {
    case 0:
      moved = game.grid.moveUp()
      break
    case 1:
      moved = game.grid.moveRight()
      break
    case 2:
      moved = game.grid.moveDown()
      break
    case 3:
      moved = game.grid.moveLeft()
      break
  }

  if (moved) {
    game.grid.addTile()
    return
  } else {
    newAIMove(game, (moveIdx+1)%4, moveCount + 1)
  }
}

function getAIMoveMC(game) {
  let runs = 100
  let scores = [0, 0, 0, 0]
  for (let initMove = 0; initMove < 4; initMove++) {
    for (let i = 0; i < runs; i++) {
      let cloneGame = game.clone()

      newAIMove(cloneGame, initMove)
      while(!cloneGame.gameEnded) {
        let randomMove = Math.floor(random(4))
        newAIMove(cloneGame, randomMove)
      }
      scores[initMove] += cloneGame.score()
    }
  }

  return argMax(scores)
}