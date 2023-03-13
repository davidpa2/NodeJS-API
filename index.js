import express from 'express';
import dotenv from 'dotenv';
import accountRouter from './routes/account.js';

dotenv.config(); // Guardar las variables de entorno (.env) usando dotenv

const expressApp = express();

// Para admitir formatos de petición y respuesta en todas los endpoints
expressApp.use(express.json());
expressApp.use(express.text());
//Specify the subpath which will affect our router
expressApp.use("/account", accountRouter);


expressApp.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}:`));