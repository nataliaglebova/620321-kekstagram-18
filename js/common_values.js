'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var LOAD_SUCCESS_CODE = 200;
  var LOAD_TIMEOUT = 10000;

  // функция для генерации случайных чисел
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  // функция генерации случайного элемента массива
  var getRandomElement = function (arr) {
    var j = Math.floor(Math.random() * arr.length);
    return arr[j];
  };

  window.generalData = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    LOAD_SUCCESS_CODE: LOAD_SUCCESS_CODE,
    LOAD_TIMEOUT: LOAD_TIMEOUT,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement
  };
})();
