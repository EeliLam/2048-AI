let button

function setupInterface(x, y) {
  button = createRadio()
  button.style('width', '200px')
  button.style('checked', '0')
  button.parent('sketch_holder')

  button.position(x + 20, y + 65)

  button.option('mc_search_tree', `Monte Carlo search tree \xa0\xa0\xa0`)
  button.option('search_tree', 'Classical search tree \xa0\xa0\xa0\xa0\xa0\xa0\xa0')
  button.option('neural_network', 'Evolutive neural network')
  button.option('manual', 'Manual control')

}

function getMode() {
  return button.value()
}

// Only works once per option for some reason
function setMode(mode) {
  button.selected(mode)
}