(function() {
  const ENTER_CODE = 13;
  const ESC_CODE = 27;
  const LEFT_MOUSE_BUTTON = 0;
  let menuIcon = document.querySelector('.main-nav__burger');
  let menuBtn = document.querySelector('.main-nav__menu');
  let menuBox = document.querySelector('.main-nav__list');

  function switchClasses() {
    if (menuBox.classList.contains('main-nav__list--active')) {
      menuBox.classList.remove('main-nav__list--active');
      menuIcon.classList.remove('main-nav__burger--active');
      document.body.classList.remove('hidden');
      document.documentElement.classList.remove('hidden');
    } else {
      menuBox.classList.add('main-nav__list--active');
      menuIcon.classList.add('main-nav__burger--active');
      document.body.classList.add('hidden');
      document.documentElement.classList.add('hidden');
    }
  }

  menuBtn.addEventListener('click', switchClasses);
})();
