const { Register, SignIn } = require('../controllers/auth');

const router = require('express').Router();


router.post('/auth/register', Register)
router.post('/auth/sign-in', SignIn)

module.exports = router