let catalogFilterTop = document.querySelectorAll('.catalog-filter__top');
let hideFilters = document.querySelector('.hide-filters');

catalogFilterTop.forEach(el => {
  el.addEventListener('click', (e) => {
    e.currentTarget.closest('.catalog-filter').classList.toggle('catalog-filter--open')
  })
})

hideFilters.addEventListener('click', (e) => {
  catalogFilterTop.forEach(el => {
    el.closest('.catalog-filter').classList.remove('catalog-filter--open')
  })
})
