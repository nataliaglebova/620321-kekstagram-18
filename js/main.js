'use strict';
// функция для генерации случайных чисел
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// функция по генерации комментариев
var commentsTemplates = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var getRandomComment = function () {
  return commentsTemplates[getRandomNumber(0, commentsTemplates.length - 1)];
};

// функция выбора случайного имени комментатора
var names = ['Александр', 'Cергей', 'Ольга', 'Владимир', 'Елена', 'Татьяна', 'Андрей'];
var getRandomName = function () {
  return names[getRandomNumber(0, names.length - 1)];
};

// создание массива объектов комментариев
var commentsList = [];
var PHOTOCARDS_MAX = 25;
for (var i = 0; i < PHOTOCARDS_MAX; i++) {
  commentsList [i] = {
    avatar: 'img/avatar-' + (getRandomNumber(1, 6)) + '.svg',
    message: getRandomComment() + ' ' + getRandomComment(),
    name: getRandomName(),
  };
}

// основной массив из 25 JS объектов
var photoCardItems = [];
for (var j = 0; j < PHOTOCARDS_MAX; j++) {
  photoCardItems[j] = {
    url: 'photos/' + (j + 1) + '.jpg',
    description: 'Some words about photo',
    likes: getRandomNumber(15, 200),
    comments: commentsList[getRandomNumber(0, commentsTemplates.length - 1)]
  };
}
// обращение к шаблону верстки карточки фото
var photoCardTemplate = document.querySelector('#picture').content
    .querySelector('.picture__info');

// функция для копирования и вставки типовых карточек фото

var renderPhotoCard = function (arr, q) {
  var photoCardElement = photoCardTemplate.cloneNode(true);
  // photoCardElement.querySelector('.picture__img').textContent = arr[q].url;
  photoCardElement.querySelector('.picture__likes').textContent = arr[q].likes;
  photoCardElement.querySelector('.picture__comments').textContent = arr[q].comments.message;
  return photoCardElement;
};

// копирование шаблона в нужном количестве
var fragment = document.createDocumentFragment();
for (var k = 0; k < PHOTOCARDS_MAX; k++) {
  fragment.appendChild(renderPhotoCard(photoCardItems, k));
}
// вставка фрагмента
var setupPhotoCard = document.querySelector('.pictures');
setupPhotoCard.appendChild(fragment);
