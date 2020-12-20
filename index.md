---
---

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

The classic search tree algorithm works by looking five moves ahead and at each step, selecting the move that leads to the path to the highest score. In contrast, the Monte Carlo (MC) variant plays 100 games randomly until they are finished, for each of the four initial moves. The initial move with the highest average score is chosen. Essientally, the classic algorithm explores the complete search tree but only five steps deep, while the MC algorithm samples only random subtrees but explores them all the way to the bottom.

The neural network is a simple fully connected one, with the game state as its input, that attempts to learn the game with an evolutionary strategy. In each generation, 100 independent players play the game until all of them are finished. Then, the best-performing player is selected, and the link weights for the players in the next generation are determined by randomly mutating the weights of the best player from the previous generation.
