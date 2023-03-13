console.clear();
import express from 'express';

const PORT = 3000;
const expressApp = express();

// Para admitir formatos de petición y respuesta en todas los endpoints
expressApp.use(express.json());
expressApp.use(express.text());

expressApp.get("/account/:idAccount", (req, res) => {
    console.log(req.body)
    res.send()
})

expressApp.listen(PORT, () => console.log(`Server listening on port ${PORT}:`));
