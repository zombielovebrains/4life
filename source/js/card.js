(function() {
 'use strict';

  let similarCardTemplate = document.querySelector('#card').content.querySelector('.products__item');
  let similarCardList = document.querySelector('.products__list');

  let loadGoods = function (data) {
    var cardList = data;

    for (var key in cardList) {
      similarCardList.appendChild(createCard(cardList[key], key));
    }

    window.productCard.check();
    window.slider.activate();
  };

  let createCard = function (data, id) { // Заполняем шаблон объявления данными из объекта
    let card = similarCardTemplate.cloneNode(true);
    let price = card.querySelector('.product-card__price');
    let lp = card.querySelector('.product-card__lp');
    let btns = card.querySelectorAll('button');

    card.dataset.id = id;
    card.querySelector('.product-card__item').src = "img/" + data.image;
    card.querySelector('.product-card__name').textContent = data.name;
    lp.textContent = data.lp + ' lp';
    price.textContent = data.cost;
    price.appendChild(lp);
    card.querySelector('.product-card__count-field').dataset.id = id;
    btns.forEach(function (item) {
      item.dataset.id = id;
    });
    return card;
  };

  window.server.download(loadGoods);

})();
