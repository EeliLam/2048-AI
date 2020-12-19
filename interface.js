let button

function setupInterface(x, y) {
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