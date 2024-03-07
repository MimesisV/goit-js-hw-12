import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import makeMarkup from './js/render-functions.js'
import fetchData from './js/pixabay-api.js'

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('[data-action="load-more"]')

const searchParamsDefaults = {
  key: '12371278-ee82e7e687c0227bfbef9a885',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: "15",
  page: "1"
};

const lightbox = new SimpleLightbox('.gallery a', {
  nav: true,
  captionDelay: 250,
  captionsData: 'alt',
  close: true,
  enableKeyboard: true,
  docClose: true,
});

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function smoothScroll () {
  const itemHeight = gallery.firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: 5 * itemHeight,
    behavior: 'smooth',
  })
}

async function searchImg(params) {
  return await fetchData(params)
    .then(({data}) => {
      let {hits} = data;
      if (hits.length <= 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        searchParamsDefaults.page = 1;
        makeMarkup (hits);  
        lightbox.refresh();
      }
      })
      .catch(error => {
        iziToast.error({
          position: 'topRight',
          message:`Sorry there was an error: ${error}`,
        });
      })
      .finally(() => {
        hideLoader();
      });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  loadMoreBtn.classList.add('is-hidden')
  clearGallery()
  showLoader();
  searchParamsDefaults.q = event.target.elements.search.value.trim();
  const searchParams = new URLSearchParams(searchParamsDefaults);
  searchImg(searchParams);
  loadMoreBtn.classList.remove('is-hidden')
  event.currentTarget.reset();
});

let current_query;

loadMoreBtn.addEventListener('click', async event => {
  searchParamsDefaults.page++;
  current_query = searchParamsDefaults.q;
  showLoader();
  const searchParams = new URLSearchParams(searchParamsDefaults);
  await fetchData(searchParams)
  .then(({data}) => {
    let {hits, totalHits} = data;
    let totalPage = Math.ceil(totalHits / 15);
    
    if (totalPage === searchParamsDefaults.page) {
      loadMoreBtn.classList.add('is-hidden')
      iziToast.error({
        position: 'topRight',
        message:
          "We're sorry, but you've reached the end of search results.",
      });
    } else {
      makeMarkup (hits);  
      lightbox.refresh();
    }
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message:`Sorry there was an error: ${error}`,
      });
    })
    .finally(() => {
      smoothScroll();
      hideLoader();
    });
})
