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
    window.deleteEffect();
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

  window.deleteEffect = function () {
    customPhoto.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  };
  noneEffect.addEventListener('click', window.deleteEffect);

  // изменение эффекта
  var EFFECT_MAX_SCALE = 454;
  var effectLine = window.photoEditor.querySelector('.effect-level__depth');
  // передвижение пина эффектов
  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };
      startCoords = {
        x: moveEvt.clientX
      };
      if ((effectPin.offsetLeft - shift.x) < 0) {
        effectPin.style.left = 0 + 'px';
      } else {
        if ((effectPin.offsetLeft - shift.x) > EFFECT_MAX_SCALE) {
          effectPin.style.left = EFFECT_MAX_SCALE + 'px';
        } else {
          effectPin.style.left = (effectPin.offsetLeft - shift.x) + 'px';
        }
      }
      effectLine.style.width = effectPin.offsetLeft + 'px';
    };
    var calculateEffectValue = function (upevt, minValue, maxValue) {
      var effectValue = minValue + (maxValue - minValue) / (EFFECT_MAX_SCALE / effectPin.offsetLeft);
      return effectValue;
    };
    var onPinMouseUp = function (upevt) {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
      if (chromePreview.checked) {
        customPhoto.style.filter = 'grayscale' + '(' + calculateEffectValue(upevt, 0, 1) + ')';
      } else if (sepiaPreview.checked) {
        customPhoto.style.filter = 'sepia' + '(' + calculateEffectValue(upevt, 0, 1) + ')';
      } else if (marvinPreview.checked) {
        customPhoto.style.filter = 'invert' + '(' + calculateEffectValue(upevt, 0, 100) + '%' + ')';
      } else if (phobosPreview.checked) {
        customPhoto.style.filter = 'blur' + '(' + 3 / calculateEffectValue(upevt, 0, 3) + 'px' + ')';
      } else if (heatPreview.checked) {
        customPhoto.style.filter = 'brightness' + '(' + 3 / calculateEffectValue(upevt, 1, 3) + ')';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
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

  // отображение загружаемого фото
  var photoInput = document.querySelector('.img-upload__input');
  photoInput.addEventListener('change', function () {
    var uploadedPhoto = photoInput.files[0];
    var reader = new FileReader();
    if (uploadedPhoto) {
      reader.readAsDataURL(uploadedPhoto);
    } else {
      customPhoto.src = '';
    }
    reader.addEventListener('load', function () {
      customPhoto.src = reader.result;
    });
  });
})();
