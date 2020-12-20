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

function getAIMoveSearchTree(game) {
  let treeDepth = 5

  let bestMoveIdx = 0
  let bestAvgScore = 0
  let runsPerMove = 3

  for (let i = 0; i < 4; i++) {
    let avgScore = 0
    for (let j = 0; j < runsPerMove; j++) {
      let s = searchStep(game, treeDepth)
      if ((s - game.score()) < (bestAvgScore - game.score)*0.8) break
      avgScore += s
    }

    avgScore /= runsPerMove

    if (avgScore > bestAvgScore) {
      bestAvgScore = avgScore
      bestMoveIdx = i
    }
  }

  return bestMoveIdx
}

// Helper function for the tree search recursion
function searchStep(game, depth) {
  if (depth == 0 || game.gameEnded) return game.score()

  let clone = game.clone()
  let scores = [0, 0, 0, 0]
  for (let i = 0; i < 4; i++) {
    newAIMove(clone, i)
    scores[i] = searchStep(clone, depth-1)
  }

  return max(scores)
}

function getAIMoveNN(game) {
  let input = tf.tensor(game.grid.values).reshape([1, -1])
  input = tf.where(tf.equal(input, 0), tf.onesLike(input), input) // Convert zeros to ones to avoid NaN with log
  input = tf.log(input) // Natural log (could also be log 2)
  let output = game.neural_network.predict(input)
  let move = tf.argMax(output, axis=1).dataSync()[0]

  return move
}

function mutate(weightTensor) {
  let mutated = weightTensor.add(tf.randomNormal(weightTensor.shape, mean = 0, std = 0.1))
  //console.log(mutated.shape)
  return mutated
}

function newGeneration(game, nnGames) {
  let bestScore = 0
  let bestPlayer = 0

  for (let i = 0; i < nnGames.length; i++) {
    let score = nnGames[i].score()
    if (score > bestScore) {
      bestScore = score
      bestPlayer = i
    }
  }

  let bestPlayerLayers = nnGames[bestPlayer].neural_network.layers

  for (let i = 0; i < nnGames.length; i++) {
    //console.log(i)
    for (let layerIdx = 0; layerIdx < bestPlayerLayers.length; layerIdx++) {
      //console.log(layerIdx)
      let layer = nnGames[i].neural_network.layers[layerIdx]
      let weights = bestPlayerLayers[layerIdx].getWeights()

      let newWeights = [mutate(weights[0]), mutate(weights[1])]

      layer.setWeights(newWeights)
      //console.log(weights[layerIdx].shape)
    }
  }

  game.reset()
  for (let i = 0; i < nnGames.length; i++) {
    nnGames[i].reset()
  }
}