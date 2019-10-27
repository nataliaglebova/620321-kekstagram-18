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
    for (var k = 0; k < arr.length; k++) {
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
  window.filters = document.querySelector('.img-filters');
  window.socialComments = document.querySelector('.social__comments');

  // функция очистки комментариев из верстки
  var cleanPatternComments = function () {
    while (window.socialComments.firstChild) {
      window.socialComments.removeChild(document.querySelector('.social__comments').firstChild);
    }
  };
  // функция отрисовки комментариев в целом
  var loadComments = function (currentArrowElem, commentsNumber, startPoint) {
    var fragmentComments = document.createDocumentFragment();
    for (var c = startPoint; c < commentsNumber; c++) {
      var photoСommentElement = commentsTemplate.cloneNode(true);
      photoСommentElement.querySelector('.social__picture').src = currentArrowElem.comments[c].avatar;
      photoСommentElement.querySelector('.social__picture').alt = currentArrowElem.comments[c].name;
      var message = currentArrowElem.comments[c].message;
      photoСommentElement.querySelector('.social__text').textContent = message;
      fragmentComments.appendChild(photoСommentElement);
      window.indexOfComment = c;
    }
    document.querySelector('.social__comments').appendChild(fragmentComments);
    return window.indexOfComment;
  };
  window.extraCommentsLoadButton = window.bigPhotoCard.querySelector('.social__comments-loader');
  // функция отрисовки 5 первых комменариев
  window.renderPhotoСomments = function (arr, x, commentsNumber) {
    cleanPatternComments();
    window.currentArrowElem = arr[x];
    if (window.currentArrowElem.comments.length <= window.generalData.FIRST_COMMENTS_NUMBER) {
      window.extraCommentsLoadButton.classList.add('visually-hidden');
    } else {
      window.extraCommentsLoadButton.classList.remove('visually-hidden');
    }
    loadComments(window.currentArrowElem, commentsNumber, 0);
    return window.currentArrowElem;
  };
  // скрытие блока счетчика комментариев
  window.bigPhotoCard.querySelector('.social__comment-count').classList.add('visually-hidden');

  // функция по подгрузке оставшихся коммаентариев
  window.onExtraCommentsLoadButtonClick = function () {
    if (window.currentArrowElem.comments.length > window.indexOfComment + window.generalData.FIRST_COMMENTS_NUMBER) {
      loadComments(window.currentArrowElem, window.indexOfComment + 1 + window.generalData.FIRST_COMMENTS_NUMBER, window.indexOfComment + 1);
    } else {
      var remainComments = window.currentArrowElem.comments.length - window.indexOfComment;
      loadComments(window.currentArrowElem, window.indexOfComment + remainComments, window.indexOfComment + 1);
    }
  };

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
