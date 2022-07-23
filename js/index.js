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
modalOrderForm.submit(function(event) {
  event.preventDefault();
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/todos',
    type: 'POST',
    data: $(this).serialize(),
    success(data) {
      modalOrderTitle.text(`Спасибо ваша заявка прината, номер заявки ` + data.id)
      modalOrderForm.slideUp(300);
    },
    error() {
      modalOrderTitle.text(`Что то пошло не так! Попробуйте позже`)
    }
  })
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
