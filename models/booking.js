const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    homeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Home",
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Booking", bookingSchema);
