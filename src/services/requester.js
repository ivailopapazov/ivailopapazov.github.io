import * as authService from './authService.js';

const request = (method, url, data) => {
    let options = {};
    let token = authService.getToken();
    
    if (method != 'GET') {
        options = {
            method,
            headers: {
                'content-type': 'application/json'
            }
        }
    }

    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token
        }
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    return fetch(url, options)
        .then(res => res.json());
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const patch = request.bind(null, 'PATCH');
export const del = request.bind(null, 'DELETE');