import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define a schema for the generated letters
const letterSchema = new mongoose.Schema({
    jobRole: { type: String, required: true },
    companyName: { type: String },
    letter: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  
  // **NEW:** An array to store all generated cover letters for the user.
  // The resume itself is no longer stored.
  generatedLetters: [letterSchema]

}, { timestamps: true });

// Password hashing middleware (no changes here)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method (no changes here)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;


// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs'; // Using bcryptjs is often easier in some environments

// const userSchema = new mongoose.Schema({
//   name: { 
//     type: String, 
//     required: true 
//   },
//   email: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     lowercase: true, // Store emails in lowercase for consistency
//   },
//   password: { 
//     type: String, 
//     required: true 
//   },
//   resumeUrl: { 
//     type: String // Stores the full URL to the resume on Cloudinary
//   },
//   resumePublicId: { 
//     type: String // Stores the public_id for easy deletion/management
//   },
// }, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// // Middleware to hash the password before saving the user document
// userSchema.pre('save', async function (next) {
//   // Only hash the password if it has been modified (or is new)
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Method to compare entered password with the hashed password in the database
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model('User', userSchema);
// export default User;

