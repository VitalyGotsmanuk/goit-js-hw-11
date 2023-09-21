import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_cIw52yO9a8fNeUPdIT8YDG8Xlbt8EOc9jUsDsC9wCRmyllMjggiyZl3qIkwZ3D0R";

const apiKey = `live_cIw52yO9a8fNeUPdIT8YDG8Xlbt8EOc9jUsDsC9wCRmyllMjggiyZl3qIkwZ3D0R`;
const urlBreeds = `https://api.thecatapi.com/v1/breeds`;
const urlCat = `https://api.thecatapi.com/v1/images/search`;


//  виконує HTTP-запит і повертає проміс із масивом порід - результатом запиту.
function fetchBreeds() {
    return fetch (`${urlBreeds}?api_key${apiKey}`)
    .then (response => {
        if (!response.ok) {
            throw new Error (response.status);
        }
        return response.json();
    })
}

// яка очікує ідентифікатор породи, робить HTTP-запит і повертає проміс із даними про кота - результатом запиту. 
function fetchCatByBreed(breedId) {
    return fetch (`${urlCat}?breed_ids=${breedId}&api_key=${apiKey}`)
    .then (response => {
        if (!response.ok){
            throw new Error (response.status);
        }
        return response.json();
    })
};

export {fetchBreeds, fetchCatByBreed}; // іменований експорт функцій.