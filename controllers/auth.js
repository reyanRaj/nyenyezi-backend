const User = require("../models/User");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "-__v"
    );

    if (!user) return res.status(500).send({ message: "User not found!" });

    let isPassValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPassValid) {
      return res.status(401).send({
        message: "Invalid Password",
      });
    }

    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400 * 30 * 356,
    });

    let authorities = [];

    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};
