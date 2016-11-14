// initializing grid structure
(function() {
  'use strict';

  const resetForm = document.getElementById('grid-reset-form');
  const resetButton = document.getElementById('grid-setup');
  const grid = document.getElementById('grid');
  const formY = document.getElementById('grid-y');
  const formX = document.getElementById('grid-x');
  resetButton.addEventListener('click', () => {
    while (grid.children.length) {
      grid.removeChild(grid.firstElementChild);
    }
    const widthCell = 99 / formX.value;
    for (let i = 0; i < formY.value; i++) {
      const newRow = document.createElement('div');
      newRow.className = 'grid-row';
      for (let i = 0; i < formX.value; i++) {
        const newCell = document.createElement('div');
        if (formX.value > 30) {
          newCell.className ='small-cell ';
        }
        newCell.className += 'cellbase top-layer';
        newRow.appendChild(newCell);
      }
      grid.appendChild(newRow);
    }
  })
})();

//everything else
(function() {
  'use strict';
  const palette = document.getElementById('palette');
  const grid = document.getElementById('grid');

  // pick color, save as ext. variable
  let currentColor;
  palette.addEventListener('click', () => {
    if (event.target === palette) {
      return;
    }
    currentColor = event.target.classList[1];
    document.getElementById('current-color-box').removeAttribute('style');
    document.getElementById('current-color-box').className = currentColor;
  })

  // function: appends/removes a layer of color
  const addColorLayer = function () {
    if (!event.target.className.includes('top-layer')){
      return;
    }
    if (currentColor === undefined) {
      return;
    }
    if (event.shiftKey) {
      if(event.target.className.includes('cellbase')){
        return;
      }
      event.target.parentElement.className += ' top-layer';
      event.target.parentElement.removeChild(event.target);
      return;
    }

    const newCell = document.createElement('div');
    newCell.className ='color-layer '+currentColor;
    if (event.altKey) {
      newCell.className += ' blend-mode';
    }
    newCell.className += ' top-layer';
    event.target.className = event.target.className.slice(0, event.target.className.length - 10);
    if (newCell.className.includes('custom-color')){
      newCell.setAttribute('style',`background:${customColor}`);
    }
    event.target.appendChild(newCell);
  }

  // click to draw
  grid.addEventListener('click', () =>{
    if (event.target === grid || event.target.className.includes('grid-row')) {
      return;
    }
    addColorLayer();
  })

  // drag to draw w/mouseenter
  let mouseisdown = false;
  let topLayerArr = [...document.getElementsByClassName('top-layer')];
  const reinitializeEnterArr = function () {
    for (const cell of topLayerArr){
      cell.addEventListener('mouseenter', () => {
        if (mouseisdown) {
          addColorLayer();
        }
      })
    }
  }
  reinitializeEnterArr();
  grid.addEventListener('mousedown', () => {
    mouseisdown = true;
  })
  document.addEventListener('mouseup', () => {
    mouseisdown = false;
    topLayerArr = [...document.getElementsByClassName('top-layer')];
    reinitializeEnterArr();
  })

  //cursor;
  const brush = document.getElementById('brush')
  grid.addEventListener('mousemove', () => {
    event.shiftKey ? brush.className = 'transparent' : brush.className = currentColor;
    currentColor === 'custom-color' ? brush.setAttribute('style',`display:block;left:${event.x}px;top:${event.y}px;background:${customColor}`) : brush.setAttribute('style',`display:block;left:${event.x}px;top:${event.y}px`);
    if (currentColor !== undefined){
      grid.setAttribute('style','cursor:none');
    }
  })
  grid.addEventListener('mouseleave',() => {
    brush.removeAttribute('style');
  })

  //custom color
  let customColor;
  const colorInput = document.getElementById('color-input');
  colorInput.addEventListener('change', () => {
    customColor = colorInput.value;
    currentColor = 'custom-color';
    document.getElementById('current-color-box').setAttribute('style',`background:${customColor}`);
    document.getElementById('current-color-box').className = currentColor;
  })
})();
