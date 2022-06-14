import LocomotiveScroll from "locomotive-scroll";

// Форматирование картинок в WebP
export function isWebp() {
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    let className = support === true ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
}

// Функция, которая выстраивает название компании в "Опыт работы" в колонку, когда длина
// строк достигает опредленного значения
export function columnNamed() {
  const boxes = document.querySelectorAll(".experience__named");

  for (let i = 0; i < boxes.length; i++) {
    const nameBox = boxes[i].querySelector(".experience__name"),
    locationBox = boxes[i].querySelector(".experience__location");

    if (nameBox !== null) {
      if ( (nameBox.textContent.length + locationBox.textContent.length) > 46 ) {
        boxes[i].classList.add("experience__named--column");
      }
    }
  }
}

// Скролл на странице + навигация по пунктам меню
export function scrollTo() {

  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true
  });

  const handleScroll = (id) => {
    let elem = document.getElementById(id);

    scroll.scrollTo(elem, {
      offset: "-100",
      duration: "2000",
    });
  };

  document.querySelector(".header__list").addEventListener("click", (event) => {
    if (event.target.classList.contains("header__link")) {
      event.preventDefault();

      const id = event.target.getAttribute("href").replace("#", "");
      const main = document.querySelector(".main");
      const burger = document.getElementById("burger");

      main.classList.remove("main--block");
      burger.checked = false;

      handleScroll(id);
    }
  });

  document.querySelector(".skills__up").addEventListener("click", (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const id = event.currentTarget.getAttribute("href").replace("#", "");
    handleScroll(id);
  });
}

// Выделение активного элемента меню
export function activeMenuItem() {
const observer = new IntersectionObserver((intersections) => {
  intersections.forEach((intersection) => {
    if (intersection.isIntersecting) {
      document.querySelectorAll(".header__link").forEach((link) => {
        link.classList.toggle("header__link--active",
        link.getAttribute("href").replace("#", "") === intersection.target.id);
      });
    }
  });
}, { threshold: 0.30 });

  document.querySelectorAll(".section").forEach((section) => {
      observer.observe(section);
  });
}

// Блокировка скролла при открытом бургер-меню
export function blockBody() {
  const burger = document.getElementById("burger");
  const main = document.querySelector(".main");
  const label = document.getElementById("label");

  burger.addEventListener("change", function() {
    label.classList.toggle("header__label--active");
    setTimeout(() => { main.classList.toggle("main--block");}, 100);
  });
}

