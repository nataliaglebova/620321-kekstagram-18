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
// bigPhotoCard.classList.remove('hidden');
bigPhotoCard.querySelector('.big-picture img').src = photoCardItems[0].url;
bigPhotoCard.querySelector('.likes-count').textContent = photoCardItems[0].likes;
bigPhotoCard.querySelector('.comments-count').textContent = photoCardItems[0].comments.length;
bigPhotoCard.querySelector('.social__caption').textContent = photoCardItems[0].description;

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
var SCALE_LENGTH = 435;
var START_POINT = 718;
var chromePreview = photoEditor.querySelector('#effect-chrome');
var sepiaPreview = photoEditor.querySelector('#effect-sepia');
var marvinPreview = photoEditor.querySelector('#effect-marvin');
var phobosPreview = photoEditor.querySelector('#effect-phobos');
var heatPreview = photoEditor.querySelector('#effect-heat');
var noneEffect = photoEditor.querySelector('#effect-none');

effectPin.addEventListener('mouseup', function (evt) {
  var currentPosition = evt.screenX;
  if (chromePreview.checked) {
    customPhoto.classList.add('effects__preview--chrome');
    customPhoto.style.filter = 'grayscale' + '(' + (currentPosition - START_POINT) / SCALE_LENGTH + ')';
  } else if (sepiaPreview.checked) {
    customPhoto.classList.add('effects__preview--sepia');
    customPhoto.style.filter = 'sepia' + '(' + (currentPosition - START_POINT) / SCALE_LENGTH + ')';
  } else if (marvinPreview.checked) {
    customPhoto.classList.add('effects__preview--marvin');
    customPhoto.style.filter = 'invert' + '(' + Math.round((currentPosition - START_POINT) / SCALE_LENGTH * 100) + '%' + ')';
  } else if (phobosPreview.checked) {
    customPhoto.classList.add('effects__preview--phobos');
    // как правильно реализовать до 3 рх?
    customPhoto.style.filter = 'blur' + '(' + 3 / ((currentPosition - START_POINT) / SCALE_LENGTH) + 'px' + ')';
  } else if (heatPreview.checked) {
    customPhoto.classList.add('effects__preview--heat');
    // как правильно реализовать от 1 до 3?
    customPhoto.style.filter = 'brightness' + '(' + 3 / ((currentPosition - START_POINT) / SCALE_LENGTH) + ')';
  } else if (noneEffect.checked) {
    // классы почему то не удаляются
    customPhoto.classList.remove();
  }
});

// хэш-тэги
var tagsInput = document.querySelector('.text__hashtags').value;
//  не срабатывает
var tagsList = tagsInput.split('#', 5);
var validateTags = function (arr) {
  for (var x = 0; x < arr.length; x++) {
    if (arr[x].charAt(0) !== '#') {
      tagsInput.setCustomValidity('Хэш-тэг должен начинаться с символа #');
    }
    if (arr[x].length > 20) {
      tagsInput.setCustomValidity('Хэш-тэг не должен быть длинее 20 символов, включая #');
    }
    if (arr[x] === '#') {
      tagsInput.setCustomValidity('Хэш-тэг не должен состоять только из символа #');
    }
  }
};
var submitPhoto = document.querySelector('.img-upload__submit');
submitPhoto.addEventListener('click', function () {
  validateTags(tagsList);
});
