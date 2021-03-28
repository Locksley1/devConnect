const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const config = require('config');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');


const User = require('../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Private
router.post('/', [
    check('name', 'Name required!').not().isEmpty(),
    check('email', 'Email required!').isEmail(),
    check('password', 'Enter a password between 6 or more characters').isLength({min:6})
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({errors:errors.array()});
        
    
    let {name, email, password} = req.body;

    try
    {
        // Check if user already exists in the database
        let user = await User.findOne({email});

        if (user)
            return res.status(400).json({errors: [{msg:'User already exists!'}]});
        
        // Get and set user's avatar from gravatar service
        const avatar = gravatar.url(email, {
            s:'200',
            r:'pg',
            d:'mm'
        });

        // Encrypt password to be stored in the database
        const salt = await bcryptjs.genSalt(10);
        password = await bcryptjs.hash(password, salt)

        // Save the newly registed user to the database for the first time
        user = new User({
            name,
            email,
            avatar,
            password
        });
        
        await user.save();

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