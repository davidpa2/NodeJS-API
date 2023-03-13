console.clear();
import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Guardar las variables de entorno (.env) usando dotenv

const expressApp = express();

// Para admitir formatos de petición y respuesta en todas los endpoints
expressApp.use(express.json());
expressApp.use(express.text());

expressApp.get("/account/:idAccount", (req, res) => {
    console.log(req.body)
    res.send()
})

expressApp.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}:`));
