import * as authService from '../services/authService.js';

export const logoutView = (ctx) => {
    authService.logout()
        .then(() => {
            ctx.page.redirect('/');
        });
};