'use strict';
(function () {
  // открытие увеличенного каждого фото
  // -- по клику
  var mainBody = document.querySelector('body');

  // разметка комментариев
  window.bigPhotoCard = document.querySelector('.big-picture');
  // обращение к шаблону верстки карточки фото
  var commentsTemplate = document.querySelector('.social__comment');

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
    if (window.currentArrowElem.comments.length <= window.GeneralData.FIRST_COMMENTS_NUMBER) {
      window.extraCommentsLoadButton.classList.add('hidden');
    } else {
      window.extraCommentsLoadButton.classList.remove('hidden');
    }
    loadComments(window.currentArrowElem, commentsNumber, 0);
    return window.currentArrowElem;
  };

  // функция по подгрузке оставшихся комментариев

  window.onExtraCommentsLoadButtonClick = function () {
    if (window.currentArrowElem.comments.length > window.indexOfComment + window.GeneralData.FIRST_COMMENTS_NUMBER) {
      loadComments(window.currentArrowElem, window.indexOfComment + 1 + window.GeneralData.FIRST_COMMENTS_NUMBER, window.indexOfComment + 1);
    } else {
      var remainComments = window.currentArrowElem.comments.length - window.indexOfComment;
      loadComments(window.currentArrowElem, window.indexOfComment + remainComments, window.indexOfComment + 1);
      window.bigPhotoCard.querySelector('.social__comment-count').classList.add('hidden');
      window.extraCommentsLoadButton.classList.add('hidden');
      window.extraCommentsLoadButton.removeEventListener('click', window.onExtraCommentsLoadButtonClick);
    }
  };

  // заполнение карточки просмотра одного фото

  var fillInfoPhotoPreview = function (currentPhoto) {
    window.bigPhotoCard.classList.remove('hidden');
    mainBody.classList.add('modal-open');
    var elementIndex = window.photoData.photoCardItems.indexOf(currentPhoto);
    window.bigPhotoCard.querySelector('.big-picture img').src = currentPhoto.url;
    window.bigPhotoCard.querySelector('.likes-count').textContent = currentPhoto.likes;
    window.bigPhotoCard.querySelector('.comments-count').textContent = currentPhoto.comments.length;
    window.bigPhotoCard.querySelector('.social__caption').textContent = currentPhoto.description;
    window.bigPhotoCard.querySelector('.big-picture img').alt = currentPhoto.description;

    if (currentPhoto.comments.length > window.GeneralData.FIRST_COMMENTS_NUMBER) {
      var commentsAmmount = window.GeneralData.FIRST_COMMENTS_NUMBER;
    } else {
      commentsAmmount = currentPhoto.comments.length;
    }
    window.renderPhotoСomments(window.photoData.photoCardItems, elementIndex, commentsAmmount);
    window.extraCommentsLoadButton.addEventListener('click', window.onExtraCommentsLoadButtonClick);
  };


  var onPhotoImgClick = function (clckevt) {
    if (clckevt.target.tagName === 'IMG') {
      var photoFileName = clckevt.target.src.split('/').pop();
      var photoUrl = 'photos/' + photoFileName;
      var currentPhoto = window.photoData.photoCardItems.find(function (item) {
        return item.url === photoUrl;
      });
      fillInfoPhotoPreview(currentPhoto);
      bigPhotoExit.addEventListener('click', onBigPhotoExitClick);
      document.addEventListener('keydown', onBigPhotoExitPress);
      bigPhotoExit.removeEventListener('keydown', onBigPhotoExitEnter);
    }
  };
  // -- по ENTER
  var onPhotoImgPress = function (presevt) {
    if (presevt.keyCode === window.GeneralData.ENTER_KEYCODE) {
      if (presevt.target.tagName === 'A') {
        window.bigPhotoCard.classList.remove('hidden');
        document.querySelector('body').classList.add('modal-open');
        var loadPhoto = presevt.target.querySelector('img');
        var photoFileName = loadPhoto.src.split('/').pop();
        var photoUrl = 'photos/' + photoFileName;
        var currentPhoto = window.photoData.photoCardItems.find(function (item) {
          return item.url === photoUrl;
        });
        fillInfoPhotoPreview(currentPhoto);
        bigPhotoExit.addEventListener('click', onBigPhotoExitClick);
        document.addEventListener('keydown', onBigPhotoExitPress);
        bigPhotoExit.removeEventListener('keydown', onBigPhotoExitEnter);
      }
    }
  };
  window.setupPhotoCard.addEventListener('click', onPhotoImgClick);
  window.setupPhotoCard.addEventListener('keydown', onPhotoImgPress);

  // закрытие увеличенного фото
  var onBigPhotoExitClick = function () {
    window.bigPhotoCard.classList.add('hidden');
    mainBody.classList.remove('modal-open');
    bigPhotoExit.removeEventListener('click', onBigPhotoExitClick);
  };

  var onBigPhotoExitPress = function (evt) {
    if (evt.keyCode === window.GeneralData.ESC_KEYCODE) {
      window.bigPhotoCard.classList.add('hidden');
      mainBody.classList.remove('modal-open');
      document.removeEventListener('keydown', onBigPhotoExitPress);
    }
  };
  var bigPhotoExit = window.bigPhotoCard.querySelector('.big-picture__cancel');
  var onBigPhotoExitEnter = function (evt) {
    if (evt.keyCode === window.GeneralData.ENTER_KEYCODE && evt.target === bigPhotoExit) {
      window.bigPhotoCard.classList.add('hidden');
      mainBody.classList.remove('modal-open');
      bigPhotoExit.removeEventListener('keydown', onBigPhotoExitEnter);
    }
  };
})();
