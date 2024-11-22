const express = require("express");
const Booking = require("../model/bookingData"); // Adjust path if necessary

const router = express.Router();
router.use(express.json());
// CREATE - Add a new booking
router.post("/post", async (req, res) => {
    try {
        const { username, email, phoneNumber, eventType, wasteType, eventDate, pickupTime, locality, city, location } = req.body;

        // Validation check (already validated on model level, but double-checking here)
        if (!username || !email || !phoneNumber || !eventType || !wasteType || !eventDate || !pickupTime || !locality || !city || !location) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Error creating booking" });
    }
});

// READ - Get all bookings
router.get("/get", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Error fetching bookings" });
    }
});

// READ - Get a single booking by ID
router.get("/get/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ message: "Error fetching booking" });
    }
});

// UPDATE - Update a booking by ID
router.put("/edit/:id", async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ message: "Error updating booking" });
    }
});

// DELETE - Delete a booking by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Error deleting booking" });
    }
});

module.exports = router;
