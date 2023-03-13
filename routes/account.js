import express from 'express';
import { USERS_BBDD } from '../bbdd.js';

const accountRouter = express.Router();

// Middleware creation
accountRouter.use((req, res, next) => {
    console.log(req.ip);
    // Next works as a callback
    next();
})

/**
 * Get all accounts
 */
accountRouter.get('/account/getAll', (req, res) => {
    return res.send(USERS_BBDD)
});

/**
 * Get account by guid
 */
accountRouter.get('/account/:guid', (req, res) => {
    const guid = req.params.guid;
    const user = USERS_BBDD.find(user => user.guid === guid);

    if (!user) return res.status(404).send();

    return res.send(user);
});

/**
 * Create a new account
 */
accountRouter.post('/account', (req, res) => {
    const { guid, name } = req.body;

    if (!name || !guid) return res.state(400).send();

    const user = USERS_BBDD.find(user => user.guid === guid);

    if (user) return res.status(409).send();

    USERS_BBDD.push({
        guid, name
    })

    return res.send();
});

/**
 * Update an account
 */
accountRouter.patch('/account/:guid', (req, res) => {
    const { guid } = req.params;
    const { name } = req.body;

    if (!name) return res.state(400).send();

    const user = USERS_BBDD.find(user => user.guid === guid);

    if (!user) res.status(404).send();

    user.name = name;

    return res.send();
});

/**
 * Delete an account
 */
accountRouter.delete('/account/:guid', (req, res) => {
    const guid = req.params.guid;
    const userIndex = USERS_BBDD.findIndex(user => user.guid === guid);

    if (userIndex === -1) return res.status(404).send();

    USERS_BBDD.splice(userIndex, 1);

    return res.send();
});

export default accountRouter;