const {Schema, model, Types} = require('mongoose');

function getTime() {
    const now = new Date();
    return now.getTime();
}

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    feel: {type: String},
    status: {type: String},
    time: {type: Number, default: getTime()},
    owner: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Action', schema);