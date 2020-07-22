(function() {
 'use strict';

  let goTopBtn = document.querySelector('.up-btn');

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);

  function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.remove('visually-hidden');
    }
    if (scrolled < coords) {
      goTopBtn.classList.add('visually-hidden');
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 10);
    }
  }
})();
