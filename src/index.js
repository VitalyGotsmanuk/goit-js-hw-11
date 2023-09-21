console.log(`Hello, cat!`);

//import axios from "axios";
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
//axios.defaults.headers.common["x-api-key"] = "live_cIw52yO9a8fNeUPdIT8YDG8Xlbt8EOc9jUsDsC9wCRmyllMjggiyZl3qIkwZ3D0R";
import Notiflix, { Notify } from 'notiflix'; // Для відображення повідомлень користувачеві

import {fetchBreeds, fetchCatByBreed} from "./js/cat-api";

const element = {
    select: document.querySelector(`.breed-select`),
    loader: document.querySelector(`.loader`),
    error: document.querySelector(`.error`),
    catInfo: document.querySelector(`.cat-info`)
};

const apiKey = `live_cIw52yO9a8fNeUPdIT8YDG8Xlbt8EOc9jUsDsC9wCRmyllMjggiyZl3qIkwZ3D0R`;
const urlBreeds = `https://api.thecatapi.com/v1/breeds`;
const urlCat = `https://api.thecatapi.com/v1/images/search`;

element.select.addEventListener(`change`, onChangeSelect);

element.loader.style.display='none' //не відображає загрузку
element.error.style.display='none' // не відображає помилку

//fetchBreeds()
//renderSelect(breeds)

//формує список порід в селекті для випадаючого списку
function renderSelect (breeds) {
    const markup = breeds
    .map(breed => {
        return `<option value='${breed.id}'>${breed.name}</option>`;
    }).join(``);
    element.select.insertAdjacentHTML(`beforeend`, markup);

    // підключаємо бібіліотеку списку
    new SlimSelect ({
        select: element.select,
    })
};

(function fetchBreedsRender () {
    element.loader.style.display='';
    fetchBreeds()
    .then(breeds => renderSelect (breeds))
    .catch(error => {
        console.log(error);
        Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    })
    .finally(() =>{
        element.loader.style.display='none' //не відображає загрузку
        element.select.style.display='none' //не відображає загрузку
    });
})();

// формує картку з картинкою та описом згідно ТЗ
function renderDesc (breed) {
    //console.log(breed);
    console.log(breed[0].url);
    console.log(breed[0].breeds[0].name);
    console.log(breed[0].breeds[0].description)

    const descript =`<img class="cat-pict" 
                    src='${breed[0].url}' 
                    atl="${breed[0].id}"
                    width="500"/>
        <h2 class="">${breed[0].breeds[0].name}</h2> 
        <p class="">${breed[0].breeds[0].description}</p>
        <p class=""><b>Temperament:</b> ${breed[0].breeds[0].temperament}</p>
        `;
          
    element.catInfo.insertAdjacentHTML(`beforeend`, descript);
};

// Виконується при виборі породи в селекті (подія ченж)
function onChangeSelect (e) {
    element.loader.style.display='';
    element.catInfo.innerHTML = '';

    const breedId = e.target.value;
    //console.log(breedId);

    fetchCatByBreed (breedId)
    .then(breed => renderDesc(breed)) //
    .catch(error => {
        console.log(error);
        Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    })
    .finally(()=>element.loader.style.display=`none`);
}
