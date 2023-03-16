import { Router } from "express";
import authFunction from '../helpers/authHelper.js'
import { SignJWT, jwtVerify } from 'jose'; // Library to generate JWT
import validateLoginDTO from "../dto/validateLoginDTO.js";
import userModel from "../schemas/user-schema.js";

const authTokenRouter = Router();

/**
 * Login user by email and password
 * @returns jwt 
 */
authTokenRouter.post("/login", validateLoginDTO, async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);

    try {
        const user = await authFunction(email, password);

        const jwtConstructor = new SignJWT({ guid: user.guid });

        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        return res.send({ jwt });
    } catch (error) {
        return res.sendStatus(401);
    }
})

/**
 * This method checks jwt validity passed by headers
 * @returns user
 */
authTokenRouter.get("/profile", async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(401)

    try {
        const encoder = new TextEncoder();
        const  {payload}  = await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY))

        const user = await userModel.find({guid: payload.guid}).exec();
        if (!user) return res.sendStatus(401);

        delete user[0].password;

        return res.send(user[0]);
    } catch (error) {

    }
})


export default authTokenRouter;