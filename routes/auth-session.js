import { Router } from "express";
import { nanoid } from "nanoid";
import authFunction from '../helpers/authHelper.js'

const sessions = [];
const authSessionRouter = Router();

authSessionRouter.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);

    try {
        authFunction(email, password);

        const sessionId = nanoid();
        sessions.push({sessionId});

        res.cookie('sessionId', sessionId, {
            httpOnly: true, 
        })

        return res.send();
    } catch (error) {
        return res.sendStatus(401);
    }
})

authSessionRouter.get("/profile", (req, res) => {
    console.log(req.cookies);
    return res.send();
})

export default authSessionRouter;