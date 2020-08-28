// core version + navigation, pagination modules:
import Swiper, {Navigation, Pagination} from 'swiper';
// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);


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
