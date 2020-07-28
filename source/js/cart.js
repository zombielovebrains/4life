(function () {
  'use strict';

  let cart;
  let cardList;
  let similarOrderItemTemplate = document.querySelector('#cart').content.querySelector('.orderlist__item');
  let similarOrderlist = document.querySelector('.orderlist');
  let totalAmountField = document.querySelector('.total-amount');
  let totalLpField = document.querySelector('.total-lp');

  checkCart();

  function showCart() {
    document.querySelector('.empty-cart').classList.add('visually-hidden');
    document.querySelector('.cart').classList.remove('visually-hidden');
  }

  function hideCart() {
    document.querySelector('.empty-cart').classList.remove('visually-hidden');
    document.querySelector('.cart').classList.add('visually-hidden');
  }

  function checkCart() {
    if (localStorage.getItem('cart') != null ) {
      cart = JSON.parse(localStorage.getItem('cart'));
      showCart();
    } else {
      hideCart();
    }
  }

  function loadOrderItems(data) {
    cardList = data;

    for (var key in cart) {
      similarOrderlist.appendChild(createOrderItem(cardList[key], cart[key], key));
    }

    checkTotals();
  }

  function inscreaseСount () {
    let article = this.dataset.id;
    cart[article] += 1;
    checkCountField();
    changeLocalStorage(cart);
    console.log(Object.keys(cart).length);
  }

  function decreaseСount () {
    let article = this.dataset.id;
    if (cart[article] > 1) {
      cart[article] -= 1;
    } else {
      delete cart[article];
    }
    checkCountField();
    changeLocalStorage(cart);
  }

  function checkCountField () {
    clearAllItems(similarOrderlist);
    loadOrderItems(cardList);
    if (Object.keys(cart).length === 0) {
      hideCart();
    }
  }

  function changeCart (countField) {
    let article  = countField.dataset.id;
    cart[article] = parseInt(countField.value);
  }


  function changeLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function clearAllItems(parent) {
    parent.textContent = '';
  }

  function checkTotals() {
    let sums = document.querySelectorAll(".orderlist__sum");
    let lps = document.querySelectorAll(".orderlist__lp");
    let totalSum = 0;
    let totalLp = 0;

    sums.forEach(function (item) {
      totalSum += parseInt(item.textContent, 10);
    });

    lps.forEach(function (item) {
      totalLp += parseInt(item.textContent, 10);
    });

    totalAmountField.textContent = totalSum;
    totalLpField.textContent = totalLp;
  }

  let createOrderItem = function (data, countdata, id) {
    let card = similarOrderItemTemplate.cloneNode(true);
    let price = card.querySelector('.orderlist__price');
    let sum = card.querySelector('.orderlist__sum');
    let lp = card.querySelector('.orderlist__lp');
    let plusBtn = card.querySelector('.orderlist__plus-btn');
    let minusBtn = card.querySelector('.orderlist__minus-btn');

    card.dataset.id = id;
    card.querySelector('.orderlist__photo').src = "img/" + data.image;
    card.querySelector('.orderlist__name').value = data.name;
    lp.textContent = data.lp * countdata + ' lp';
    sum.textContent = data.cost * countdata;
    price.appendChild(sum);
    price.appendChild(lp);
    card.querySelector('.orderlist__count-field').value = countdata;
    card.querySelector('.orderlist__count-field').dataset.id = id;

    plusBtn.dataset.id = id;
    minusBtn.dataset.id = id;


    plusBtn.addEventListener('click', inscreaseСount);
    minusBtn.addEventListener('click', decreaseСount);

    return card;
  };

  similarOrderlist.addEventListener('change', function (evt) {
    if (evt.target.classList.contains('orderlist__count-field')) {
      changeCart(evt.target);
      checkCountField();
    }
  });

  window.server.download(loadOrderItems);

})();
