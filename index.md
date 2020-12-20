---
---

# Three different AIs for the game 2048

<div id="sketch_holder" style="position:relative">
    <script type="text/javascript" src="sketch.js"></script>
    <script type="text/javascript" src="game.js"></script>
    <script type="text/javascript" src="grid.js"></script>
    <script type="text/javascript" src="helpers.js"></script>
    <script type="text/javascript" src="ai.js"></script>
    <script type="text/javascript" src="interface.js"></script>
    
    <script src="libraries/p5.min.js"></script>
    <script src="libraries/p5.sound.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js"></script>
</div>

## How the AI works

The classic search tree algorithm works by looking five moves ahead and at each step, selecting the move that leads to the path to the highest score. In contrast, the Monte Carlo (MC) variant plays at each step 100 games randomly until they are finished, for each of the four initial moves. The initial move with the highest average score is chosen. Essientally, the classic algorithm explores the complete search tree but only five steps deep, while the MC algorithm samples only a small portion of random subtrees, but explores them all the way to the bottom.

The neural network is a simple fully connected one, with the game state as its input and the four possible moves as its output, that attempts to learn the game with an evolutionary strategy. In each generation, 10 independent players play the game until all of them are finished. Then, the best-performing player is selected, and the link weights for the players in the next generation are determined by randomly mutating the weights of the best player from the previous generation.

Out of these three implementations, the MC search tree is by far the best one. It reaches the 2048 block most of the time and a 4096 block pretty often as well, which is a reasonably good result given the simplicity of the algorithm. Even better results (the maximum possible block is 2^17 = 131072) can be achieved with, for example, more sophisticated versions of the other two algorithms by adding better heuristics than the raw game score of what constitutes a beneficial game state.

The source code is available [here](https://github.com/EeliLam/2048-AI/).
