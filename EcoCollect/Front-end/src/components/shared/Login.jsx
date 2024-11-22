import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const Login = ({ onToggleSignUpMode, isSignUpMode }) => {
  const [role, setRole] = useState(""); // Default role for signup
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    yearsOfExperience: "",
    drivingLicensePhoto: "",
    aadharCardPhoto: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setFormData({ ...formData, role: event.target.value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/user/register", formData);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setTimeout(() => {
        onToggleSignUpMode(); // Switch to sign-in mode after success
      }, 1000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error during registration.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/user/login", {
        email: formData.email,
        password: formData.password,
      });
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      localStorage.setItem("token", response.data.token); // Store JWT token
      console.log("Login response:", response.data);

      // Redirect to Home if login is successful and role is Customer
      const userRole = response.data.role; // Assuming role is returned from the API
if (userRole === "Customer") {
  navigate("/home");
  } else {
    setErrorMessage("Unauthorized role. Please sign up as a customer.");
    }
  } catch (error) {
    setErrorMessage(error.response?.data?.message || "Error during login.");
  }
};

  return (
    


    <div className="forms-container">
      <div className="signin-signup">
        {/* Sign-in Form */}
        <form className="sign-in-form" onSubmit={handleLoginSubmit}>
          <h2 className="title">Sign in</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Email" name="email" onChange={handleChange} />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
          </div>
          <input type="submit" value="Login" className="btn solid" />
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </form>

        {/* Sign-up Form */}
        <form className="sign-up-form" onSubmit={handleSignUpSubmit}>
          <h2 className="title">Sign up</h2>
          <div className="dropdown">
            <i className="fas fa-user-tag"></i>
            <select size={1} name="role" value={role} onChange={handleRoleChange}>
              <option value="" disabled>Select Role</option>
              <option value="Driver">Driver</option>
              <option value="Customer">Customer</option>
            </select>
          </div>

          {(role === "Customer" || role === "Driver") && (
            <>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" name="username" onChange={handleChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" name="email" onChange={handleChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-phone"></i>
                <input type="text" placeholder="Phone" name="phone" onChange={handleChange} />
              </div>
            </>
          )}

          {role === "Customer" && (
            <>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" name="password" onChange={handleChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} />
              </div>
            </>
          )}

          {role === "Driver" && (
            <>
              <div className="input-field">
                <i className="fas fa-home"></i>
                <input type="text" placeholder="Address" name="address" onChange={handleChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-id-card"></i>
                <input type="file" name="drivingLicensePhoto" onChange={handleChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-id-badge"></i>
                <input type="file" name="aadharCardPhoto" onChange={handleChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-briefcase"></i>
                <input type="number" placeholder="Years of Experience" name="yearsOfExperience" onChange={handleChange} />
              </div>
            </>
          )}

          <input type="submit" className="btn" value="Sign up" />
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </form>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Join us today to experience a wide range of services tailored to your needs.</p>
            <button className="btn transparent" onClick={onToggleSignUpMode}>
              Sign up
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>If you already have an account, sign in to continue.</p>
            <button className="btn transparent" onClick={onToggleSignUpMode}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
