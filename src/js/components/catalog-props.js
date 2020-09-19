let catalogColumns = document.querySelector('.catalog-columns__list'),
  catalogGridContent = document.querySelector('.catalog-grid__content'),
  columnsBtn = document.querySelectorAll('.catalog-columns__btn'),
  catalogFilterItems = document.querySelectorAll('.catalog-filter__item'),
  catalogChoice = document.querySelector('.catalog-choice'),
  catalogFilters = document.querySelectorAll('.catalog-filter'),
  allQuantityes = document.querySelectorAll('.catalog-filter__quantity'),
  customSelect = document.querySelectorAll('.custom-select');


//счетчик активных чекбоксов в каждой категории фильтра товаров
catalogFilters.forEach(el => {
  el.addEventListener('change', (e) => {
    let countCheckboxesActive = e.currentTarget.querySelectorAll('.custom-checkbox--active').length;

    let quantityCheckboxes = e.currentTarget.querySelector('.catalog-filter__quantity');

    quantityCheckboxes.innerText = countCheckboxesActive;
  })
});


//переключение сетки товаров по 3,4,5 в ряд
columnsBtn.forEach(el => {
  el.addEventListener('click', (e) => {
    let columns = e.target.dataset.columns;

    columnsBtn.forEach(el => {
      el.classList.remove('catalog-columns__btn--current')
    })

    el.classList.add('catalog-columns__btn--current');

    catalogGridContent.dataset.gridColumns = columns;

  })
});

//добавление HTML кнопки в блок catalog-choice
const createChoiceItem = (text) => {
  return (
    `
     <button class="btn-reset catalog-choice__item">
        ${text}
        <svg>
          <use xlink:href="./img/sprite.svg#choice-close"></use>
        </svg>
      </button>
    `
  );
};

//вывод тэгов выбора (блок catalog-choice)
catalogFilterItems.forEach(el => {
  el.querySelector('input').addEventListener('change', () => {

    let checked = el.querySelector('input').checked;

    if (checked) {
      el.querySelector('.custom-checkbox').classList.add('custom-checkbox--active');

      let text = el.querySelector('.custom-checkbox__text').textContent;

      catalogChoice.insertAdjacentHTML('afterbegin', createChoiceItem(text))

    } else {
      el.querySelector('.custom-checkbox').classList.remove('custom-checkbox--active');
    }

    let activeCheckboxses = document.querySelectorAll('.custom-checkbox--active');

    activeCheckboxses.length > 0 ?
      (catalogChoice.classList.add('fade')) :
      (catalogChoice.classList.remove('fade'));
  })
});

//удаление тэгов выбора по одному и по кнопке Clear All
catalogChoice.addEventListener('click', (e) => {
  if (e.target.classList.contains('catalog-choice__item')) {
    e.target.remove();

    let text = e.target.textContent.trimLeft().trimRight();

    //снимаем галочку с item в фильтрах и уменьшаем счетчик активных чекбоксов
    catalogFilterItems.forEach(el => {
      if (el.querySelector('.custom-checkbox__text').textContent.trimLeft().trimRight() === text) {
        //удаляем галочку с чекбокса
        el.querySelector('label').classList.remove('custom-checkbox--active');
        //делаем unchecked
        el.querySelector('input').checked = false;
        //уменьшаем счетчик активных чекбоксов в фильтре
        el.closest('.catalog-filter').querySelector('.catalog-filter__quantity').textContent--;
      }
    })
  }

  //очищаем все по кнопке Clear
  if (e.target.classList.contains('catalog-choice__clear')) {
    //удаляем все элементы, которые не являются кнопкой Clear
    Array.from(e.currentTarget.children).forEach(el => {
      if (!el.classList.contains('catalog-choice__clear')) {
        el.remove()
      }
    })

    //обнуляем все счетчики активных чекбоксов
    allQuantityes.forEach(quantity => {
      quantity.textContent = 0;
    })
    //удаляем галочки со всех чекбоксов
    catalogFilterItems.forEach(el => {
      el.querySelector('input').checked = false;
      el.querySelector('.custom-checkbox').classList.remove('custom-checkbox--active');
    })
  }

  //если остается одна кнопка Clear, то убираем блок catalog-choice
  if (e.currentTarget.children.length === 1) {
    e.currentTarget.classList.remove('fade');
  }
});

//предотвращение дублирования catalog-choice__item при повторном активировании одного и того же чекбокса
catalogFilterItems.forEach(el => {
  el.addEventListener('change', () => {
    if (el.querySelector('input').checked === false) {
      let text = el.querySelector('.custom-checkbox__text').textContent.trimLeft().trimRight();

      catalogChoice.querySelectorAll('button').forEach(el => {
        if (el.textContent.trimRight().trimLeft() === text) {
          el.remove();
        }
      })
    }
  })
});

//customSelect
customSelect.forEach(el => {
  el.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('custom-select--open')

    if (e.target.className === 'custom-select__item') {
      let text = e.target.textContent;
      e.currentTarget.querySelector('.custom-select__top').textContent = text;
    }
  })
})

