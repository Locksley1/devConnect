const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');


const bcryptjs = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const jwt_auth = require('../middleware/jwt_auth');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', jwt_auth, async (req, res) => {

    try 
    {
        const loggedUser = await User.findById(req.loggedUser.id).select('-password');
        res.json(loggedUser);
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }


});

// @route   POST api/auth
// @desc    Login User
// @access  Public
router.post('/', [
    check('email', 'Email required!').isEmail(),
    check('password', 'Password required!').exists()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({errors:errors.array()});
        
    
    let {email, password} = req.body;

    try
    {
        // Check if user exists in the database in order to sign in
        let user = await User.findOne({email});

        if (!user)
            return res.status(400).json({errors: [{msg:'Invalid Login Credentials!'}]});
        
        
        const correctPassword = await bcryptjs.compare(password, user.password);

        if (!correctPassword)
            return res.status(400).json({errors: [{msg:'Invalid Login Credentials!'}]});


        // Create JWT for future authorization
        const payload = {
            loggedUser: {
                id: user.id
            }
        }
        
        jwt.sign(payload, config.get('jwtToken'), {expiresIn:36000000000}, (error, token) => {
            if (error) throw error;

            res.json({token});
        });
    
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
});

module.exports = router;