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
  window.setupPhotoCard = document.querySelector('.pictures');
  window.createPhotoGallery = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < window.generalData.PHOTOCARDS_MAX; k++) {
      fragment.appendChild(renderPhotoCard(arr, k));
      window.setupPhotoCard.appendChild(fragment);
    }
  };
  // window.createPhotoGallery(window.photoData.photoCardItems);

  // разметка комментариев
  // обращение к шаблону верстки карточки фото
  var commentsTemplate = document.querySelector('.social__comment');

  // функция для копирования и вставки типовых комментариев
  /*  var renderPhotoСomments = function (c) {
    var photoСommentElement = commentsTemplate.cloneNode(true);
    photoСommentElement.querySelector('.social__picture').src = 'img/avatar-' + window.generalData.getRandomNumber(1, 6) + '.svg';
    photoСommentElement.querySelector('.social__picture').alt = window.photoData.onePhotoComments[c].name;
    photoСommentElement.querySelector('.social__text').textContent = window.photoData.onePhotoComments[c].message;
    return photoСommentElement;
  };*/
  // функция по генерации фото в галлереи
  window.socialComments = document.querySelector('.social__comments');

  window.renderPhotoСomments = function (arr, x) {
    var fragmentComments = document.createDocumentFragment();
    while (window.socialComments.firstChild) {
      window.socialComments.removeChild(document.querySelector('.social__comments').firstChild);
    }
    var currentArrowElem = arr[x];
    if (currentArrowElem.comments.length > window.generalData.COMMENTS_NUMBER) {
      var commentsAmmount = window.generalData.COMMENTS_NUMBER;
    } else {
      commentsAmmount = currentArrowElem.comments.length;
    }
    for (var c = 0; c < commentsAmmount; c++) {
      var photoСommentElement = commentsTemplate.cloneNode(true);
      photoСommentElement.querySelector('.social__picture').src = currentArrowElem.comments[c].avatar;
      photoСommentElement.querySelector('.social__picture').alt = currentArrowElem.comments[c].name;
      var message = currentArrowElem.comments[c].message;
      photoСommentElement.querySelector('.social__text').textContent = message;
      fragmentComments.appendChild(photoСommentElement);
    }
    document.querySelector('.social__comments').appendChild(fragmentComments);
  };

  // скрытие блока счетчика комментариев и загрузки новых комментариев
  window.bigPhotoCard.querySelector('.social__comment-count').classList.add('visually-hidden');
  window.bigPhotoCard.querySelector('.comments-loader').classList.add('visually-hidden');
  // функция по отрисовке ошибки загрузки фотографии

  window.errorLoadPhotoGallery = function () {
    // окно ошибки
    var errorTemplate = document.querySelector('#error').content
      .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var fragmentError = document.createDocumentFragment();
    fragmentError.appendChild(errorElement);
    document.querySelector('main').appendChild(fragmentError);
    var errorCloseButton = document.querySelector('.error__button');
    // закрытие окна
    errorCloseButton.addEventListener('click', function () {
      document.querySelector('.error').remove();
    });
  };
}
)();
