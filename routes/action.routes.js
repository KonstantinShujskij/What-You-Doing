const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth.middleware');
const Action = require('../models/Action');

const router = Router();

router.post('/create', 
    [ check('title', 'Min title length is 3 symbol').isLength({min: 3}) ],
    auth, 
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: "Incorect data" });
        }

        const {title, description, labels} = req.body; 
        const action = new Action({title,description, labels, owner: req.user.userId});
        await action.save();

        res.status(201).json({ action });
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'});
    }
});

router.post('/load', auth, 
    async (req, res) => {
    try {
        const {time, interval} = req.body; 
        const actions = await Action.find({
            owner: req.user.userId,
            time: { $lt: time, $gt: time - interval }
        });

        res.status(201).json({ actions });
    } catch(error) {
        res.status(500).json(null);
    }
});


module.exports = router;