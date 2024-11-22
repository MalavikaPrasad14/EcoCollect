import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ResponsiveAppBar from "../shared/Navbar";
import Button from "@mui/material/Button";
import "../../assets/css/NewBooking.css";
// import Footer from "../shared/Footer";
// import "../../assets/css/Footer.css";
import "../../assets/css/Home.css";


const NewBooking = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    alternatePhone: "",
    eventType: "",
    wasteType: "",
    eventDate: "",
    pickupTime: "",
    locality: "",
    city: ""
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Enter a valid 10-digit number";
    if (!formData.eventType) newErrors.eventType = "Event type is required";
    if (!formData.wasteType) newErrors.wasteType = "Waste type is required";
    if (!formData.eventDate) newErrors.eventDate = "Event date is required";
    if (!formData.pickupTime) newErrors.pickupTime = "Pickup time is required";
    if (!formData.locality) newErrors.locality = "Locality is required";
    if (!formData.city) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await axios.post("http://localhost:4000/booking/post", formData);
        alert("Booking created successfully");

        // Redirect to Home page after clicking "OK" on the popup
        navigate("/home");
      } catch (error) {
        console.error("Error creating booking:", error);
        alert("Error creating booking. Please try again.");
      }
    }
  };

  return (
    <>
      <ResponsiveAppBar /><br />
      <div className="form-container">
        <h3 className="form-heading">Make New Bookings</h3>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="booking-form"
        >
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            required
          />
          <TextField
            label="Alternate Number"
            name="alternatePhone"
            type="tel"
            value={formData.alternatePhone}
            onChange={handleChange}
          />
          <TextField
            label="Event Type"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            error={!!errors.eventType}
            helperText={errors.eventType}
            required
          />
          <TextField
            label="Type of Wastes"
            name="wasteType"
            value={formData.wasteType}
            onChange={handleChange}
            error={!!errors.wasteType}
            helperText={errors.wasteType}
            required
          />
          <TextField
            label="Date of Event"
            name="eventDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.eventDate}
            onChange={handleChange}
            error={!!errors.eventDate}
            helperText={errors.eventDate}
            required
          />
          <TextField
            label="Pickup Time"
            name="pickupTime"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={formData.pickupTime}
            onChange={handleChange}
            error={!!errors.pickupTime}
            helperText={errors.pickupTime}
            required
          />
          <TextField
            label="Locality"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            error={!!errors.locality}
            helperText={errors.locality}
            required
          />
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Schedule
          </Button>
        </Box>
        {/* <Footer/> */}
      </div>
    </>
  );
};

export default NewBooking;
