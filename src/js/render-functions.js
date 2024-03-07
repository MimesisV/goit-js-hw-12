const gallery = document.querySelector('.gallery');

export default function makeMarkup (hits) {
    const renderImg = hits.reduce((html, hit) => {
        return (
          html +
          `<li class="gallery-item">
              <a href=${hit.largeImageURL}> 
              <img class="gallery-img" src =${hit.webformatURL} alt=${hit.tags}/>
              </a>
              <div class="gallery-text-box">
                <p>Likes: <span class="text-value">${hit.likes}</span></p>
                <p>views: <span class="text-value">${hit.views}</span></p>
                <p>comments: <span class="text-value">${hit.comments}</span></p>
                <p>downloads: <span class="text-value">${hit.downloads}</span></p>
              </div>
          </li>`
        );
      }, '');

      gallery.innerHTML = renderImg;
}