(function() {
 'use strict';

  let similarCardTemplate = document.querySelector('#card').content.querySelector('.products__item');
  let similarCardList = document.querySelector('.products__list');

  let loadGoods = function () {
    $.getJSON('js/goods.json', function (data) {
      for (var key in data) {
        similarCardList.appendChild(createCard(data[key]));
      }
    });

    activateSlider();
  };

  function activateSlider() {
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    similarCardList.classList.add('owl-carousel');
  }

  let createCard = function (data) { // Заполняем шаблон объявления данными из объекта
    let card = similarCardTemplate.cloneNode(true);
    let price = card.querySelector('.product-card__price');
    let lp = card.querySelector('.product-card__lp');

    card.querySelector('.product-card__item').src = "img/" + data.image;
    card.querySelector('.product-card__name').textContent = data.name;
    lp.textContent = data.lp + ' lp';
    price.textContent = data.cost;
    price.appendChild(lp);
    return card;
  };

  loadGoods();
})();
