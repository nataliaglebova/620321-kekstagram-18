'use strict';
(function () {
  window.URL = 'https://js.dump.academy/kekstagram/data';
  window.photoCardItems = [];
  var loadPhotoGallery = function () {
    var loadPhotoRequest = new XMLHttpRequest();
    loadPhotoRequest.addEventListener('error', function () {
      window.errorLoadPhotoGallery();
    });

    loadPhotoRequest.responseType = 'json';
    loadPhotoRequest.addEventListener('load', function () {
      if (loadPhotoRequest.status === window.generalData.LOAD_SUCCESS_CODE) {
        window.photoCardItems = loadPhotoRequest.response;
        window.createPhotoGallery(window.photoCardItems);
        window.sortPhotoGallery();
      } else {
        window.errorLoadPhotoGallery();
      }
    });

    loadPhotoRequest.addEventListener('timeout', function () {
      // сброс таймаута
      loadPhotoRequest.timeout = 0;
      window.errorLoadPhotoGallery();
    });
    loadPhotoRequest.open('GET', window.URL);
    loadPhotoRequest.timeout = window.generalData.LOAD_TIMEOUT;
    loadPhotoRequest.send();
  };
  try {
    loadPhotoGallery();
  } catch (err) {
    window.errorLoadPhotoGallery();
  }
})();
