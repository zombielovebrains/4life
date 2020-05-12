(function (){
  let faqBox = document.querySelector(".tf-faq");

  function switchClass (btn, textBox) {
    let hiddenBlock = textBox;
    let hiddenText = hiddenBlock.querySelector(".tf-faq__text");

    if (btn.classList.contains("tf-faq__button--active")) {
      hiddenText.classList.add("tf-faq__text--hidden");
      btn.classList.remove("tf-faq__button--active");
      setTimeout(() => hiddenBlock.classList.add("tf-faq__textbox--hidden"), 200);
    } else {
      btn.classList.add("tf-faq__button--active");
      hiddenBlock.classList.remove("tf-faq__textbox--hidden");
      setTimeout(() => hiddenText.classList.remove("tf-faq__text--hidden"), 200);
    }
  }

  faqBox.addEventListener("click", function (evt) {
    let target = evt.target;
    let infoBox = target.closest(".tf-faq__infobox");
    if (infoBox) {
      let btn = infoBox .querySelector('.tf-faq__button');
      let textBox = infoBox .querySelector('.tf-faq__textbox');
      switchClass(btn, textBox);
    }
  });
})();
