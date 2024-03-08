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
  per_page: 15,
  page: 1
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
    top: 2 * itemHeight,
    behavior: 'smooth',
  })
}

function errorMassage (error) {
  iziToast.error({
    position: 'topRight',
    message: `Sorry there was an error: ${error}`,
  });
}

async function searchImg(params) {
  try {
    showLoader();
    const {data} = await fetchData(params);
    let {hits} = data;
    if (hits.length === 0) {
      iziToast.error({
        position: 'topRight',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      searchParamsDefaults.page = 1;
      makeMarkup(hits);
      loadMoreBtn.classList.remove('is-hidden')
      lightbox.refresh();
    }
  } catch (error) {
    errorMassage(error);
  } finally {
    hideLoader();
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  searchParamsDefaults.page = 1;
  loadMoreBtn.classList.add('is-hidden')
  clearGallery()
  showLoader();
  searchParamsDefaults.q = event.target.elements.search.value.trim();
  const searchParams = new URLSearchParams(searchParamsDefaults);
  searchImg(searchParams);

  event.currentTarget.reset();
});

let current_query;

loadMoreBtn.addEventListener('click', async event => {
  searchParamsDefaults.page++;
  current_query = searchParamsDefaults.q;
  showLoader();
  const searchParams = new URLSearchParams(searchParamsDefaults);
  
  try {
    const { data } = await fetchData(searchParams);
    let { hits, totalHits } = data;
    let totalPage = Math.ceil(totalHits / 15);
    
    if (hits.length === 0 || totalPage === searchParamsDefaults.page) {
      loadMoreBtn.classList.add('is-hidden');
      if (hits.length === 0) {
        iziToast.error({
          position: 'topRight',
          message: "We're sorry, but no results were found.",
        });
      } else {
        iziToast.error({
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    } else {
      makeMarkup(hits);  
      lightbox.refresh();
    }
  } catch (error) {
    errorMassage(error);
  } finally {
    smoothScroll();
    hideLoader();
  }
});

