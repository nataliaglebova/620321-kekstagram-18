'use strict';
(function () {
  // закрытие сообщения об ошибке

  var onErrorExitClick = function () {
    document.querySelector('.error__button').removeEventListener('click', onErrorExitClick);
    document.querySelector('.error').remove();
    window.uploadPhotoForm.reset();
  };
  var onErrorExitEsc = function (evt) {
    if (evt.keyCode === window.generalData.ESC_KEYCODE) {
      document.querySelector('.error').remove();
      window.uploadPhotoForm.reset();
      document.removeEventListener('keydown', onErrorExitEsc);
    }
  };
  var onErrorExitDocumentClick = function (evt) {
    if (document.contains(document.querySelector('.error')) && evt.target !== document.querySelector('.error__inner')) {
      document.querySelector('.error').remove();
      window.uploadPhotoForm.reset();
      document.removeEventListener('keydown', onErrorExitDocumentClick);
    }
  };
  // функция по отрисовке ошибки загрузки фотографии
  window.errorLoadPhotoGallery = function () {
    // окно ошибки
    var errorTemplate = document.querySelector('#error').content
      .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var fragmentError = document.createDocumentFragment();
    fragmentError.appendChild(errorElement);
    document.querySelector('main').appendChild(fragmentError);
    // закрытие окна
    document.querySelector('.error__button').addEventListener('click', onErrorExitClick);
    document.addEventListener('keydown', onErrorExitEsc);
    document.addEventListener('click', onErrorExitDocumentClick);
  };
})();
