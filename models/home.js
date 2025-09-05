const mongoose = require('mongoose');

const homeSchema = mongoose.Schema({
    homeName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    photo: String,
    description: String
})

module.exports = mongoose.model('Home', homeSchema);


