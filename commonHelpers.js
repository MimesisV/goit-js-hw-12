import{S as y,i}from"./assets/vendor-9310f15c.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerpolicy&&(a.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?a.credentials="include":e.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();const L=document.querySelector(".gallery");function d(t){const r=t.reduce((s,o)=>s+`<li class="gallery-item">
              <a href=${o.largeImageURL}> 
              <img class="gallery-img" src =${o.webformatURL} alt=${o.tags}/>
              </a>
              <div class="gallery-text-box">
                <p>Likes: <span class="text-value">${o.likes}</span></p>
                <p>views: <span class="text-value">${o.views}</span></p>
                <p>comments: <span class="text-value">${o.comments}</span></p>
                <p>downloads: <span class="text-value">${o.downloads}</span></p>
              </div>
          </li>`,"");L.insertAdjacentHTML("beforeend",r)}function u(t){return axios.get(`https://pixabay.com/api/?${t}`)}const b=document.querySelector(".form"),m=document.querySelector(".gallery"),p=document.querySelector(".loader"),l=document.querySelector('[data-action="load-more"]'),n={key:"12371278-ee82e7e687c0227bfbef9a885",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:"15",page:"1"},f=new y(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0});function v(){m.innerHTML=""}function g(){p.style.display="block"}function h(){p.style.display="none"}function w(){const t=m.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:5*t,behavior:"smooth"})}async function S(t){return await u(t).then(({data:r})=>{let{hits:s}=r;s.length<=0?i.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}):(n.page=1,d(s),f.refresh())}).catch(r=>{i.error({position:"topRight",message:`Sorry there was an error: ${r}`})}).finally(()=>{h()})}b.addEventListener("submit",t=>{t.preventDefault(),l.classList.add("is-hidden"),v(),g(),n.q=t.target.elements.search.value.trim();const r=new URLSearchParams(n);S(r),l.classList.remove("is-hidden"),t.currentTarget.reset()});l.addEventListener("click",async t=>{n.page++,n.q,g();const r=new URLSearchParams(n);await u(r).then(({data:s})=>{let{hits:o}=s;o<=0?(l.classList.add("is-hidden"),i.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):(d(o),f.refresh())}).catch(s=>{i.error({position:"topRight",message:`Sorry there was an error: ${s}`})}).finally(()=>{w(),h()})});
//# sourceMappingURL=commonHelpers.js.map
