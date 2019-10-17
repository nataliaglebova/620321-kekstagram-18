'use strict';
// функция для генерации случайных чисел
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// функция генерации случайного элемента массива
var getRandomElement = function (arr) {
  var j = Math.floor(Math.random() * arr.length);
  return arr[j];
};
// массив типовых комментариев
var commentsTemplates = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
// массив имен комментаторов
var names = ['Александр', 'Cергей', 'Ольга', 'Владимир', 'Елена', 'Татьяна', 'Андрей'];

// создание массива объектов комментариев
var commentsList = [];
var PHOTOCARDS_MAX = 25;
var COMMENTS_NUMBER = 3;
for (var i = 0; i < PHOTOCARDS_MAX * COMMENTS_NUMBER; i++) {
  commentsList [i] = {
    avatar: 'img/avatar-' + (getRandomNumber(1, 6)) + '.svg',
    message: getRandomElement(commentsTemplates),
    name: getRandomElement(names),
  };
}
// массив комментариев к одному фото
var onePhotoComments = [];
for (var n = 0; n < COMMENTS_NUMBER; n++) {
  onePhotoComments[n] = getRandomElement(commentsList);
}

// основной массив из 25 JS объектов
var photoCardItems = [];
for (var j = 0; j < PHOTOCARDS_MAX; j++) {
  photoCardItems[j] = {
    url: 'photos/' + (j + 1) + '.jpg',
    description: 'Some words about photo',
    likes: getRandomNumber(15, 200),
    comments: onePhotoComments
  };
}
// обращение к шаблону верстки карточки фото
var photoCardTemplate = document.querySelector('#picture').content
    .querySelector('.picture');

// функция для копирования и вставки типовых карточек фото
var renderPhotoCard = function (arr, q) {
  var photoCardElement = photoCardTemplate.cloneNode(true);
  photoCardElement.querySelector('.picture__img').src = arr[q].url;
  photoCardElement.querySelector('.picture__likes').textContent = arr[q].likes;
  photoCardElement.querySelector('.picture__comments').textContent = arr[q].comments.length;
  return photoCardElement;
};

// копирование шаблона в нужном количестве
var fragment = document.createDocumentFragment();
for (var k = 0; k < PHOTOCARDS_MAX; k++) {
  fragment.appendChild(renderPhotoCard(photoCardItems, k));
}
// вставка фрагмента
var setupPhotoCard = document.querySelector('.pictures');
setupPhotoCard.appendChild(fragment);

// карточка увеличенной фотографии
var bigPhotoCard = document.querySelector('.big-picture');

// разметка комментариев
// обращение к шаблону верстки карточки фото
var commentsTemplate = document.querySelector('.social__comment');

// функция для копирования и вставки типовых комментариев
var renderPhotoСomments = function (c) {
  var photoСommentElement = commentsTemplate.cloneNode(true);
  photoСommentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  photoСommentElement.querySelector('.social__picture').alt = onePhotoComments[c].name;
  photoСommentElement.querySelector('.social__text').textContent = onePhotoComments[c].message;
  return photoСommentElement;
};

var fragmentComments = document.createDocumentFragment();
for (var c = 0; c < COMMENTS_NUMBER; c++) {
  fragmentComments.appendChild(renderPhotoСomments(c));
}
document.querySelector('.social__comments').appendChild(fragmentComments);

// скрытие блока счетчика комментариев и загрузки новых комментариев
bigPhotoCard.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPhotoCard.querySelector('.comments-loader').classList.add('visually-hidden');

// открытие окна редактора при загрузке изображения
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var uploadField = document.querySelector('#upload-file');
var photoEditor = document.querySelector('.img-upload__overlay');
// сброс значения поля выбора
var uploadPhotoForm = setupPhotoCard.querySelector('.img-upload__form');
// функция закрытия окна
var closePhotoEditor = function () {
  photoEditor.classList.add('hidden');
  uploadPhotoForm.reset();
};
// функция закрытия по ESC
var hashTagsInput = photoEditor.querySelector('.text__hashtags');
var descriptionInput = photoEditor.querySelector('.text__description');
var onPhotoEditorPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && ((evt.target !== hashTagsInput) && (evt.target !== descriptionInput))) {
    closePhotoEditor();
  }
};
// функция закрытия по ENTER
var onEditorExitPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePhotoEditor();
  }
};
// функция открытия окна редактора
var openPhotoEditor = function () {
  photoEditor.classList.remove('hidden');
};

uploadField.addEventListener('change', openPhotoEditor);
document.addEventListener('keydown', onPhotoEditorPress);
var photoEditorExit = photoEditor.querySelector('#upload-cancel');
photoEditorExit.addEventListener('click', closePhotoEditor);
photoEditorExit.addEventListener('keydown', onEditorExitPress);

// применение эффекта для изображения
var effectPin = photoEditor.querySelector('.effect-level__pin');
var customPhoto = photoEditor.querySelector('.img-upload__preview img');
var chromePreview = photoEditor.querySelector('#effect-chrome');
var sepiaPreview = photoEditor.querySelector('#effect-sepia');
var marvinPreview = photoEditor.querySelector('#effect-marvin');
var phobosPreview = photoEditor.querySelector('#effect-phobos');
var heatPreview = photoEditor.querySelector('#effect-heat');
var noneEffect = photoEditor.querySelector('#effect-none');

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
var smallerImgButton = photoEditor.querySelector('.scale__control--smaller');
var biggerImgButton = photoEditor.querySelector('.scale__control--bigger');
var scaleInput = photoEditor.querySelector('.scale__control--value');
scaleInput.setAttribute('value', '100%');
var sizeImg = parseInt(photoEditor.querySelector('.scale__control--value').value, 10);
var SIZE_STEP = 25;
var MAX_SIZE = 100;

var onResizeButtonsClick = function (size) {
  customPhoto.style.transform = 'scale' + '(' + size / 100 + ')';
  scaleInput.setAttribute('value', size + '%');
};
smallerImgButton.addEventListener('click', function () {
  var currentSize = sizeImg - SIZE_STEP;
  if (currentSize <= SIZE_STEP) {
    currentSize = SIZE_STEP;
  }
  sizeImg = currentSize;
  onResizeButtonsClick(sizeImg);
});
biggerImgButton.addEventListener('click', function () {
  var currentSize = sizeImg + SIZE_STEP;
  if (currentSize >= MAX_SIZE) {
    currentSize = MAX_SIZE;
  }
  sizeImg = currentSize;
  onResizeButtonsClick(sizeImg);
});

// хэш-тэги
var tagsField = document.querySelector('.text__hashtags');
var MAX_TAGS = 5;

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
  if (arr.length > MAX_TAGS) {
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
var commentsField = photoEditor.querySelector('.text__description');
var DESCRIPTION_MAX_LENGTH = 140;
var onCommentsFieldChange = function () {
  if (commentsField.value.length > DESCRIPTION_MAX_LENGTH) {
    commentsField.setCustomValidity(' ');
    commentsField.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  }
};
commentsField.addEventListener('change', onCommentsFieldChange);

// отправка формы
var formSubmitButton = uploadPhotoForm.querySelector('.img-upload__submit');

var onformSubmitButtonClick = function () {
  if (tagsField.validity.valid && commentsField.validity.valid) {
    uploadPhotoForm.submit();
  }
};
// отправка по клику
formSubmitButton.addEventListener('click', onformSubmitButtonClick);

// отправка формы при нажатии на кнопку ENTER
var onformSubmitPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && evt.target === formSubmitButton) {
    uploadPhotoForm.submit();
  }
};
formSubmitButton.addEventListener('keydown', onformSubmitPress);

// открытие увеличенного каждого фото
// -- по клику
var onPhotoImgClick = function (clckevt) {
  if (clckevt.target.tagName === 'IMG') {
    bigPhotoCard.classList.remove('hidden');
    var photoFileName = clckevt.target.src.split('/').pop();
    var photoUrl = 'photos/' + photoFileName;
    var currentPhoto = photoCardItems.find(function (item) {
      return item.url === photoUrl;
    });
    bigPhotoCard.querySelector('.big-picture img').src = currentPhoto.url;
    bigPhotoCard.querySelector('.likes-count').textContent = currentPhoto.likes;
    bigPhotoCard.querySelector('.comments-count').textContent = currentPhoto.comments.length;
    bigPhotoCard.querySelector('.social__caption').textContent = currentPhoto.description;
    bigPhotoCard.querySelector('.big-picture img').alt = currentPhoto.description;
  }
};
// -- по ENTER
var onPhotoImgPress = function (presevt) {
  if (presevt.keyCode === ENTER_KEYCODE) {
    if (presevt.target.tagName === 'A') {
      bigPhotoCard.classList.remove('hidden');
      var loadPhoto = presevt.target.querySelector('img');
      var photoFileName = loadPhoto.src.split('/').pop();
      var photoUrl = 'photos/' + photoFileName;
      var currentPhoto = photoCardItems.find(function (item) {
        return item.url === photoUrl;
      });
      bigPhotoCard.querySelector('.big-picture img').src = currentPhoto.url;
      bigPhotoCard.querySelector('.likes-count').textContent = currentPhoto.likes;
      bigPhotoCard.querySelector('.comments-count').textContent = currentPhoto.comments.length;
      bigPhotoCard.querySelector('.social__caption').textContent = currentPhoto.description;
      bigPhotoCard.querySelector('.big-picture img').alt = currentPhoto.description;
    }
  }
};
setupPhotoCard.addEventListener('click', onPhotoImgClick);
setupPhotoCard.addEventListener('keydown', onPhotoImgPress);

// закрытие увеличенного фото
var bigPhotoExit = bigPhotoCard.querySelector('.big-picture__cancel');
bigPhotoExit.addEventListener('click', function () {
  bigPhotoCard.classList.add('hidden');
});
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    bigPhotoCard.classList.add('hidden');
  }
});
