const mongoose = require('mongoose');


const authSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    token: {
        type: String
    }
});

module.exports = mongoose.model('Authorization', authSchema);