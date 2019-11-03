'use strict';
// всомогательный модуль по созданию объектов с данными фотокарточек
(function () {
  // создание массива объектов комментариев
  var commentsList = [];
  for (var i = 0; i < window.GeneralData.PHOTOCARDS_MAX * window.GeneralData.FIRST_COMMENTS_NUMBER; i++) {
    commentsList [i] = {
      avatar: 'img/avatar-' + (window.GeneralData.getRandomNumber(1, 6)) + '.svg',
      message: window.GeneralData.getRandomElement(window.GeneralData.commentsTemplates),
      name: window.GeneralData.getRandomElement(window.GeneralData.names),
    };
  }
  // массив комментариев к одному фото
  var onePhotoComments = [];
  for (var n = 0; n < window.GeneralData.FIRST_COMMENTS_NUMBER; n++) {
    onePhotoComments[n] = window.GeneralData.getRandomElement(commentsList);
  }

  // основной массив из 25 JS объектов
  var photoCardItems = [];
  window.photoData = {
    commentsList: commentsList,
    onePhotoComments: onePhotoComments,
    photoCardItems: photoCardItems
  };
}
)();
