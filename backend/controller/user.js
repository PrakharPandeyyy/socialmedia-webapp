const User = require("../models/User");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      password,
      email,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "This email already exist,try with different email",
      });
    }
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must between 3 and 30 characters.",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "last name must between 3 and 30 characters.",
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "password must be atleast 6 characters.",
      });
    }
    const hashedPass = await bcrypt.hash(password, 12);
    let tempUser = first_name + last_name;
    let newusername = await validateUsername(tempUser);

    const user = await new User({
      first_name,
      last_name,
      password: hashedPass,
      email,
      username: newusername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
