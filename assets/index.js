// TODO: function to initialize grid with size input

(function() {
  'use strict';
  const palette = document.getElementById('palette')
  const grid = document.getElementById('grid')

  const gridRows = [...document.getElementsByClassName('grid-row')]

  const initializeGrid = function () {
    for (const row of gridRows){
      const rowArr=[...row.children]
      for (const cell of rowArr){
        cell.className+='cellbase'
      }
    }
  }
  initializeGrid();

  // pick color, save as ext. variable
  let currentColor;
  palette.addEventListener('click', () => {
    if (event.target === palette) {
      return;
    }
    currentColor = event.target.classList[1];
  })

  const addColorLayer = function () {
    if (event.shiftKey) {
      if(event.target.className.includes('cellbase')){
        return
      }
      event.target.parentElement.removeChild(event.target);
    }

    const newCell = document.createElement('div');
    newCell.className ='color-layer '+currentColor;
    if (event.altKey) {
      newCell.className += ' blend-mode'
      console.log('check')
    }
    event.target.appendChild(newCell);
  }

  // append div with class of color name
  grid.addEventListener('click', () => addColorLayer())

  //pointer with fixed brush;
  const brush = document.getElementById('brush')
  grid.addEventListener('mousemove', () => {
    event.shiftKey ? brush.className = 'transparent' : brush.className = currentColor;
    brush.setAttribute('style',`display:block;position:fixed;left:${event.x}px;top:${event.y}px`)
  })
})();
