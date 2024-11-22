const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['Admin', 'Driver', 'Customer'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            // Password is required only for Admin and Customer roles
            return this.role === 'Admin' || this.role === 'Customer';
        }
    },
    confirmPassword: {
        type: String,
        required: function () {
            // Password is required only for Admin and Customer roles
            return this.role === 'Customer';
        }
    },
    username: {
        type: String,
        required: function () {
            // Name is required only for Driver and Customer roles
            return this.role === 'Driver' || this.role === 'Customer';
        }
    },
    phone: {
        type: String,
        required: function () {
            // Phone is required only for Driver and Customer roles
            return this.role === 'Driver' || this.role === 'Customer';
        }
    },
    // alternatePhone: {
    //     type: String,
    //     required: function () {
    //         // Alternate phone is required only for Customer and Driver roles
    //         return this.role === 'Customer' || this.role === 'Driver';
    //     }
    // },
    address: {
        type: String,
        required: function () {
            // Address is required only for Driver and Customer roles
            return this.role === 'Driver' ;
        }
    },
    yearsOfExperience: {
        type: Number,
        required: function () {
            // Years of experience is required only for Driver role
            return this.role === 'Driver';
        }
    },
    drivingLicensePhoto: {
        type: String,
        required: function () {
            // Driving license photo is required only for Driver role
            return this.role === 'Driver';
        }
    },
    aadharCardPhoto: {
        type: String,
        required: function () {
            // Aadhar card photo is required only for Driver role
            return this.role === 'Driver';
        }
    },
    isApproved: {
        type: Boolean,
        default: null

    },
    joiningDate: {
        type: Date,
        default: null

    }
});

// Middleware to set default values conditionally
userSchema.pre('save', function (next) {
    if (this.role === 'Driver') {
        if (this.isApproved === null) this.isApproved = false;

        // Set joiningDate only if isApproved is true
        if (this.isApproved) {
            if (!this.joiningDate) this.joiningDate = Date.now();
        } else {
            this.joiningDate = undefined;
        }
    } else {
        this.isApproved = undefined;
        this.joiningDate = undefined;
    }
    next();
});

// Middleware to handle actions after driver approval
userSchema.methods.approveDriver = async function () {
    if (this.role === 'Driver' && !this.isApproved) {
        this.isApproved = true;
        await this.save();
        console.log(`SMS sent to ${this.phone}: Your account has been approved. Login using your email and default password.`);
    }
};


const User = mongoose.model('user', userSchema);

module.exports = User;
