console.log(`Hello, pict!`);

import Notiflix, { Notify } from 'notiflix'; 
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import {fetchPict} from '/src/js/getapi';
import {createMarkup} from '/src/js/cardsmaker';

const lightbox = new SimpleLightbox('.photo-card a', { 
    captionsData: `alt`, 
    captionDelay: 1500,
}); 

const element = {
    search: document.querySelector(`#search-form`),
    btnSubmit: document.querySelector(`.js-submit`),
    list: document.querySelector(`.gallery`),
    loadMore: document.querySelector(`.js-load-more`),
};

let perPage = 40;
let page;
let totalPages;
let searchQuery = ``;

element.search.addEventListener(`submit`, handlerSearch);

async function handlerSearch(evt) {
    evt.preventDefault();
    element.loadMore.classList.replace(`load-more`, `load-more-hidden`);
    element.list.innerHTML = ``;
    page = 1;
    
    searchQuery = evt.currentTarget.elements.searchQuery.value;
    //console.log(searchQuery);

    if (searchQuery === ""){ 
        Notify.warning(`Attention! Field must be filled.`);} 
    else {

    await fetchPict(searchQuery, perPage, page)
    .then((response) => {
        // console.log(response.data);
        // console.log(response.data.hits);
        // console.log(response.data.totalHits);
                
        totalPages = Math.ceil(response.data.totalHits/perPage);    
        // console.log(totalPages);  
        
        if(response.data.totalHits === 0) {
            Notify.warning(`Sorry, there are no images matching your search query. Please try again.`);
        } else {
            Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    
        element.list.insertAdjacentHTML(`beforeend`, createMarkup(response.data.hits));
        lightbox.refresh();
        
        if (page < totalPages){
            element.loadMore.classList.replace(`load-more-hidden`, `load-more`)
        }}
    })}
};

element.loadMore.addEventListener(`click`, handlerLoadMore);

async function handlerLoadMore(){
    page +=1;
    // console.log(page)
    await fetchPict(searchQuery, perPage, page)
    .then((response) => {
        element.list.insertAdjacentHTML(`beforeend`, createMarkup(response.data.hits));
        lightbox.refresh();

        if (page >= totalPages){
            Notify.info(`Sorry, there are no images matching your search query. Please try again.`);
            element.loadMore.classList.replace(`load-more`, `load-more-hidden`);
            }
        else
        {element.loadMore.classList.replace(`load-more-hidden`, `load-more`)}
    })
    .catch((_err) => {
        element.loadMore.classList.replace("load-more", "load-more-hidden");
    })
}