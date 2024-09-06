const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { errorHandler } = require("../utils/error");

const generateToken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:"30d",
        
    })
}

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

const SignIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return next(errorHandler(401, 'User is not found'));
        //comparing password with hashed password
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword) return next(errorHandler(404, "Incorrect email or password!!!"));
        //generate the token with expiry date
        // const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        //removing password from data display, using _doc removes it from json and rest is used instead of user in the respond section
        const loginTime = new Date();
        user.lastLogin = loginTime;
        await user.save()
        const { password: pass, ...rest } = user._doc;
        res.status(200).json({
            id: user._id,
            email: user.email,
            loginTime: loginTime,
            token: generateToken(user._id),
        })
        // res.cookie('access token', token, {httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000)}).status(200).json(rest);
    } catch (error) {
       next(error)
    }
}   

module.exports = { Register, SignIn }