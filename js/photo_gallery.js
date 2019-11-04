'use strict';

// обращение к шаблону верстки карточки фото
(function () {
  var photoCardTemplate = document.querySelector('#picture').content
    .querySelector('.picture');
  window.filters = document.querySelector('.img-filters');
  window.socialComments = document.querySelector('.social__comments');
  window.setupPhotoCard = document.querySelector('.pictures');

  // функция для копирования и вставки типовых карточек фото
  var renderPhotoCard = function (arr, q) {
    var photoCardElement = photoCardTemplate.cloneNode(true);
    photoCardElement.querySelector('.picture__img').src = arr[q].url;
    photoCardElement.querySelector('.picture__likes').textContent = arr[q].likes;
    photoCardElement.querySelector('.picture__comments').textContent = arr[q].comments.length;
    return photoCardElement;
  };

  // копирование шаблона в нужном количестве
  window.createPhotoGallery = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < arr.length; k++) {
      fragment.appendChild(renderPhotoCard(arr, k));
    }
    window.setupPhotoCard.appendChild(fragment);
  };
}
)();
