const { Register, SignIn, Google } = require('../controllers/auth');

const router = require('express').Router();


router.post('/auth/register', Register)
router.post('/auth/sign-in', SignIn)
router.post('/auth/google', Google)
module.exports = router