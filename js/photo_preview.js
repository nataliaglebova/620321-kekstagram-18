'use strict';
(function () {
  // открытие увеличенного каждого фото
  // -- по клику
  var onPhotoImgClick = function (clckevt) {
    if (clckevt.target.tagName === 'IMG') {
      window.bigPhotoCard.classList.remove('hidden');
      var photoFileName = clckevt.target.src.split('/').pop();
      var photoUrl = 'photos/' + photoFileName;
      var currentPhoto = window.photoData.photoCardItems.find(function (item) {
        return item.url === photoUrl;
      });
      var elementIndex = window.photoData.photoCardItems.indexOf(currentPhoto);
      window.bigPhotoCard.querySelector('.big-picture img').src = currentPhoto.url;
      window.bigPhotoCard.querySelector('.likes-count').textContent = currentPhoto.likes;
      window.bigPhotoCard.querySelector('.comments-count').textContent = currentPhoto.comments.length;
      window.bigPhotoCard.querySelector('.social__caption').textContent = currentPhoto.description;
      window.bigPhotoCard.querySelector('.big-picture img').alt = currentPhoto.description;
      if (currentPhoto.comments.length > window.generalData.FIRST_COMMENTS_NUMBER) {
        var commentsAmmount = window.generalData.FIRST_COMMENTS_NUMBER;
      } else {
        commentsAmmount = currentPhoto.comments.length;
      }
      window.renderPhotoСomments(window.photoData.photoCardItems, elementIndex, commentsAmmount);
      window.extraCommentsLoadButton.addEventListener('click', window.onExtraCommentsLoadButtonClick);
    }
  };
  // -- по ENTER
  var onPhotoImgPress = function (presevt) {
    if (presevt.keyCode === window.generalData.ENTER_KEYCODE) {
      if (presevt.target.tagName === 'A') {
        window.bigPhotoCard.classList.remove('hidden');
        var loadPhoto = presevt.target.querySelector('img');
        var photoFileName = loadPhoto.src.split('/').pop();
        var photoUrl = 'photos/' + photoFileName;
        var currentPhoto = window.photoData.photoCardItems.find(function (item) {
          return item.url === photoUrl;
        });
        window.bigPhotoCard.querySelector('.big-picture img').src = currentPhoto.url;
        window.bigPhotoCard.querySelector('.likes-count').textContent = currentPhoto.likes;
        window.bigPhotoCard.querySelector('.comments-count').textContent = currentPhoto.comments.length;
        window.bigPhotoCard.querySelector('.social__caption').textContent = currentPhoto.description;
        window.bigPhotoCard.querySelector('.big-picture img').alt = currentPhoto.description;
      }
    }
  };
  window.setupPhotoCard.addEventListener('click', onPhotoImgClick);
  window.setupPhotoCard.addEventListener('keydown', onPhotoImgPress);

  // закрытие увеличенного фото
  var bigPhotoExit = window.bigPhotoCard.querySelector('.big-picture__cancel');
  bigPhotoExit.addEventListener('click', function () {
    window.bigPhotoCard.classList.add('hidden');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.generalData.ESC_KEYCODE) {
      window.bigPhotoCard.classList.add('hidden');
    }
  });
})();
