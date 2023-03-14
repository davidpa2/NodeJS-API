import { Router } from 'express';
import { USERS_BBDD } from '../bbdd.js';

const authRouter = Router();

/**
 * Authenticate users
 */
authRouter.post("/authenticate", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);

    try {
        const user = authFunction(email, password);
        return res.send(`Authenticated user: ${user.name}`);
    } catch (error) {
        return res.sendStatus(401);
    }
})

/**
 * Authorize admin users
 */
authRouter.post("/authorize", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send();

    try {
        const user = authFunction(email, password);
        if (user.role !== "admin") return res.sendStatus(403);

        return res.send(`Admin user: ${user.name}`);
    } catch (error) {
        return res.sendStatus(401);
    }
})


function authFunction(email, password) {
    const user = USERS_BBDD.find(user => user.email === email);
    if (!user) throw new Error();

    if (user.password !== password) throw new Error();

    return user;
}


export default authRouter;