//import { async } from "@vimeo/player";
import axios from "axios";
//axios.defaults.headers.common["x-api-key"] = "39251396-18173d9ed82e61dff39932134";

const urlApi = `https://pixabay.com/api/`;

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
   
    let response = await axios.get(`${urlApi}?${params}`);
   
    return response;
}

export {fetchPict};