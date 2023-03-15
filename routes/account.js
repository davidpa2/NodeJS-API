import { Router } from 'express';
import userModel from '../schemas/user-schema.js';

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
    const user = await userModel.findById(guid).exec()

    if (!user) return res.status(404).send("No se ha encontrado ese usuario");

    return res.send(user);
});

/**
 * Create a new account
 */
accountRouter.post('/', async (req, res) => {
    const { guid, name } = req.body;

    if (!name || !guid) return res.state(400).send();

    const user = await userModel.findById(guid).exec();

    if (user) return res.status(409).send("El usuario ya se encuetra registrado");

    const newUser = new userModel({ _id: guid, name })
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

    const user = await userModel.findById(guid).exec();

    if (!user) res.status(404).send();

    user.name = name;
    await user.save();

    return res.send();
});

/**
 * Delete an account
 */
accountRouter.delete('/:guid', async (req, res) => {
    const { guid } = req.params;
    const user = await userModel.findById(guid).exec()

    if (!user) return res.status(404).send("No existe este usuario");

    await user.remove();

    return res.send("Usuario eliminado");
});

export default accountRouter;