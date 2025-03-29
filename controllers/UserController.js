const User = require('../models/User');
const nodemailer = require('nodemailer');

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, phone } = req.body;

  // Validate input
  if (!name || !email || !phone) {
    return res.status(400).send("All fields are required!");
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already registered!");
    }

    // Create new user
    const newUser = new User({ name, email, phone });
    await newUser.save();

    // Send email confirmation
    await sendConfirmationEmail(newUser.email, newUser.name);

    res.status(200).send({ message: "Registration successful!" });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send("An error occurred while registering the user.");
  }
};

// Check-in User
exports.checkInUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found!");
    }

    // Set check-in time
    user.checkInTime = new Date();
    await user.save();

    res.status(200).send({ message: "Checked-in successfully!" });
  } catch (error) {
    console.error('Error during check-in:', error);
    res.status(500).send("An error occurred while checking in the user.");
  }
};

// Check-out User
exports.checkOutUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found!");
    }

    // Set check-out time
    user.checkOutTime = new Date();
    await user.save();

    res.status(200).send({ message: "Checked-out successfully!" });
  } catch (error) {
    console.error('Error during check-out:', error);
    res.status(500).send("An error occurred while checking out the user.");
  }
};

// Send Email Confirmation
const sendConfirmationEmail = (toEmail, name) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use any email service (Gmail is just an example)
    auth: {
      user: process.env.EMAIL_USER,  // Add your email from the .env file
      pass: process.env.EMAIL_PASS   // Add your email password from the .env file
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,   // Your email address
    to: toEmail,                    // The user's email address
    subject: 'RSVP Confirmation',   // The email subject
    text: `Hello ${name},\n\nThank you for registering for our Speaker Session. We are excited to have you join us!`  // The email content
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: ", error);
    } else {
      console.log("Confirmation email sent: " + info.response);
    }
  });
};