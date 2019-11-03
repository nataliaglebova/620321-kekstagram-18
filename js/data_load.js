'use strict';
(function () {
  window.URL = 'https://js.dump.academy/kekstagram/data';
  var loadPhotoGallery = function () {
    var loadPhotoRequest = new XMLHttpRequest();
    loadPhotoRequest.responseType = 'json';
    loadPhotoRequest.open('GET', window.URL);
    loadPhotoRequest.send();

    loadPhotoRequest.addEventListener('load', function () {
      if (loadPhotoRequest.status === window.GeneralData.LOAD_SUCCESS_CODE) {
        window.photoData.photoCardItems = loadPhotoRequest.response;
        window.createPhotoGallery(window.photoData.photoCardItems);
        window.sortPhotoGallery();
      } else {
        window.errorLoadPhotoGallery();
      }
    });

    loadPhotoRequest.addEventListener('timeout', function () {
      window.errorLoadPhotoGallery();
    });
    loadPhotoRequest.timeout = window.GeneralData.LOAD_TIMEOUT; // 10s
  };
  loadPhotoGallery();
})();
