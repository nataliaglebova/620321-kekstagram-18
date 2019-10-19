'use strict';

// обращение к шаблону верстки карточки фото
(function () {
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
  for (var k = 0; k < window.generalData.PHOTOCARDS_MAX; k++) {
    fragment.appendChild(renderPhotoCard(window.photoData.photoCardItems, k));
  }
  // вставка фрагмента
  window.setupPhotoCard = document.querySelector('.pictures');
  window.setupPhotoCard.appendChild(fragment);


  // карточка увеличенной фотографии
  window.bigPhotoCard = document.querySelector('.big-picture');

  // разметка комментариев
  // обращение к шаблону верстки карточки фото
  var commentsTemplate = document.querySelector('.social__comment');

  // функция для копирования и вставки типовых комментариев
  var renderPhotoСomments = function (c) {
    var photoСommentElement = commentsTemplate.cloneNode(true);
    photoСommentElement.querySelector('.social__picture').src = 'img/avatar-' + window.generalData.getRandomNumber(1, 6) + '.svg';
    photoСommentElement.querySelector('.social__picture').alt = window.photoData.onePhotoComments[c].name;
    photoСommentElement.querySelector('.social__text').textContent = window.photoData.onePhotoComments[c].message;
    return photoСommentElement;
  };

  var fragmentComments = document.createDocumentFragment();
  for (var c = 0; c < window.generalData.COMMENTS_NUMBER; c++) {
    fragmentComments.appendChild(renderPhotoСomments(c));
  }
  document.querySelector('.social__comments').appendChild(fragmentComments);

  // скрытие блока счетчика комментариев и загрузки новых комментариев
  window.bigPhotoCard.querySelector('.social__comment-count').classList.add('visually-hidden');
  window.bigPhotoCard.querySelector('.comments-loader').classList.add('visually-hidden');
}
)();
