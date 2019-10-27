'use strict';
var popularFilterButton = window.filters.querySelector('#filter-popular');
var randomFilterButton = window.filters.querySelector('#filter-random');
var discussedFilterButton = window.filters.querySelector('#filter-discussed');
var DEBOUNCE_TIME = 500; // ms

// функция debounce для устранения дребезга
var debounce = function (f) {
  var lastTimeout = null;
  return function () {
    var parameters = arguments;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      f.apply(null, parameters);
    }, DEBOUNCE_TIME);
  };
};

// функция перемешивания массива
var shuffle = function (arr) {
  var arrCopy = arr.slice(0);
  arrCopy.sort(function () {
    return 0.5 - Math.random();
  });
  var shuffleArr = arrCopy.slice(0, 10);
  return shuffleArr;
};

// функция обновления фотогаллереи
var updatePhotoGallery = function (arr) {
  while (window.setupPhotoCard.querySelector('a')) {
    window.setupPhotoCard.removeChild(window.setupPhotoCard.querySelector('a'));
  }
  window.createPhotoGallery(arr);
};
// функция сортировки массива по комментариям
var sortMostCommentedPhoto = function (arr) {
  var arrCopy = arr.slice(0);
  arrCopy.sort(function (a, b) {
    return a.comments.length - b.comments.length;
  });
  arrCopy.reverse();
  return arrCopy;
};

// функция отображения 10 случайных фото на главной странице
var renderRandomPhoto = function (dataArr) {
  var shuffleGallery = shuffle(dataArr);
  updatePhotoGallery(shuffleGallery);
};
// функция для сортировки карточек по количеству комментариев
var sortPhotoByCommets = function (dataArr) {
  var discussingPhotos = sortMostCommentedPhoto(dataArr);
  updatePhotoGallery(discussingPhotos);
};
// функции для обработчиков
var onPopularButtonClick = function () {
  debounce(updatePhotoGallery(window.photoData.photoCardItems));
};

var onRandomButtonClick = function () {
  debounce(renderRandomPhoto(window.photoData.photoCardItems));
};

var onDiscussedButtonClick = function () {
  debounce(sortPhotoByCommets(window.photoData.photoCardItems));
};


window.sortPhotogallery = function () {
  window.filters.classList.remove('img-filters--inactive');
};
popularFilterButton.addEventListener('click', onPopularButtonClick);
randomFilterButton.addEventListener('click', onRandomButtonClick);
discussedFilterButton.addEventListener('click', onDiscussedButtonClick);
