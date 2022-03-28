import * as authService from '../services/authService.js';

export const authMiddleware = (ctx, next) => {
    let user = authService.getUser();
    
    ctx.user = user
    ctx.isAuthenticated = Boolean(user?.username);

    next();
};