import { html } from '../lib/lit-html.js';
import * as authService from '../services/authService.js';

const registerTemplate = (registerHandler) => html`
    <div class="login-page">
        <h1>Register Page</h1>
    
        <form @submit=${registerHandler}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="username" name="username" class="form-control" id="username">
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    </div>
`;

export const registerView = (ctx) => {
    const registerHandler = (e) => {
        e.preventDefault();

        let { email, password, username } = Object.fromEntries(new FormData(e.currentTarget));

        authService.register(email, password, username)
            .then(user => {
                ctx.page.redirect('/');
                console.log('User is registered');
            });
    };

    ctx.render(registerTemplate(registerHandler));
};