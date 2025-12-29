const Interest = require("../models/interestModel");
const Brand = require("../models/brandModel");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

// CREATE INTEREST REQUEST
exports.createInterestRequest = async (req, res) => {
  try {
    const {
      brandId,
      name,
      email,
      mobile,
      state,
      city,
      pinCode,
      address,
      investmentRange,
    } = req.body;

    // Validate required fields
    if (!brandId || !name || !email || !mobile || !state || !city || !pinCode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if brand exists
    const brand = await Brand.findById(brandId);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Check if user already has pending interest for this brand
    const existingInterest = await Interest.findOne({
      investorId: req.user.userId,
      brandId,
      status: "Pending",
    });

    if (existingInterest) {
      return res.status(400).json({ message: "You already have a pending request for this brand" });
    }

    const interest = new Interest({
      investorId: req.user.userId,
      brandId,
      name,
      email,
      mobile,
      state,
      city,
      pinCode,
      address,
      investmentRange,
    });

    await interest.save();

    // Send email to brand owner
    const brandOwner = await User.findById(brand.ownerId);
    if (brandOwner && brandOwner.email) {
      await sendInterestEmail(brandOwner.email, brandOwner.firstName, {
        investorName: name,
        brandName: brand.brandName,
        email,
        mobile,
        state,
        city,
        investmentRange,
      });
    }

    res.status(201).json({
      message: "Interest request sent successfully",
      interest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET INTEREST REQUESTS FOR BRAND OWNER
exports.getBrandInterests = async (req, res) => {
  try {
    const { brandId } = req.params;

    // Check if user is brand owner
    const brand = await Brand.findById(brandId);
    if (!brand || brand.ownerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to view these requests" });
    }

    const interests = await Interest.find({ brandId }).populate("investorId", "firstName lastName email mobile");

    res.status(200).json({
      interests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE INTEREST STATUS
exports.updateInterestStatus = async (req, res) => {
  try {
    const { interestId } = req.params;
    const { status } = req.body;

    const interest = await Interest.findById(interestId);
    if (!interest) {
      return res.status(404).json({ message: "Interest request not found" });
    }

    // Check if user is brand owner
    const brand = await Brand.findById(interest.brandId);
    if (brand.ownerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to update this request" });
    }

    interest.status = status;
    await interest.save();

    res.status(200).json({
      message: "Interest status updated",
      interest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEND EMAIL TO INVESTOR
async function sendInterestEmail(recipientEmail, recipientName, investorData) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com",
        pass: process.env.EMAIL_PASS || "your-password",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: recipientEmail,
      subject: `New Franchise Interest Request - ${investorData.brandName}`,
      html: `
        <h2>New Interest Request for Your Brand</h2>
        <p>Dear ${recipientName},</p>
        <p>You have received a new interest request for your brand: <strong>${investorData.brandName}</strong></p>
        <h3>Investor Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${investorData.investorName}</li>
          <li><strong>Email:</strong> ${investorData.email}</li>
          <li><strong>Mobile:</strong> ${investorData.mobile}</li>
          <li><strong>State:</strong> ${investorData.state}</li>
          <li><strong>City:</strong> ${investorData.city}</li>
          <li><strong>Investment Range:</strong> ${investorData.investmentRange}</li>
        </ul>
        <p>Please log in to your dashboard to view more details and respond to this request.</p>
        <p>Best regards,<br>FranchiseConnect Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
