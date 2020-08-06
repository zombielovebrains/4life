(function () {
  'use strict';

  const TIMEOUT_IN_MS = 10000;
  const SERVER_DATA_URL = 'js/goods.json';
  const SERVER_URL = '/source/php/send.php';
  const StatusCode = {
    OK: 200
  };

  let createRequest = function (onSuccess) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        alert('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      alert('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      alert('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  let download = function (onSuccess) {
    let xhr = createRequest(onSuccess);
    xhr.open('GET', SERVER_DATA_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess) {
    var xhr = createRequest(onSuccess);
    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };


  window.server = {
    download: download,
    upload: upload
  };
})();



