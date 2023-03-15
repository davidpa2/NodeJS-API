import express from 'express';
import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';
import authTokenRouter from './routes/auth-token.js';
import authSessionRouter from './routes/auth-session.js';

dotenv.config(); // To save environment variables (.env) using dotenv

const expressApp = express();

// expressApp.use(cookieParser); // Necessary library to read cookies (just in case of using sessions)
// To admit request and response formats in all of the endpoints
expressApp.use(express.json());
expressApp.use(express.text());
//Specify the subpath which will affect our router
expressApp.use("/account", accountRouter);
expressApp.use("/auth", authRouter);
// expressApp.use("/auth-token", authTokenRouter);
expressApp.use("/auth-session", authSessionRouter);

expressApp.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}:`));