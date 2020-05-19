(function (){
  'use strict';

  let productsListBox = document.querySelector('.products__list');
  let productItems = productsListBox.querySelectorAll('.products__item');
  let nextBtn = document.querySelector('.products__toggle--next');
  let prevBtn = document.querySelector('.products__toggle--prev');

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

  function setCoords(list) {
    let x = 0;
    let y = 0;
    let interval = getLeftPos();
    for (var i = 0; i < list.length; i++) {
      list[i].style.top = y;
      list[i].style.left = `${x}%`;
      x += interval;
    }
  }

  function setAbsolutePosition(list) {
    list.forEach(function (item) {
      item.style.position = 'absolute';
    });
  }

  function changePosition(list, flag) {
    let interval = getLeftPos();
    if (flag && list[list.length - 1].style.left !== `${interval*2}%`) {
      list.forEach(function (item) {
        item.style.left = parseInt(item.style.left) - interval + '%';
      });
    } else if (!flag && list[0].style.left !== '0%'){
      list.forEach(function (item) {
        item.style.left = parseInt(item.style.left) + interval + '%';
      });
    }
  }

  function setHeight(item) {
    let pageWidth = document.body.clientWidth;

    switch(true) {
      case pageWidth >= 1024:  // if (x === 'value2')
        item.style.minHeight = '595px';
        break;

      case pageWidth >= 768:  // if (x === 'value1')
        item.style.minHeight = '505px';
        break;

      default:
        item.style.minHeight = '400px';
        break;
    }
  }

  nextBtn.addEventListener('click',function () {
    changePosition(productItems, true);
  });

  prevBtn.addEventListener('click', function () {
    changePosition(productItems, false);
  });

  function activateSlider () {
    setAbsolutePosition(productItems);
    setCoords(productItems);
    setHeight(productsListBox);
    document.documentElement.style.overflowX = 'hidden';
    productsListBox.style.position = 'relative';
  }

  activateSlider();
})();
