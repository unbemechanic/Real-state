const User = require("../model/user");
const bcrypt = require('bcryptjs')

const Register = async (req, res, next)=> {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10)
    const UserModel = new User({ username, email, password: hashedPassword});
    try {
        await UserModel.save()
        res.status(201).json('Register is successful!!!')
    } catch (error) {
        next(error)
    }
    
}

module.exports = { Register }