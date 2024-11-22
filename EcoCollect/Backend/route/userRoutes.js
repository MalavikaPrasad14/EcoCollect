const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require("../db/connection");
const userModel = require('../model/userData');

const router = new express.Router();
router.use(express.json());

const SALT_ROUNDS = 10; // Define the salt rounds for bcrypt

// Registration route
router.post('/register', async (req, res) => {
    try {
        const { role, email, password, confirmPassword, username, phone, address, yearsOfExperience, drivingLicensePhoto, aadharCardPhoto } = req.body;

        // Check for required fields based on role
        if (role === 'Driver') {
            if (!username || !email || !phone || !address || !yearsOfExperience || !drivingLicensePhoto || !aadharCardPhoto) {
                return res.status(400).json({ message: "Please provide all required Driver fields." });
            }
        } else if (role === 'Customer') {
            if (!username || !email || !phone || !password || !confirmPassword) {
                return res.status(400).json({ message: "Please provide all required Customer fields." });
            }
        } else if (role === 'Admin') {
            if (!email || !password) {
                return res.status(400).json({ message: "Please provide all required fields." });
            }
        }


        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered with this email." });
        }

        

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, SALT_ROUNDS); // hash confirmPassword if required

        // Filter out empty or undefined fields from req.body
        const userData = Object.keys(req.body).reduce((acc, key) => {
            if (req.body[key]) {  // Only add fields with truthy values
                acc[key] = req.body[key];
            }
            return acc;
        }, {});

        // Create new user
        const newUser = new userModel({
            ...userData,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword
        });
        await newUser.save();

        res.status(201).json({ message: "Registration successful!", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user." });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (isPasswordValid) {
            const payload = { id: user._id, role: user.role };
            const token = jwt.sign(payload, "secret", { expiresIn: '1h' });

            res.status(200).json({ message: "Login successful", token, role: user.role });
        } else {
            res.status(400).json({ message: "Invalid password." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in user." });
    }
});

module.exports = router;
