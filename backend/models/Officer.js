// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const officerSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Officer name is required'],
//         trim: true,
//         minlength: 2,
//         maxlength: 100
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true,
//         lowercase: true,
//         trim: true,
//         match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
//     },
//     phone: {
//         type: String,
//         required: [true, 'Phone number is required'],
//         trim: true
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//         minlength: 6,
//         select: false
//     },
//     isActive: {
//         type: Boolean,
//         default: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Hash password before saving
// officerSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }

//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// // Method to compare passwords
// officerSchema.methods.comparePassword = async function (candidatePassword) {
//     try {
//         return await bcrypt.compare(candidatePassword, this.password);
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports = mongoose.model('Officer', officerSchema);
