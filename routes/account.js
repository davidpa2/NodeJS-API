import { Router } from 'express';
import userModel from '../schemas/user-schema.js';
import { v4 as uuid } from 'uuid';

const accountRouter = Router();

// Middleware creation
accountRouter.use((req, res, next) => {
    console.log(req.ip);
    // Next works as a callback
    next();
})

/**
 * Get all accounts
 */
accountRouter.get('/getAll', async (req, res) => {
    return res.send(await userModel.find())
});

/**
 * Get account by guid
 */
accountRouter.get('/:guid', async (req, res) => {
    const guid = req.params.guid;
    const user = await userModel.find({ guid }).exec()

    if (!user[0]) return res.status(404).send("No se ha encontrado ese usuario");

    return res.send(user[0]);
});

/**
 * Create a new account
 */
accountRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.state(400).send();

    const user = await userModel.find({ email }).exec();

    if (user[0]) return res.status(409).send("El usuario ya se encuetra registrado");

    const newUser = new userModel({ guid: uuid(), name, email, password })
    await newUser.save();

    return res.send("Usuario registrado");
});

/**
 * Update an account
 */
accountRouter.patch('/:guid', async (req, res) => {
    const { guid } = req.params;
    const { name } = req.body;

    if (!name) return res.state(400).send();

    const user = await userModel.find({ guid }).exec();

    if (!user[0]) res.status(404).send();

    user[0].name = name;
    await user[0].save();

    return res.send();
});

/**
 * Delete an account
 */
accountRouter.delete('/:guid', async (req, res) => {
    const { guid } = req.params;
    const user = await userModel.find({ guid }).exec()

    if (!user[0]) return res.status(404).send("No existe este usuario");

    await user[0].deleteOne();

    return res.send("Usuario eliminado");
});

export default accountRouter;