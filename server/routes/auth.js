const { Register } = require('../controllers/auth');

const router = require('express').Router();


router.post('/auth/register', Register)

module.exports = router