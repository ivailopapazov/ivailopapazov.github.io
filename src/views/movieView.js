import { html } from '../lib/lit-html.js';
import * as movieService from '../services/movieService.js';
import * as likeService from '../services/likeService.js';

const movieTemplate = (movie, isLiked, onLike, onUnlike) => html`
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src=${movie.posterUrl} class="img-fluid rounded-start" alt=${movie.title}>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.description}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    ${isLiked
                        ? html`<button @click=${onUnlike} class="btn btn-primary">Unlike</button>`
                        : html`<button @click=${onLike} class="btn btn-primary">Like</button>`
                    }
                    
                    <span>Likes: ${movie.likes}</span>
                </div>
            </div>
        </div>
    </div>
`;

export const movieView = async (ctx) => {
    let movieId = ctx.params.movieId;

    const onLike = () => {
        likeService.like(movieId)
            .then(() => {
                ctx.page.redirect(`/movies/${movieId}`);
            });
    }

    const onUnlike = async () => {
        let like = await likeService.getOne(movieId, ctx.user._id);
        await likeService.unLike(like._id);

        ctx.page.redirect(`/movies/${movieId}`);
    }

    let movie = await movieService.getOne(movieId);
    let likes = await likeService.getMovieLikes(movieId);

    movie.likes = likes.length;
    let isLiked = likes.some(x => x._ownerId == ctx.user._id);

    ctx.render(movieTemplate(movie, isLiked, onLike,onUnlike));
};
