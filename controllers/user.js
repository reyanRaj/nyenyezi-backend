const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getUser = async (req, res) => {
  let user = await User.findById(req.userId).populate("roles", "-__v");
  if (!user) return res.status(500).send({ message: "User not found!" });

  return res.status(200).send(user);
};

exports.addUser = async (req, res) => {
  try {
    let oldUser = await User.find({ email: req.body.email });
    if (oldUser.length > 0) {
      return res.status(400).send({ message: "User Already Exists !" });
    }
    let role = await Role.findOne({ name: "user" });
    let newUser = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      email: req.body.email,
      roles: [role._id],
    });

    await newUser.save();

    return res
      .status(201)
      .send({ message: "User was registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find({}).populate("roles", "-__v");

    return res.status(200).send({ users });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findOneAndDelete({ _id: req.params.id });

    if (!user) {
      return res.status(400).send({ message: "User doesn't Exists !" });
    }
    return res.status(200).send({ message: "User succesfully deleted !" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.body.user._id },
      { ...req.body.user },
      { upsert: true }
    );

    if (!user) {
      return res.status(400).send({ message: "User doesn't Exists !" });
    }

    return res.status(200).send({ message: "User succesfully updated !" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};
