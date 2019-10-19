'use strict';
(function () {

  // хэш-тэги
  var tagsField = document.querySelector('.text__hashtags');

  // функция валидации тэгов
  var validateTags = function (arr, textInput) {
    textInput.setCustomValidity('');
    for (var x = 0; x < arr.length; x++) {
      for (var y = x + 1; y < arr.length; y++) {
        if (arr[x] === arr[y]) {
          textInput.setCustomValidity('Хэш-тэги не должны повторяться');
        }
      }
      if (arr[x] === '#') {
        textInput.setCustomValidity('Хэш-тэг не должен состоять только из символа #');
      } if (arr[x].length > 20) {
        textInput.setCustomValidity('Хэш-тэг не должен быть длинее 20 символов, включая #');
      } if (arr[x].charAt(0) !== '#') {
        textInput.setCustomValidity('Хэш-тэг должен начинаться с символа #');
      } if (arr[x] === ' ') {
        textInput.setCustomValidity('Хэш-тэги должны разделяться только одним пробелом');
      }
    }
    if (arr.length > window.generalData.MAX_TAGS) {
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
    if (commentsField.value.length > window.generalData.DESCRIPTION_MAX_LENGTH) {
      commentsField.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    }
  };
  commentsField.addEventListener('change', onCommentsFieldChange);

  // отправка формы
  var formSubmitButton = window.uploadPhotoForm.querySelector('.img-upload__submit');
  // var successPageTemplate = document.querySelector('#success').content
  //  .querySelector('.success');
  // сообщение об успешной загрузке фотографии
  /* var uploadPhotoSuccessfully = function () {
    var fragmentSuccessPage = document.createDocumentFragment();
    var successPage = successPageTemplate.cloneNode(true);
    fragmentSuccessPage.appendChild(successPage);
    document.querySelector('main').appendChild(fragmentSuccessPage);
  };*/

  var onUploadPhotoFormSubmit = function (evt) {
    evt.preventDefault();
    if (window.uploadPhotoForm.reportValidity()) {
      window.uploadPhotoForm.submit();
    }
  };
  // отправка по клику
  // formSubmitButton.addEventListener('submit', onFormSubmit);
  window.uploadPhotoForm.addEventListener('submit', onUploadPhotoFormSubmit);

  // отправка формы при нажатии на кнопку ENTER
  var onformSubmitPress = function (evt) {
    if (evt.keyCode === window.generalData.ENTER_KEYCODE && evt.target === formSubmitButton) {
      window.uploadPhotoForm.submit();
    }
  };
  formSubmitButton.addEventListener('keydown', onformSubmitPress);
})();
