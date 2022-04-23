const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const User = require('../models/User');

const router = Router();

router.post('/register',
    [
        check('name', 'Min name length is 3 symbols').isLength({min: 3}),
        check('password', 'Min password length is 8 symbols').isLength({min: 8})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: "Incorect data" });
        }
        const {name, password} = req.body;

        const candidate = await User.findOne({ name });
        if(candidate) { res.status(400).json({message: 'This user is exist'}); }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({name, password: hashedPassword});
        await user.save();

        console.log(user._id);

        const token = jwt.sign({ userId: user._id }, config.get('jwtSecret'), { expiresIn: '1h' });
        res.status(201).json({ token, userId: user._id });
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'});
    }
});

router.post('/login', 
    [
        check('name', 'Min name length is 3 symbols').isLength({min: 3}),
        check('password', 'Min password length is 8 symbols').isLength({min: 8})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: "Incorect data" });
        }
        
        const {name, password} = req.body;

        const user = await User.findOne({ name });
        if(!user) { return res.status(400).json({ message: 'User not find' }); }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) { return res.status(400).json({ message: 'Incorect password' }); }

        const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });
        res.json({ token, userId: user.id })

    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'});
    }
});

module.exports = router;
