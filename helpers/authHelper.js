import userModel from '../schemas/user-schema.js';

const authFunction = async (email, password) => {
    const user = await userModel.find({ email })
    if (!user) throw new Error();

    if (user[0].password !== password) throw new Error();
    return user[0];
}

export default authFunction;