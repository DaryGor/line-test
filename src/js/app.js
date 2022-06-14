const preloader = document.getElementById("preloader");
const loader = document.getElementById("loader");

// Сначала делала прелоадер по стандартной схеме, затем стала учитывать зависимость
// скорость ракеты от загрузки сайта и тут понеслось
// не уверена, что это то, что вы ожидали, ракета двигается дёргано, картинка подгружается не сразу
// но ничего больше не придумала, для меня это экзотическая задача
// нужно дебажить под разные размеры экранов
let images = document.images,
  imagesTotalCount = images.length,
  screenWidth = document.documentElement.clientWidth,
  screenHeight = document.documentElement.clientHeight,
  preloaderWidth = loader.clientWidth,
  preloaderHeight = loader.clientHeight,
  imagesLoadedCount = 0;

for (let i = 0; i < imagesTotalCount; i++) {
  let imageClone = new Image();
  imageClone.src = images[i].src;
  imageClone.onload = imageLoaded;
  imageClone.onerror = imageLoaded;
}

function imageLoaded() {
  imagesLoadedCount++;

  let percScreenWidth = screenWidth / 100;
  let percScreenHeight = screenHeight / 100;
  let speedOneImage = 100 / imagesTotalCount;
  let percDisplay = Math.round(speedOneImage * imagesLoadedCount);

  loader.style.transform = `translate3d(${
    -preloaderWidth + percDisplay * percScreenWidth
  }px, ${preloaderHeight - percDisplay * 1.6 * percScreenHeight}px, 0)`;

  if (imagesLoadedCount >= imagesTotalCount) {
    window.onload = function () {
      setTimeout(function () {
        if (!preloader.classList.contains("preloader__done")) {
          preloader.classList.add("preloader__done");

          setTimeout(function () {
            preloader.style.display = "none";
          }, 1500);
        }
      }, 1000);
    };
  }
}

import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

document.addEventListener("DOMContentLoaded", function () {
  flsFunctions.blockBody();
  flsFunctions.scrollTo();

  if (screen.width > 1025) {
    flsFunctions.activeMenuItem();
  }

  if (screen.width < 1025) {
    flsFunctions.columnNamed();
  }
});
