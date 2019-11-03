'use strict';
(function () {

  // хэш-тэги
  var tagsField = document.querySelector('.text__hashtags');

  // функция валидации тэгов
  var validateTags = function (arr, textInput) {
    textInput.style.outline = 'none';
    textInput.setCustomValidity('');
    for (var x = 0; x < arr.length; x++) {
      for (var y = x + 1; y < arr.length; y++) {
        if (arr[x] === arr[y]) {
          textInput.setCustomValidity('Хэш-тэги не должны повторяться');
          textInput.style.outline = 'thick solid red';
        }
      }
      if (arr[x] === '#') {
        textInput.style.outline = '2px solid red';
        textInput.setCustomValidity('Хэш-тэг не должен состоять только из символа #');
      } if (arr[x].length > 20) {
        textInput.style.outline = '2px solid red';
        textInput.setCustomValidity('Хэш-тэг не должен быть длинее 20 символов, включая #');
      } if (arr[x].charAt(0) !== '#') {
        textInput.style.outline = '2px solid red';
        textInput.setCustomValidity('Хэш-тэг должен начинаться с символа #');
      } if (arr[x] === ' ') {
        textInput.style.outline = '2px solid red';
        textInput.setCustomValidity('Хэш-тэги должны разделяться только одним пробелом');
      }
    }
    if (arr.length > window.GeneralData.MAX_TAGS) {
      textInput.style.outline = '2px solid red';
      textInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    }
  };

  var tagsList = [];
  tagsField.addEventListener('change', function () {
    tagsList = tagsField.value.toLocaleLowerCase().split(' ');
    validateTags(tagsList, tagsField);
  }
  );

  // валидация комментария
  var commentsField = window.photoEditor.querySelector('.text__description');
  var onCommentsFieldChange = function () {
    commentsField.setCustomValidity('');
    if (commentsField.value.length > window.GeneralData.DESCRIPTION_MAX_LENGTH) {
      commentsField.style.outline = '2px solid red';
      commentsField.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    }
  };
  commentsField.addEventListener('change', onCommentsFieldChange);

  // сообщение об успешной отправке формы
  var formSubmitButton = window.uploadPhotoForm.querySelector('.img-upload__submit');
  var successPageTemplate = document.querySelector('#success').content
  .querySelector('.success');

  // окно  сообщения об ожидании завершения отправки
  var waitMessageTemplate = document.querySelector('#messages').content
  .querySelector('.img-upload__message');
  var showWaitMessageBlock = function () {
    var fragmentWaitMessageBlock = document.createDocumentFragment();
    var waitingMessage = waitMessageTemplate.cloneNode(true);
    fragmentWaitMessageBlock.appendChild(waitingMessage);
    document.querySelector('main').appendChild(fragmentWaitMessageBlock);
  };

  // сообщение об успешной загрузке фотографии
  var onSuccessCloseButtonClick = function () {
    document.querySelector('.success').remove();
    window.uploadPhotoForm.reset();
    document.querySelector('.success__button').removeEventListener('click', onSuccessCloseButtonClick);
  };
  var onSuccessBlockEsc = function (evt) {
    if (evt.keyCode === window.GeneralData.ESC_KEYCODE) {
      document.querySelector('.success').remove();
      window.uploadPhotoForm.reset();
      document.removeEventListener('keydown', onSuccessBlockEsc);
    }
  };
  var onSuccessBlockDocumentclick = function (evt) {
    if (document.contains(document.querySelector('.success')) && evt.target !== document.querySelector('.success__inner')) {
      document.querySelector('.success').remove();
      window.uploadPhotoForm.reset();
      document.removeEventListener('click', onSuccessBlockDocumentclick);
    }
  };
  // отображение сообщения об успешной загрузке
  var uploadPhotoSuccessfully = function () {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('.img-upload__message--loading').remove();
    var fragmentSuccessPage = document.createDocumentFragment();
    var successPage = successPageTemplate.cloneNode(true);
    fragmentSuccessPage.appendChild(successPage);
    document.querySelector('main').appendChild(fragmentSuccessPage);

    document.querySelector('.success__button').addEventListener('click', onSuccessCloseButtonClick);
    document.addEventListener('keydown', onSuccessBlockEsc);
    document.addEventListener('click', onSuccessBlockDocumentclick);
  };

  // ajax отправка формы
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var uploadFormRequest = function (data, onSuccess, onError) {
    var uploadForm = new XMLHttpRequest();
    uploadForm.responseType = 'json';
    uploadForm.addEventListener('load', function () {
      if (uploadForm.status === window.GeneralData.LOAD_SUCCESS_CODE) {
        onSuccess();
      } else {
        onError();
      }
    });
    uploadForm.open('POST', UPLOAD_URL);
    uploadForm.send(data);
  };

  var onUploadPhotoFormSubmit = function (evt) {
    if (window.uploadPhotoForm.reportValidity()) {
      showWaitMessageBlock();
      uploadFormRequest(new FormData(window.uploadPhotoForm), uploadPhotoSuccessfully, window.errorLoadPhotoGallery);
    }
    evt.preventDefault();
  };
  // отправка по клику
  window.uploadPhotoForm.addEventListener('submit', onUploadPhotoFormSubmit);

  // отправка формы при нажатии на кнопку ENTER
  var onformSubmitPress = function (evt) {
    if (evt.keyCode === window.GeneralData.ENTER_KEYCODE && evt.target === formSubmitButton) {
      window.uploadPhotoForm.submit();
    }
  };
  formSubmitButton.addEventListener('keydown', onformSubmitPress);


})();
