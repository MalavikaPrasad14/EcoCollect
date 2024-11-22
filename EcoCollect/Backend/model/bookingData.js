// bookingData.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
        match: [/^\d{10}$/, 'Please use a valid 10-digit phone number'],
    },
    alternatePhone: {
        type: String,
        trim: true,
        match: [/^\d{10}$/, 'Please use a valid 10-digit phone number'],
    },
    eventType: {
        type: String,
        required: [true, "Event type is required"],
        trim: true
    },
    wasteType: {
        type: String,
        required: [true, "Waste type is required"],
        enum: ["Plastic", "Paper", "Bio", "E-Waste", "Metal", "Glass", "Other"]
    },
    eventDate: {
        type: Date,
        required: [true, "Event date is required"],
        validate: {
            validator: function(value) {
                return value > new Date();
            },
            message: 'Event date must be in the future'
        }
    },
    pickupTime: {
        type: String,
        required: [true, "Pickup time is required"],
        trim: true,
    },
    locality: {
        type: String,
        required: [true, "Locality is required"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true
    },
    location: {
        type: String,
        // {
        //     lat: { type: Number, required: true },
        //     long: { type: Number, required: true }
        // },
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["Upcoming", "Completed"],
        default: "Upcoming"
    }
});

module.exports = mongoose.model("booking", bookingSchema);
