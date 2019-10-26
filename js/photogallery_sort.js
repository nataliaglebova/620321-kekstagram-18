'use strict';
var popularFilterButton = window.filters.querySelector('#filter-popular');
var randomFilterButton = window.filters.querySelector('#filter-random');
var discussedFilterButton = window.filters.querySelector('#filter-discussed');

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

window.sortPhotogallery = function (dataArr) {
  window.filters.classList.remove('img-filters--inactive');

  popularFilterButton.addEventListener('click', function () {
    updatePhotoGallery(dataArr);
  });

  randomFilterButton.addEventListener('click', function () {
    var shuffleGallery = shuffle(dataArr);
    updatePhotoGallery(shuffleGallery);
  });

  discussedFilterButton.addEventListener('click', function () {
    var discussingPhotos = sortMostCommentedPhoto(dataArr);
    updatePhotoGallery(discussingPhotos);

  });
};
