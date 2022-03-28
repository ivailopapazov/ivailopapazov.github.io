import { html, nothing } from '../lib/lit-html.js';

import * as movieService from '../services/movieService.js';
import { movieCardTemplate } from './templates/movieCardTemplate.js';

const previousPage = (current) => Math.max(1, current - 1);
const nextPage = (current) => current + 1;

const homeTemplate = (movies, page) => html`
    <h1>Movie List</h1>
    
    <div class="movie-list">
        ${movies.map(x => movieCardTemplate(x))}
    </div>
    
    <nav class="pagination" aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item ${page == 1 ? 'disabled' : nothing}"><a class="page-link" href="/movies?page=${previousPage(page)}">Previous</a></li>
            ${paginationBuilder(page).map(x => 
                html`<li class="page-item ${page == x ? 'active' : nothing}"><a class="page-link" href="/movies?page=${x}">${x}</a></li>`
            )}
            <li class="page-item"><a class="page-link" href="/movies?page=${nextPage(page)}">Next</a></li>
        </ul>
    </nav>
`;

function paginationBuilder(page, count, pageSize) {
    let firstPage = Math.max(page - 1, 1);

    return [firstPage, firstPage + 1, firstPage + 2];
} 

export const homeView = (ctx) => {
    let searchParams = new URLSearchParams(ctx.querystring);

    const page = Number(searchParams.get('page'));

    Promise.all([
        movieService.getCount(),
        movieService.getAll(searchParams.get('search'), page || 1)
    ])
        .then(([movieCount, movies]) => {
            ctx.render(homeTemplate(movies, page, movieCount));
        });
};