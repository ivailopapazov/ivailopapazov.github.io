import { html } from '../lib/lit-html.js';
import * as authService from '../services/authService.js';

const loginTemplate = (loginHandler) => html`
    <div class="login-page">
        <h1>Login Page</h1>
    
        <form @submit=${loginHandler}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
`;

export const loginView = (ctx) => {
    const loginHandler = (e) => {
        e.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(e.currentTarget));

        authService.login(email, password)
            .then(user => {
                ctx.page.redirect('/');
                console.log('User is logged in');
            });
    };

    ctx.render(loginTemplate(loginHandler));
};