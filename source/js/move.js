
(function () {
  'use strict';
  var LEFT_MOUSE_BUTTON = 0;
  let productsListBox = document.querySelector('.products__list');
  let productItems = productsListBox.querySelectorAll('.products__item');
  let products = productsListBox.querySelectorAll('.product-card');

  function changePosition(list, flag) {
    let interval = getLeftPos();
    if (flag && list[list.length - 1].style.left !== '0%') {
      list.forEach(function (item) {
        item.style.left = parseInt(item.style.left) - interval + '%';
      });
    } else if (!flag && list[0].style.left !== '0%'){
      list.forEach(function (item) {
        item.style.left = parseInt(item.style.left) + interval + '%';
      });
    }
  }

  function getLeftPos () {
    let pageWidth = document.body.clientWidth;

    switch(true) {
      case pageWidth >= 1200:  // if (x === 'value2')
        return 35;

      case pageWidth >= 1024:  // if (x === 'value2')
        return 45;

      case pageWidth >= 768:  // if (x === 'value1')
        return 55;

      default:
        return 95;
    }
  }


  productsListBox.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX
        };

        startCoords = {
          x: moveEvt.clientX
        };

        var newPositions = {
          x: productsListBox.offsetLeft - shift.x,
        };
        console.log(shift.x);
        console.log(startCoords.x);
        console.log(newPositions.x);

        if (shift.x < 0 && shift.x/0 ) {
          changePosition(productItems, true);
        } else if (shift.x > 50){
          changePosition(productItems, false);
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
