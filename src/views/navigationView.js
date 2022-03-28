import page from '../lib/page.js';
import { html, nothing } from '../lib/lit-html.js';

const guestLinks = html`
    <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="/register">Register</a>
    </li>
`;

const privateLinks = html`
    <li class="nav-item">
        <a class="nav-link" href="/collection">My Collection</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="/logout">Logout</a>
    </li>
`;

const searchHandler = (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let search = formData.get('search');

    page.redirect(`/movies?search=${search}`);
}

export const navigationTemplate = ({user, isAuthenticated}) => html`
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Movies</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    ${isAuthenticated
                        ? privateLinks
                        : guestLinks
                    }
                </ul>

                ${isAuthenticated 
                    ? html`
                        <div class="nav-item">
                            <span class="nav-link disabled">${user.username}</span>
                        </div>
                    `
                    : nothing
                }
                
                <form class="d-flex" @submit=${searchHandler}>
                    <input class="form-control me-2" type="search" name="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
`;
