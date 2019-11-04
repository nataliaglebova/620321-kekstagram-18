'use strict';

(function () {
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';

  var errorAlert = function () {
    document.querySelector('.img-upload__message--loading').remove();
    window.photoEditor.classList.add('hidden');
    window.uploadPhotoForm.reset();
    window.deleteEffect();
    window.errorLoadPhotoGallery();
  };
  // ajax отправка формы
  var formSubmitButton = window.uploadPhotoForm.querySelector('.img-upload__submit');
  var uploadFormRequest = function (data, onSuccess, onError) {
    var uploadForm = new XMLHttpRequest();
    uploadForm.responseType = 'json';
    uploadForm.onreadystatechange = function () {
    };
    uploadForm.addEventListener('load', function () {
      if (uploadForm.status === window.generalData.LOAD_SUCCESS_CODE) {
        onSuccess();
      } else {
        onError();
      }
    });
    uploadForm.addEventListener('timeout', function () {
      uploadForm.timeout = 0;
      window.photoEditor.classList.add('hidden');
      window.uploadPhotoForm.reset();
      window.deleteEffect();
      document.querySelector('.img-upload__message--loading').remove();
      window.errorLoadPhotoGallery();

    });
    uploadForm.upload.addEventListener('error', errorAlert);
    uploadForm.open('POST', UPLOAD_URL);
    uploadForm.timeout = window.generalData.LOAD_TIMEOUT;
    uploadForm.send(data);
  };

  var onUploadPhotoFormSubmit = function (evt) {
    if (window.uploadPhotoForm.reportValidity()) {
      window.showWaitMessageBlock();
      uploadFormRequest(new FormData(window.uploadPhotoForm), window.uploadPhotoSuccessfully, window.errorLoadPhotoGallery);
    }
    evt.preventDefault();
  };
  // отправка по клику
  window.uploadPhotoForm.addEventListener('submit', onUploadPhotoFormSubmit);

  // отправка формы при нажатии на кнопку ENTER
  var onFormSubmitPress = function (evt) {
    if (evt.keyCode === window.generalData.ENTER_KEYCODE && evt.target === formSubmitButton) {
      onUploadPhotoFormSubmit();
    }
  };
  formSubmitButton.addEventListener('keydown', onFormSubmitPress);
})();
