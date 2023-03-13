console.clear();
import express from 'express';
import dotenv from 'dotenv';
import { USERS_BBDD } from './bbdd.js'

dotenv.config(); // Guardar las variables de entorno (.env) usando dotenv

const expressApp = express();

// Para admitir formatos de petición y respuesta en todas los endpoints
expressApp.use(express.json());
expressApp.use(express.text());

/**
 * Get all accounts
 */
expressApp.get('/account/getAll', (req, res) => {
    return res.send(USERS_BBDD)
});

/**
 * Get account by guid
 */
expressApp.get('/account/:guid', (req, res) => {
    const guid = req.params.guid;
    const user = USERS_BBDD.find(user => user.guid === guid);

    if (!user) return res.status(404).send();

    return res.send(user);
});

/**
 * Create a new account
 */
expressApp.post('/account', (req, res) => {
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
expressApp.patch('/account/:guid', (req, res) => {
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
expressApp.delete('/account/:guid', (req, res) => {
    const guid = req.params.guid;
    const userIndex = USERS_BBDD.findIndex(user => user.guid === guid);

    if (userIndex === -1) return res.status(404).send();

    USERS_BBDD.splice(userIndex, 1);

    return res.send();
});


expressApp.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}:`));