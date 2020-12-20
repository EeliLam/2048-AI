let button

function setupInterface(x, y, game) {
  button = createRadio()
  //button.style('width', '200px')
  //button.style('vertical-align', 'top')
  //button.style('checked', '0')
  button.parent('sketch_holder')

  button.position(x + 20, y + 65)

  button.option('mc_search_tree', `Monte Carlo search tree`).checked = true
  button.option('search_tree', 'Classical search tree')
  button.option('neural_network', 'Evolutive neural network')
  button.option('manual', 'Manual control')

  encloseEachInputLabelPairIntoASubDiv(button);
  fixRadioDivElement(button);

  pauseButton = createButton('pause')
  pauseButton.position(x + 20, y + 160)
  pauseButton.mousePressed(() => game.paused = !game.paused)

  resetButton = createButton('new game')
  resetButton.position(pauseButton.x + pauseButton.width, pauseButton.y)
  resetButton.mousePressed(() => game.reset())

  
}

function showInterface(x, y) {
  fill(0)
  textAlign(CORNER)
  rectMode(CORNER)
  textSize(12)
  let s = 
`When two blocks with the same value collide, they merge into one. The goal is to achieve a block of 2048 (or higher).
  
To play yourself, select manual mode and play with arrow keys.
  
Hotkeys:
 - pause: k or space bar
 - new game: r`
  //let s = 'test'
  text(s, x + 20, y + 180, 200, 200)
}

function getMode() {
  return button.value()
}

// Only works once per option for some reason
function setMode(mode) {
  button.selected(mode)
}

// To align radio buttons vertically
// See https://discourse.processing.org/t/how-to-organize-radio-buttons-in-separate-lines/10041/5
function encloseEachInputLabelPairIntoASubDiv(radioDivElement) {
  const inputs = selectAll('input', radioDivElement),
        labels = selectAll('label', radioDivElement),
        len = inputs.length;

  for (let i = 0; i < len; ++i)
    createDiv().parent(radioDivElement).child(inputs[i]).child(labels[i]);
}

function fixRadioDivElement(radioDivP5Element) {
  // !! This had to be changed from _getInputChildrenArray to _getOptionsArray (p5.js source code changed) !!
  radioDivP5Element._getOptionsArray = function () {
    return this.elt.getElementsByTagName('input');
  }
}