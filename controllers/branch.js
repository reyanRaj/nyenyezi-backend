const Branch = require("../models/Branch");

exports.addBranch = async (req, res) => {
  try {
    let oldBranch = await Branch.findOne({ name: req.body.branchName });
    if (oldBranch) {
      return res.status(400).send({ message: "Branch Already Exists!" });
    }

    let branch = new Branch({ name: req.body.branchName });
    await branch.save();

    return res.status(201).send({ message: "Saved successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.deleteBranch = async (req, res) => {
  try {
    let oldBranch = await Branch.findOneAndDelete({ _id: req.params.id });
    console.log(oldBranch);
    if (!oldBranch) {
      return res.status(400).send({ message: "Branch not found!" });
    }

    return res.status(200).send({ message: "Branch succesfully deleted !" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.updateBranch = async (req, res) => {
  try {
    let branch = await Branch.findOneAndUpdate(
      { _id: req.body.branch._id },
      { ...req.body.branch },
      { upsert: true }
    );

    if (!branch) {
      return res.status(400).send({ message: "Branch doesn't Exists !" });
    }

    return res.status(200).send({ message: "Branch succesfully updated !" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.getAllBranches = async (req, res) => {
  try {
    let branches = await Branch.find({});

    return res.status(200).send({ branches });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};
