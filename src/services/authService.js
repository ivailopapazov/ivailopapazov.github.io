// const baseUrl = 'http://localhost:3030/users';
const baseUrl = 'https://softuni-movie-api.herokuapp.com/users';

const USER_KEY = 'user';

const save = (user) => {
    if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
};

export const login = (email, password) => {
    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .then(user => {
            save(user);

            return user;
        });
};

export const register = (email, password, username) => {
    return fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password, username })
    })
        .then(res => res.json())
        .then(user => {
            save(user);

            return user;
        });
};

export const isAuthenticated = () => {
    let user = localStorage.getItem(USER_KEY);

    return Boolean(user.accessToken);
};

export const getUser = () => {
    let serializedUser = localStorage.getItem(USER_KEY);

    if (serializedUser) {
        let user = JSON.parse(serializedUser);

        return user;
    }
}

export const getToken = () => {
    let user = getUser();

    return user?.accessToken;
};

export const logout = () => {
    let accessToken = localStorage.getItem('accessToken');

    return fetch(`${baseUrl}/logout`, {
        headers: {
            'X-Authorization': accessToken
        }
    })
        .then(res => {
            console.log(res);

            localStorage.clear();
        });
};