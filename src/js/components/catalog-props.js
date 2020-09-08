let catalogColumns = document.querySelector('.catalog-columns__list');
let catalogGridContent = document.querySelector('.catalog-grid__content');
let columnsBtn = document.querySelectorAll('.catalog-columns__btn');
let catalogFilterItems = document.querySelectorAll('.catalog-filter__item');
let catalogChoice = document.querySelector('.catalog-choice');

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

//добавление кнопки в блок catalog-choice
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
})

//удаление тэгов выбора по одному и по кнопке Clear All
catalogChoice.addEventListener('click', (e) => {
  if (e.target.classList.contains('catalog-choice__item')) {
    e.target.remove();

    let text = e.target.textContent.trimLeft().trimRight();

    //снимаем галочку с item в фильтрах
    catalogFilterItems.forEach(el => {
      if (el.querySelector('.custom-checkbox__text').textContent.trimLeft().trimRight() === text) {
        el.querySelector('label').classList.remove('custom-checkbox--active');
        el.querySelector('input').checked = false;
      }
    })
  }

  //очищаем все по кнопке Clear
  if (e.target.classList.contains('catalog-choice__clear')) {
    Array.from(e.currentTarget.children).forEach(el => {
      if (!el.classList.contains('catalog-choice__clear')) {
        el.remove()
      }
    })

    catalogFilterItems.forEach(el => {
      el.querySelector('input').checked = false;
      el.querySelector('.custom-checkbox').classList.remove('custom-checkbox--active');
    })
  }

  //если остается одна кнопка Clear, то убираем блок catalog-choice
  if (e.currentTarget.children.length === 1) {
    e.currentTarget.classList.remove('fade');
  }
})

