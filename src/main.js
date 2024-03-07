import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import makeMarkup from './js/render-functions.js'
import fetchData from './js/pixabay-api.js'

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const searchParamsDefaults = {
  key: '12371278-ee82e7e687c0227bfbef9a885',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
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

function searchImg(params) {
  return fetchData(params)
    .then(({ hits }) => {
      if (hits.length > 0) {
        makeMarkup (hits);

        lightbox.refresh();
      } else {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
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
  clearGallery()
  showLoader();
  searchParamsDefaults.q = event.target.elements.search.value.trim();
  const searchParams = new URLSearchParams(searchParamsDefaults);
  searchImg(searchParams);
  event.currentTarget.reset();
});