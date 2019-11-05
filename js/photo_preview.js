'use strict';
(function () {
  var FIRST_COMMENTS_NUMBER = 5;
  var mainBody = document.querySelector('body');
  window.bigPhotoCard = document.querySelector('.big-picture');
  var commentsTemplate = document.querySelector('.social__comment');
  window.extraCommentsLoadButton = window.bigPhotoCard.querySelector('.social__comments-loader');
  var bigPhotoExit = window.bigPhotoCard.querySelector('.big-picture__cancel');

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
      var photoCommentElement = commentsTemplate.cloneNode(true);
      photoCommentElement.querySelector('.social__picture').src = currentArrowElem.comments[c].avatar;
      photoCommentElement.querySelector('.social__picture').alt = currentArrowElem.comments[c].name;
      var message = currentArrowElem.comments[c].message;
      photoCommentElement.querySelector('.social__text').textContent = message;
      fragmentComments.appendChild(photoCommentElement);
      window.indexOfComment = c;
    }
    document.querySelector('.social__comments').appendChild(fragmentComments);
    return window.indexOfComment;
  };

  // функция отрисовки 5 первых комменариев
  window.renderPhotoComments = function (arr, x, commentsNumber) {
    cleanPatternComments();
    window.currentArrowElem = arr[x];
    if (window.currentArrowElem.comments.length <= FIRST_COMMENTS_NUMBER) {
      window.extraCommentsLoadButton.classList.add('hidden');
      window.bigPhotoCard.querySelector('.social__comment-count').textContent = window.currentArrowElem.comments.length + ' из ' + window.currentArrowElem.comments.length + ' комментариев';
    } else {
      window.extraCommentsLoadButton.classList.remove('hidden');
    }
    loadComments(window.currentArrowElem, commentsNumber, 0);
    return window.currentArrowElem;
  };

  // функция по подгрузке оставшихся комментариев
  window.onExtraCommentsLoadButtonClick = function () {
    if (window.currentArrowElem.comments.length > window.indexOfComment + FIRST_COMMENTS_NUMBER) {
      loadComments(window.currentArrowElem, window.indexOfComment + 1 + FIRST_COMMENTS_NUMBER, window.indexOfComment + 1);
      window.bigPhotoCard.querySelector('.social__comment-count').textContent = window.indexOfComment + 1 + ' из ' + window.currentArrowElem.comments.length + ' комментариев';
    } else {
      var remainComments = window.currentArrowElem.comments.length - window.indexOfComment;
      loadComments(window.currentArrowElem, window.indexOfComment + remainComments, window.indexOfComment + 1);
      window.bigPhotoCard.querySelector('.social__comment-count').textContent = window.indexOfComment + 1 + ' из ' + window.currentArrowElem.comments.length + ' комментариев';
      window.extraCommentsLoadButton.classList.add('hidden');
      window.extraCommentsLoadButton.removeEventListener('click', window.onExtraCommentsLoadButtonClick);
    }
  };

  // заполнение карточки просмотра одного фото
  var fillInfoPhotoPreview = function (currentPhoto) {
    window.bigPhotoCard.classList.remove('hidden');
    mainBody.classList.add('modal-open');
    var elementIndex = window.photoCardItems.indexOf(currentPhoto);
    window.bigPhotoCard.querySelector('.big-picture img').src = currentPhoto.url;
    window.bigPhotoCard.querySelector('.likes-count').textContent = currentPhoto.likes;
    window.bigPhotoCard.querySelector('.social__comment-count').textContent = FIRST_COMMENTS_NUMBER + ' из ' + currentPhoto.comments.length + ' комментариев';
    window.bigPhotoCard.querySelector('.social__caption').textContent = currentPhoto.description;
    window.bigPhotoCard.querySelector('.big-picture img').alt = currentPhoto.description;
    if (currentPhoto.comments.length > FIRST_COMMENTS_NUMBER) {
      var commentsAmount = FIRST_COMMENTS_NUMBER;
    } else {
      commentsAmount = currentPhoto.comments.length;
    }
    window.renderPhotoComments(window.photoCardItems, elementIndex, commentsAmount);
    window.extraCommentsLoadButton.addEventListener('click', window.onExtraCommentsLoadButtonClick);
  };


  var onPhotoImgClick = function (clckevt) {
    if (clckevt.target.tagName === 'IMG') {
      var photoFileName = clckevt.target.src.split('/').pop();
      var photoUrl = 'photos/' + photoFileName;
      var currentPhoto = window.photoCardItems.find(function (item) {
        return item.url === photoUrl;
      });
      fillInfoPhotoPreview(currentPhoto);
      bigPhotoExit.addEventListener('click', onBigPhotoExitClick);
      document.addEventListener('keydown', onBigPhotoExitPress);
      bigPhotoExit.addEventListener('keydown', onBigPhotoExitEnter);
    }
  };
  // -- по ENTER
  var onPhotoImgPress = function (presevt) {
    if (presevt.keyCode === window.generalData.ENTER_KEYCODE) {
      if (presevt.target.tagName === 'A') {
        window.bigPhotoCard.classList.remove('hidden');
        document.querySelector('body').classList.add('modal-open');
        var loadPhoto = presevt.target.querySelector('img');
        var photoFileName = loadPhoto.src.split('/').pop();
        var photoUrl = 'photos/' + photoFileName;
        var currentPhoto = window.photoCardItems.find(function (item) {
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
    if (evt.keyCode === window.generalData.ESC_KEYCODE) {
      window.bigPhotoCard.classList.add('hidden');
      mainBody.classList.remove('modal-open');
      document.removeEventListener('keydown', onBigPhotoExitPress);
    }
  };
  var onBigPhotoExitEnter = function (evt) {
    if (evt.keyCode === window.generalData.ENTER_KEYCODE && evt.target === bigPhotoExit) {
      window.bigPhotoCard.classList.add('hidden');
      mainBody.classList.remove('modal-open');
      bigPhotoExit.removeEventListener('keydown', onBigPhotoExitEnter);
    }
  };

})();
