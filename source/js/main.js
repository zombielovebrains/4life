(function () {
  function activatePage () {
  }

  var successDownload = function (data) {
    ads = Array.from(data);
    window.map.renderPins(window.filter.check(ads));
    window.filter.set(filterChangeHandler);
  };

  var unsuccessDownload = function (errorMessage) {
    window.message.showError(errorMessage);
    deactivatePage();
  };

  activatePage();
})();
