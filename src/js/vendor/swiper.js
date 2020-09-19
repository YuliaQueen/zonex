// core version + navigation, pagination modules:
import Swiper, {Navigation, Pagination} from 'swiper';
// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

//slider for main-page

const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: '.banner-pag',
    type: "bullets",
    clickable: true
  },
})

//slider for catalog-page
const swiperCatalog = new Swiper('.swiper-container__catalog', {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.hero-next-btn',
    prevEl: '.hero-prev-btn'
  }
})
