'use strict';
// открытие окна редактора при загрузке изображения
(function () {
  var uploadField = document.querySelector('#upload-file');
  window.photoEditor = document.querySelector('.img-upload__overlay');
  // сброс значения поля выбора
  window.uploadPhotoForm = window.setupPhotoCard.querySelector('.img-upload__form');
  // функция закрытия окна
  var closePhotoEditor = function () {
    window.photoEditor.classList.add('hidden');
    window.uploadPhotoForm.reset();
  };
  // функция закрытия по ESC
  var hashTagsInput = window.photoEditor.querySelector('.text__hashtags');
  var descriptionInput = window.photoEditor.querySelector('.text__description');
  var onPhotoEditorPress = function (evt) {
    if (evt.keyCode === window.generalData.ESC_KEYCODE && ((evt.target !== hashTagsInput) && (evt.target !== descriptionInput))) {
      closePhotoEditor();
    }
  };
  // функция закрытия по ENTER
  var onEditorExitPress = function (evt) {
    if (evt.keyCode === window.generalData.ENTER_KEYCODE) {
      closePhotoEditor();
    }
  };
  // функция открытия окна редактора
  var openPhotoEditor = function () {
    window.photoEditor.classList.remove('hidden');
  };

  uploadField.addEventListener('change', openPhotoEditor);
  document.addEventListener('keydown', onPhotoEditorPress);
  var photoEditorExit = window.photoEditor.querySelector('#upload-cancel');
  photoEditorExit.addEventListener('click', closePhotoEditor);
  photoEditorExit.addEventListener('keydown', onEditorExitPress);

  // применение эффекта для изображения
  var effectPin = window.photoEditor.querySelector('.effect-level__pin');
  var customPhoto = window.photoEditor.querySelector('.img-upload__preview img');
  var chromePreview = window.photoEditor.querySelector('#effect-chrome');
  var sepiaPreview = window.photoEditor.querySelector('#effect-sepia');
  var marvinPreview = window.photoEditor.querySelector('#effect-marvin');
  var phobosPreview = window.photoEditor.querySelector('#effect-phobos');
  var heatPreview = window.photoEditor.querySelector('#effect-heat');
  var noneEffect = window.photoEditor.querySelector('#effect-none');

  // применение фильтров при выборе превью
  chromePreview.addEventListener('click', function () {
    customPhoto.classList.add('effects__preview--chrome');
  });
  sepiaPreview.addEventListener('click', function () {
    customPhoto.classList.add('effects__preview--sepia');
  });
  marvinPreview.addEventListener('click', function () {
    customPhoto.classList.add('effects__preview--marvin');
  });
  phobosPreview.addEventListener('click', function () {
    customPhoto.classList.add('effects__preview--phobos');
  });
  heatPreview.addEventListener('click', function () {
    customPhoto.classList.add('effects__preview--heat');
  });

  var deleteEffect = function () {
  // выдает ошибку если значений более 1
    customPhoto.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  };
  noneEffect.addEventListener('click', deleteEffect);

  // изменение силы эффекта
  var calculateEffectValue = function (evt, minValue, maxValue) {
    var effectValue = minValue + (maxValue - minValue) / effectPin.parentElement.offsetWidth * evt.offsetX;
    return effectValue;
  };

  effectPin.addEventListener('mouseup', function (evt) {
    if (chromePreview.checked) {
      customPhoto.style.filter = 'grayscale' + '(' + calculateEffectValue(evt, 0, 1) + ')';
    } else if (sepiaPreview.checked) {
      customPhoto.style.filter = 'sepia' + '(' + calculateEffectValue(evt, 0, 1) + ')';
    } else if (marvinPreview.checked) {
      customPhoto.style.filter = 'invert' + '(' + calculateEffectValue(evt, 0, 100) + '%' + ')';
    } else if (phobosPreview.checked) {
      customPhoto.style.filter = 'blur' + '(' + 3 / calculateEffectValue(evt, 0, 3) + 'px' + ')';
    } else if (heatPreview.checked) {
      customPhoto.style.filter = 'brightness' + '(' + 3 / calculateEffectValue(evt, 1, 3) + ')';
    }
  });
  // изменение размера изображения
  var smallerImgButton = window.photoEditor.querySelector('.scale__control--smaller');
  var biggerImgButton = window.photoEditor.querySelector('.scale__control--bigger');
  var scaleInput = window.photoEditor.querySelector('.scale__control--value');
  scaleInput.setAttribute('value', '100%');
  var sizeImg = parseInt(window.photoEditor.querySelector('.scale__control--value').value, 10);

  var onResizeButtonsClick = function (size) {
    customPhoto.style.transform = 'scale' + '(' + size / 100 + ')';
    scaleInput.setAttribute('value', size + '%');
  };
  smallerImgButton.addEventListener('click', function () {
    var currentSize = sizeImg - window.generalData.SIZE_PHOTO_STEP;
    if (currentSize <= window.generalData.SIZE_PHOTO_STEP) {
      currentSize = window.generalData.SIZE_PHOTO_STEP;
    }
    sizeImg = currentSize;
    onResizeButtonsClick(sizeImg);
  });
  biggerImgButton.addEventListener('click', function () {
    var currentSize = sizeImg + window.generalData.SIZE_PHOTO_STEP;
    if (currentSize >= window.generalData.MAX_SIZE_PHOTO) {
      currentSize = window.generalData.MAX_SIZE_PHOTO;
    }
    sizeImg = currentSize;
    onResizeButtonsClick(sizeImg);
  });
})();
