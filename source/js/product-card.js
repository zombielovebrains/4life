(function () {
  'use strict';
  let cart = {};
  let addBtns = document.querySelectorAll('.product-card__add-btn');
  let addTexts = document.querySelectorAll('.product-card__add-text');
  let plusIcons = document.querySelectorAll('.product-card__plus-icon');

  let productsList = document.querySelector('.products__list');

  // $('document').ready(function () {
  //   checkCart();
  // });

  function hideCountBtns (target) {
    let addBtn = target.querySelector('.product-card__add-btn');
    let countBtnsBox = target.querySelector('.product-card__count-btns');

    addBtn.classList.remove('visually-hidden');
    countBtnsBox.classList.remove('product-card__count-btns--active');
  }

  function showCountBtns (target) {
    let addBtn = target.querySelector('.product-card__add-btn');
    let countBtnsBox = target.querySelector('.product-card__count-btns');

    addBtn.classList.add('visually-hidden');
    countBtnsBox.classList.add('product-card__count-btns--active');
  }

  function addToCart (article) {
    if (cart[article] != undefined) {
      cart[article] += 1;
    } else {
      cart[article] = 1;
    }
    checkCountField();
  }

  function minusToCart (article) {
    if (cart[article] > 1) {
      cart[article] -= 1;
    } else {
      delete cart[article];
    }
    checkCountField();
  }

  function changeCart (countField) {
    let article  = countField.dataset.id;
    cart[article] = parseInt(countField.value);
  }

  function checkCountField () {
    let productCards = document.querySelectorAll('.products__item');

    productCards.forEach(function (item) {
      let countField = item.querySelector('.product-card__count-field');
      countField.value = cart[item.dataset.id] + "";

      if (parseInt(countField.value, 10) > 0 && !item.querySelector('.product-card__add-btn').classList.contains('visually-hidden')) {
        showCountBtns(item);
      } else if (cart[item.dataset.id] === undefined) {
        hideCountBtns(item);
      } else if (parseInt(countField.value, 10) === 0){
        hideCountBtns(item);
        delete cart[item.dataset.id];
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function checkCart() {
    if (localStorage.getItem('cart') != null) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    checkCountField();
  }

  productsList.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('product-card__add')) {
        addToCart(evt.target.dataset.id);
      } else if (evt.target.classList.contains('product-card__minus-btn')) {
        minusToCart(evt.target.dataset.id);
      }
  });

  productsList.addEventListener('change', function (evt) {
    if (evt.target.classList.contains('product-card__count-field')) {
      changeCart(evt.target);
      checkCountField();
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

    document.querySelectorAll('.products__item').forEach(function (item, i) {

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

    window.cardOfProduct = {
      check: checkCart
    };
  }
})();
