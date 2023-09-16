const User = require("../models/User");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const jwt = require("jsonwebtoken");
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
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      message:
        "User created successfully, Activate Your account by clicking on the link sent to your email.",
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(user);
    const check = await User.findById(user.id);

    if (validUser != user.id) {
      return res
        .status(400)
        .json({ message: "You do not have the authorization to peform this action." });
    }
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "This email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has beeen activated successfully." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email entered is not connected with any account." });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      message: "Login Successfullt",
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if(user.verified == true){
      return res.status(400).json({message:"This email is already activated."})
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    return res.status(200).json({message:"Email sent successfully."})
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
