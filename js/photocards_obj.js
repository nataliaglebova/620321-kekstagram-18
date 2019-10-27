'use strict';
// всомогательный модуль по созданию объектовс данными фотокарточек
(function () {
  // создание массива объектов комментариев
  var commentsList = [];
  for (var i = 0; i < window.generalData.PHOTOCARDS_MAX * window.generalData.FIRST_COMMENTS_NUMBER; i++) {
    commentsList [i] = {
      avatar: 'img/avatar-' + (window.generalData.getRandomNumber(1, 6)) + '.svg',
      message: window.generalData.getRandomElement(window.generalData.commentsTemplates),
      name: window.generalData.getRandomElement(window.generalData.names),
    };
  }
  // массив комментариев к одному фото
  var onePhotoComments = [];
  for (var n = 0; n < window.generalData.FIRST_COMMENTS_NUMBER; n++) {
    onePhotoComments[n] = window.generalData.getRandomElement(commentsList);
  }

  // основной массив из 25 JS объектов
  var photoCardItems = [];
  /* for (var j = 0; j < window.generalData.PHOTOCARDS_MAX; j++) {
    photoCardItems[j] = {
      url: 'photos/' + (j + 1) + '.jpg',
      description: 'Some words about photo',
      likes: window.generalData.getRandomNumber(15, 200),
      comments: onePhotoComments
    };
  } */
  window.photoData = {
    commentsList: commentsList,
    onePhotoComments: onePhotoComments,
    photoCardItems: photoCardItems
  };
}
)();
