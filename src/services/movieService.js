import * as request from './requester.js';

// const baseUrl = 'http://localhost:3030/data/movies';
const baseUrl = 'https://softuni-movie-api.herokuapp.com/data/movies';
const PAGE_SIZE = 5;

export const getAll = (search, page) => {
    let query = [];

    if (search) {
        let searchQuery = 'where=' + encodeURIComponent(`title LIKE "${search}"`)

        query.push(searchQuery);
    }

    if (page) {
        query.push(`offset=${(page - 1) * PAGE_SIZE}`);
        query.push(`pageSize=${PAGE_SIZE}`);
    }
    
    let querystring = query.length ? `?${query.join('&')}` : '';

    return fetch(baseUrl + querystring).then(res => res.json())
};

export const getCount = () => request.get(`${baseUrl}?count`);

export const getOne = (movieId) => fetch(`${baseUrl}/${movieId}`).then(res => res.json());
