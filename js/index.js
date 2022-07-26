const presentBtn = $('.present__btn');
const modalOrder = $('.modal-order');
const modalOrderClose = $('.modal-order__close');
const modalOrderInput = $('.modal-order__input');
const modalOrderTitle = $('.modal-order__title');
const modalOrderForm = $('.modal-order__form');
const headerBurger = $('.header__burger');

presentBtn.on('click', function() {
  modalOrder.show(300);
});
modalOrderClose.on('click', function() {
  modalOrder.hide(300);
});

modalOrderInput.on('focus', function() {
  modalOrderTitle.text(`Введите ${$(this).attr('placeholder').toLowerCase()}`);
});
modalOrderInput.on('blur', function() {
  modalOrderTitle.text(`Заполните форму`);
});

const cityOpen = document.querySelector('.js-city-open');
const city = document.querySelector('.city');

cityOpen.addEventListener('click', () => {
  city.classList.add('city_open')
});

city.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target.closest('.city__choice');
  if (target) {
    cityOpen.textContent = target.textContent;
    city.classList.remove('city_open');
  }
});

headerBurger.on('click', function() {
  $('.navigation').animate({
    left: 0,
  }, 500, function() {
    $('.navigation__close').animate({
      opacity: 1,
    },300, 'swing')
  })
})
function hideMenu() {
  $('.navigation').animate({
    left: -400,
  }, 500, function() {
    $('.navigation__close').animate({
      opacity: 0,
    },300, 'swing')
  })
}

$('.navigation__close').on('click', hideMenu)
$(document).click(function (e) {
  if (!headerBurger.is(e.target) && !$('.navigation').is(e.target)) {
    hideMenu();
  };
});

$('.header__sign, .header__sign2').click(() => {
  $('.alert').attr("role", "alert");

  $('.alert').addClass('visible');
  setTimeout(() => {
    $('.alert').removeClass('visible');

    $('.alert').removeAttr("role", "alert");

  }, 3000)
})
const characteristicsListElem = document.querySelector('.characteristics__list');
const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

characteristicsItemElems.forEach(elem => {
  if (elem.children[1].classList.contains('active')) {
    elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;
  }
})

const open = (button, dropDown) => {
  closeAllDrops(button, dropDown);
  button.ariaExpanded = true;

  dropDown.style.height = `${dropDown.scrollHeight}px`;
  button.classList.add('active');
  dropDown.classList.add('active');
};

const close = (button, dropDown) => {
  button.ariaExpanded = false;
  button.classList.remove('active');
  dropDown.classList.remove('active');
  dropDown.style.height = '';
};

const closeAllDrops = (button, dropDown) => {
  characteristicsItemElems.forEach((elem) => {
    if (elem.children[0] !== button && elem.children[1] !== dropDown) {

      close(elem.children[0], elem.children[1]);
    }
  })
}

characteristicsListElem.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('characteristics__title')) {
    const parent = target.closest('.characteristics__item');
    const description = parent.querySelector('.characteristics__description');
    if (description.classList.contains('active')) {
      close(target, description);
    } else {
      open(target, description);
    }
  }
});

const coockieAlert = document.querySelector('.alert-cookie');
const coockieButton = document.querySelector('.alert-cookie__button');
coockieButton.addEventListener('click', () => {
  coockieAlert.classList.remove('alert-cookie_no-ready');
  Cookies.set('dom-ready-cookie', 'true', {
    expires: 10,
  })
});
if (!Cookies.get('dom-ready-cookie')) {
  coockieAlert.classList.add('alert-cookie_no-ready');
}
const inputTel = document.querySelector('.modal-order__input_tel');
const telMask = new Inputmask('+7 (999)-999-99-99');
telMask.mask(inputTel);
const inputValid = new JustValidate('.modal-order__form');
inputValid
  .addField('.modal-order__input', [
    {
      rule: 'required',
      errorMessage: 'Укажите ваше имя'
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Не короче 3 символов'
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Слишком длинное'
    }

  ])
  .addField('.modal-order__input_email', [
    {
      rule: 'required',
      errorMessage: 'Укажите ваш email'
    },
    {
      rule: 'email',
      errorMessage: 'email не корректен'
    },
  ])
  .addField('.modal-order__input_email', [
    {
      rule: 'required',
      errorMessage: 'Укажите ваш email'
    },
    {
      rule: 'email',
      errorMessage: 'email не корректен'
    },
  ])
  .onSuccess(event => {
    const target = event.target;
    axios.post('https://jsonplaceholder.typicode.com/post', {
      name: target.name.value,
      tel: inputTel.inputmask.unmaskedvalue(),
      email: target.email.value,
    })
    .then(response => {
      target.reset();
      modalOrderTitle.textContent = `Спасибо ваша заявка прината, номер заявки ${response.data.id}`
    })
    .catch(err => {
      modalOrderTitle.textContent = `Что то пошло не так!`
    })
  });

new Swiper('.swiper', {
  loop: true,
  autoPlay: {
    delay: 3000,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.button-right',
    prevEl: '.button-left',
  },
});

$('.acc__list').accordion({
  active: true,
  collapsible: true,
  heightStyle: 'content',
  icons: {
    header: 'acc__accord',
    activeHeader: 'acc__accord acc__accord-active'
  }
});