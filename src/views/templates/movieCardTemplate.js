import { html } from '../../lib/lit-html.js';

export const movieCardTemplate = (movie) => html`
    <div class="card movie-card">
        <img src=${movie.posterUrl} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <a href="/movies/${movie._id}" class="btn btn-primary">Details</a>
        </div>
    </div>
`;
