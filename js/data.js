'use strict';
(function () {
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
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var PHOTOCARDS_MAX = 25;
  var FIRST_COMMENTS_NUMBER = 5;
  var SIZE_PHOTO_STEP = 25;
  var MAX_SIZE_PHOTO = 100;
  var MAX_TAGS = 5;
  var DESCRIPTION_MAX_LENGTH = 140;
  var DEBOUNCE_TIME = 500; // ms
  var EFFECT_MAX_SCALE = 454; // px
  var LOAD_SUCCESS_CODE = 200;
  var LOAD_TIMEOUT = 10000;

  window.GeneralData = {
    commentsTemplates: commentsTemplates,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    names: names,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    PHOTOCARDS_MAX: PHOTOCARDS_MAX,
    FIRST_COMMENTS_NUMBER: FIRST_COMMENTS_NUMBER,
    SIZE_PHOTO_STEP: SIZE_PHOTO_STEP,
    MAX_SIZE_PHOTO: MAX_SIZE_PHOTO,
    MAX_TAGS: MAX_TAGS,
    DESCRIPTION_MAX_LENGTH: DESCRIPTION_MAX_LENGTH,
    DEBOUNCE_TIME: DEBOUNCE_TIME,
    EFFECT_MAX_SCALE: EFFECT_MAX_SCALE,
    LOAD_SUCCESS_CODE: LOAD_SUCCESS_CODE,
    LOAD_TIMEOUT: LOAD_TIMEOUT
  };
})();
