(function () {
  'use strict';
  let productCards = document.querySelectorAll('.product-card');
  let addBtns = document.querySelectorAll('.product-card__add-btn');
  let addTexts = document.querySelectorAll('.product-card__add-text');
  let plusIcons = document.querySelectorAll('.product-card__plus-icon');

  let productsList = document.querySelector('.products__list');


  function hideCountBtns (target) {
    let addBtn = target.closest('.product-card').querySelector('.product-card__add-btn');
    let countBtnsBox = target.closest('.product-card').querySelector('.product-card__count-btns');

    addBtn.classList.remove('visually-hidden');
    countBtnsBox.classList.remove('product-card__count-btns--active');
  }

  function showCountBtns (target) {
    let addBtn = target.closest('.product-card').querySelector('.product-card__add-btn');
    let countBtnsBox = target.closest('.product-card').querySelector('.product-card__count-btns');

    addBtn.classList.add('visually-hidden');
    countBtnsBox.classList.add('product-card__count-btns--active');
  }

  function checkCountField(target, field, flag) {
    let countField = field;
    let count = +countField.textContent;
    if (!flag && (count > 1)) {
      countField.textContent = `${count - 1}`;
    } else if (flag && (+countField.textContent < 999)) {
      countField.textContent = `${count + 1}`;
    } else {
      hideCountBtns(target);
    }
  }

  productsList.addEventListener('click', function (evt) { // Появление поле с кол-ом товара
    let target = evt.target;

    if (target.classList.contains('product-card__add-btn')) {
      showCountBtns(target);
    } else if (target.closest('.product-card__add-btn')) {
      showCountBtns(target);
    }
  });

  productsList.addEventListener('click', function (evt) { // Управление кол-ом товара
    let target = evt.target;

    if (target.classList.contains('product-card__plus-btn')) {
      checkCountField(target, target.previousElementSibling, true);
    } else if (target.classList.contains('product-card__minus-btn')) {
      checkCountField(target, target.nextElementSibling, false);
    }
  });

  if (document.body.clientWidth >= 1200) { // В этом блоке анимация при наведении на карточку
    addBtns.forEach(function (item) {
      item.classList.add('product-card__add-btn--filled');
    });

    addTexts.forEach(function (item) {
      item.classList.add('product-card__add-text--hidden');
    });

    plusIcons.forEach(function (item) {
      item.classList.add('product-card__plus-icon--pink');
    });

    productCards.forEach(function (item, i) {

      item.addEventListener('mouseover', function () {
        addBtns[i].classList.remove('product-card__add-btn--filled');
        addTexts[i].classList.remove('product-card__add-text--hidden');
        plusIcons[i].classList.remove('product-card__plus-icon--pink');
      });

      item.addEventListener('mouseout', function () {
        addBtns[i].classList.add('product-card__add-btn--filled');
        addTexts[i].classList.add('product-card__add-text--hidden');
        plusIcons[i].classList.add('product-card__plus-icon--pink');
      });
    });
  }

})();
