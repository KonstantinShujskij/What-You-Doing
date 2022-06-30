const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth.middleware');
const Action = require('../models/Action');
const config = require('config');


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

        const now = new Date();
        const time = now.getTime();
        const status = config.get('constants.protected');
        const {title, description, feel} = req.body; 

        const action = new Action({title, description, feel, status, time, owner: req.user.userId});
        await action.save();

        res.status(201).json({ action });
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'});
    }
});

router.post('/load', auth, 
    async (req, res) => {
    try {
        const { skip, limit } = req.body
        const sort = { time: -1 }
        
        const actions = await Action.find({
            owner: req.user.userId,
            // time: { $lt: time, $gt: time - interval }
        }).sort(sort).skip(skip).limit(limit)

        res.status(200).json({ actions });
    } catch(error) {
        res.status(500).json(null);
    }
});


router.post('/set-status', auth, 
    async (req, res) => {
    try {
        const { id, status } = req.body
        const filter = { _id: id, owner: req.user.userId }; 

        let flag = false;
        if(status === config.get('constants.public')) { flag = true }
        if(status === config.get('constants.protected')) { flag = true }
        if(status === config.get('constants.private')) { flag = true }

        if(flag) { await Action.updateOne(filter, { $set: { status } }) }
            
        const action = await Action.findOne(filter)

        if(action) { 
            const newStatus = action.status
            res.status(200).json({ status: newStatus })     
        }
        else { res.status(502).json(null)  }

    } catch(error) {
        res.status(505).json(null);
    }
});


module.exports = router;