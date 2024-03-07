import{S as y,i as l}from"./assets/vendor-9310f15c.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const L=document.querySelector(".gallery");function d(t){const r=t.reduce((a,o)=>a+`<li class="gallery-item">
              <a href=${o.largeImageURL}> 
              <img class="gallery-img" src =${o.webformatURL} alt=${o.tags}/>
              </a>
              <div class="gallery-text-box">
                <p>Likes: <span class="text-value">${o.likes}</span></p>
                <p>views: <span class="text-value">${o.views}</span></p>
                <p>comments: <span class="text-value">${o.comments}</span></p>
                <p>downloads: <span class="text-value">${o.downloads}</span></p>
              </div>
          </li>`,"");L.insertAdjacentHTML("beforeend",r)}function u(t){return axios.get(`https://pixabay.com/api/?${t}`)}const b=document.querySelector(".form"),m=document.querySelector(".gallery"),p=document.querySelector(".loader"),i=document.querySelector('[data-action="load-more"]'),n={key:"12371278-ee82e7e687c0227bfbef9a885",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:"15",page:"1"},f=new y(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0});function v(){m.innerHTML=""}function g(){p.style.display="block"}function h(){p.style.display="none"}function w(){const t=m.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:5*t,behavior:"smooth"})}async function S(t){return await u(t).then(({data:r})=>{let{hits:a}=r;a.length<=0?l.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}):(n.page=1,d(a),f.refresh())}).catch(r=>{l.error({position:"topRight",message:`Sorry there was an error: ${r}`})}).finally(()=>{h()})}b.addEventListener("submit",t=>{t.preventDefault(),i.classList.add("is-hidden"),v(),g(),n.q=t.target.elements.search.value.trim();const r=new URLSearchParams(n);S(r),i.classList.remove("is-hidden"),t.currentTarget.reset()});i.addEventListener("click",t=>{n.page++,n.q,g();const r=new URLSearchParams(n);u(r).then(({data:a})=>{let{hits:o}=a;o<=0?(i.classList.add("is-hidden"),l.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):(d(o),f.refresh())}).catch(a=>{l.error({position:"topRight",message:`Sorry there was an error: ${a}`})}).finally(()=>{w(),h()})});console.log(1);
//# sourceMappingURL=commonHelpers.js.map