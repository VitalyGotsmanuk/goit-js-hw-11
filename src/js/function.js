import axios from "axios";
//axios.defaults.headers.common["x-api-key"] = "39251396-18173d9ed82e61dff39932134";

console.log(axios);

const urlApi = `https://pixabay.com/api/`;

// async function fetchPict(searchQuery, perPage, page){
//   const params = new URLSearchParams ({
//         q: searchQuery,
//         key: `39251396-18173d9ed82e61dff39932134`,
//         image_type: `photo`,
//         orientation: `horizontal`,
//         safesearch: `true`,
//         page: page,
//         per_page: perPage,
//   });
//   return response = await axios(`${urlApi}?${params}`)
// };

async function fetchPict(searchQuery, perPage, page){
  const params = new URLSearchParams ({
        q: searchQuery,
        key: `39251396-18173d9ed82e61dff39932134`,
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: `true`,
        page: page,
        per_page: perPage,
  });
  const response = await fetch(`${urlApi}?${params}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

// function fetchPict(searchQuery, perPage, page){
//     const params = new URLSearchParams ({
//         q: searchQuery,
//         key: `39251396-18173d9ed82e61dff39932134`,
//         image_type: `photo`,
//         orientation: `horizontal`,
//         safesearch: `true`,
//         page: page,
//         per_page: perPage,
//     });
//     return fetch (`${urlApi}?${params}`) 
//    // resp = axios.get(`${urlApi}?${params}`)
//     .then (response => {
//         if (!response.ok) {
//             throw new Error (response.status);
//         }
//         return response.json();
// })
// }

/*
webformatURL - посилання на маленьке зображення для списку карток.
largeImageURL - посилання на велике зображення.
tags - рядок з описом зображення. Підійде для атрибуту alt.
likes - кількість лайків.
views - кількість переглядів.
comments - кількість коментарів.
downloads - кількість завантажень.
*/

function createMarkup(arr) {
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads})=>
    `
    <div class="photo-card">
        <a class="photo-link" href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" width="320" height="200";
          /></a>
          <div class="info">
            <p class="info-item">
              <b>Likes: </b>${likes}
            </p>
            <p class="info-item">
              <b>Views: </b>${views}
            </p>
            <p class="info-item">
              <b>Comments: </b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads: </b>${downloads}
            </p>
          </div>
      </div>
    `
    ).join(``);
};

export {createMarkup, fetchPict};