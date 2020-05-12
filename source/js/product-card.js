(function () {
  'use strict';
  let productCards = document.querySelectorAll('.product-cart');
  let addBtns = document.querySelectorAll('.product-cart__add-btn');
  let addTexts = document.querySelectorAll('.product-cart__add-text');
  let plusIcons = document.querySelectorAll('.product-cart__plus-icon');

  if (document.body.clientWidth >= 1200) {
    addBtns.forEach(function (item) {
      item.classList.add('product-cart__add-btn--filled');
    });

    addTexts.forEach(function (item) {
      item.classList.add('product-cart__add-text--hidden');
    });

    plusIcons.forEach(function (item) {
      item.classList.add('product-cart__plus-icon--pink');
    });

    productCards.forEach(function (item, i) {

      item.addEventListener('mouseover', function () {
        addBtns[i].classList.remove('product-cart__add-btn--filled');
        addTexts[i].classList.remove('product-cart__add-text--hidden');
        plusIcons[i].classList.remove('product-cart__plus-icon--pink');
      });

      item.addEventListener('mouseout', function () {
        addBtns[i].classList.add('product-cart__add-btn--filled');
        addTexts[i].classList.add('product-cart__add-text--hidden');
        plusIcons[i].classList.add('product-cart__plus-icon--pink');
      });
    });
  }

})();
