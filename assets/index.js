// initializing grid structure
(function() {
  'use strict';

  const resetForm = document.getElementById('grid-reset-form');
  const resetButton = document.getElementById('grid-setup');
  const grid = document.getElementById('grid');
  const formY = document.getElementById('grid-y');
  const formX = document.getElementById('grid-x');
  //resetting grid
  resetButton.addEventListener('click', () => {
    //delete current grid, if any
    while (grid.children.length) {
      grid.removeChild(grid.firstElementChild);
    }
    //generate grid given the dimensions
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
    //GC: will only apply to the top-most layer of each cell & exclude
    if (!event.target.className.includes('top-layer')) {
      return;
    }
    //GC: will not add any color layers before choosing a color
    if (currentColor === undefined) {
      return;
    }
    //enable 'undo' by deleting top-most layer; reassign class to parent after deletion
    if (event.shiftKey) {
      if(event.target.className.includes('cellbase')) {
        return;
      }
      event.target.parentElement.className += ' top-layer';
      event.target.parentElement.removeChild(event.target);
      return;
    }

    const newCell = document.createElement('div');
    newCell.className = 'color-layer ' + currentColor;

    if (event.altKey) {
      newCell.className += ' blend-mode';
    }

    newCell.className += ' top-layer';
    event.target.className = event.target.className.slice(0, event.target.className.length - 10);
    //by this point, class list of new color layer should be color-layer, (currentColor), (optional blend-mode), top-layer.
    //the parent element (target) should have lost the top-layer class.
    if (newCell.className.includes('custom-color')) {
      newCell.setAttribute('style', `background:${customColor}`);
    }

    event.target.appendChild(newCell);
  }

  // click to draw
  grid.addEventListener('click', () => {
    if (event.target === grid || event.target.className.includes('grid-row')) {
      return;
    }
    addColorLayer();
  })

  // drag to draw w/mouseenter
  let mouseisdown = false;
  let topLayerArr = [...document.getElementsByClassName('top-layer')];
  const reinitializeEnterArr = function () {
    for (const cell of topLayerArr) {
      cell.addEventListener('mouseenter', () => {
        if (mouseisdown) {
          addColorLayer();
        }
      })
    }
  }
  reinitializeEnterArr();
  //boolean for whether mouse is up/down
  grid.addEventListener('mousedown', () => {
    mouseisdown = true;
  })
  document.addEventListener('mouseup', () => {
    mouseisdown = false;
    //with "top-layer" changing constantly, this part redefines the target elements to apply mouseenter listeners for the newly added layers at each mouseup.
    topLayerArr = [...document.getElementsByClassName('top-layer')];
    reinitializeEnterArr();
  })

  //cursor;
  const brush = document.getElementById('brush')
  grid.addEventListener('mousemove', () => {
    if (event.shiftKey) {
      brush.className = 'transparent';
    } else {
      brush.className = currentColor;
    }

    if (currentColor === 'custom-color') {
      brush.setAttribute('style', `display:block; left:${event.x}px; top:${event.y}px; background:${customColor}`);
    } else {
      brush.setAttribute('style', `display:block; left:${event.x}px; top:${event.y}px`);
    }

    if (event.altKey) {
      brush.className += ' blend-mode'
    }

    if (currentColor !== undefined) {
      grid.setAttribute('style', 'cursor:none');
    }
  })
  //above styles are only applied while the cursor is above the grid element; once it leaves the field it is deleted and hidden by returning to original display:none
  grid.addEventListener('mouseleave', () => {
    brush.removeAttribute('style');
  })

  //custom color
  let customColor;
  const colorInput = document.getElementById('color-input');
  colorInput.addEventListener('change', () => {
    customColor = colorInput.value;
    currentColor = 'custom-color';

    document.getElementById('current-color-box').setAttribute('style', `background:${customColor}`);
    document.getElementById('current-color-box').className = currentColor;
  })

  //grid toggle (not working yet...)
  // const gridToggle = document.getElementById('grid-toggle');
  // gridToggle.addEventListener('change', () => {
  //   console.log('h');
  //   if (!event.target.checked) {
  //     console.log('e');
  //     for (const cell in [...document.getElementsByClassName('cellbase')]) {
  //       cell.className = 'cellbase-gridless ' + cell.className;
  //       console.log('o');
  //     }
  //   } else {
  //     for (const cell in [...document.getElementsByClassName('cellbase')]) {
  //       cell.className.toggle('cellbase-gridless');
  //     }
  //   }
  // })
})();
