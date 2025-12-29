const User = require("../models/userModel");
const Brand = require("../models/brandModel");

// GET USER PROFILE
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert buffer to base64 for profile photo
    let profilePhotoUrl = null;
    if (user.profilePhoto && user.profilePhoto.data) {
      profilePhotoUrl = `data:${user.profilePhoto.contentType};base64,${user.profilePhoto.data.toString("base64")}`;
    }

    res.status(200).json({
      user: {
        ...user.toObject(),
        profilePhoto: profilePhotoUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE USER PROFILE
exports.updateUserProfile = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      gender,
      dob,
      state,
      city,
      pinCode,
      address,
      qualification,
      occupation,
      mobile,
    } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields (note: email cannot be changed)
    if (firstName) user.firstName = firstName;
    if (middleName) user.middleName = middleName;
    if (lastName) user.lastName = lastName;
    if (gender) user.gender = gender;
    if (dob) user.dob = new Date(dob);
    if (state) user.state = state;
    if (city) user.city = city;
    if (pinCode) user.pinCode = pinCode;
    if (address) user.address = address;
    if (qualification) user.qualification = qualification;
    if (occupation) user.occupation = occupation;
    if (mobile) {
      // Check if mobile is already used by another user
      const existingUser = await User.findOne({ mobile, _id: { $ne: user._id } });
      if (existingUser) {
        return res.status(400).json({ message: "Mobile number already in use" });
      }
      user.mobile = mobile;
    }

    // Handle profile photo update
    if (req.file) {
      user.profilePhoto = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await user.save();

    let profilePhotoUrl = null;
    if (user.profilePhoto && user.profilePhoto.data) {
      profilePhotoUrl = `data:${user.profilePhoto.contentType};base64,${user.profilePhoto.data.toString("base64")}`;
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        ...user.toObject(),
        profilePhoto: profilePhotoUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER BRANDS
exports.getUserBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ ownerId: req.user.userId });

    const brandsWithImages = brands.map((brand) => ({
      ...brand.toObject(),
      logo: brand.logo && brand.logo.data ? `data:${brand.logo.contentType};base64,${brand.logo.data.toString("base64")}` : null,
      photos: brand.photos.map((photo) =>
        photo && photo.data ? `data:${photo.contentType};base64,${photo.data.toString("base64")}` : null
      ),
    }));

    res.status(200).json({
      brands: brandsWithImages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PROFILE PHOTO
exports.getProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.profilePhoto || !user.profilePhoto.data) {
      return res.status(404).json({ message: "Profile photo not found" });
    }

    res.set("Content-Type", user.profilePhoto.contentType);
    res.send(user.profilePhoto.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER COUNT
exports.getUserCount = async (req, res) => {
  try {
    console.log("getUserCount called");
    const count = await User.countDocuments();
    console.log("User count:", count);
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error getting user count:", error);
    res.status(500).json({ message: error.message });
  }
};
