const Costumer = require("../models/Costumer");

exports.addCostumer = async (req, res) => {
  try {
    let oldCostumer = await Costumer.find({ email: req.body.email });
    if (oldCostumer.length > 0) {
      return res.status(400).send({ message: "Customer already exists!" });
    }

    let constumer = new Costumer({
      email: req.body.email,
      username: req.body.username,
    });
    await constumer.save();

    return res.status(201).send({ message: "Succesfully added." });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.getAllCostumers = async (req, res) => {
  try {
    let costumers = await Costumer.find({});

    return res.status(200).send({ costumers });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.deleteCostumer = async (req, res) => {
  try {
    let customer = await Costumer.findOneAndDelete({ _id: req.params.id });

    if (!customer) {
      return res.status(400).send({ message: "Customer doesn't Exists !" });
    }
    return res.status(200).send({ message: "Customer succesfully deleted !" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.updateCostumer = async (req, res) => {
  try {
    let customer = await Costumer.findOneAndUpdate(
      { _id: req.body.customer._id },
      { ...req.body.customer },
      { upsert: true }
    );

    if (!customer) {
      return res.status(400).send({ message: "Customer doesn't Exists !" });
    }

    return res.status(200).send({ message: "Customer succesfully updated !" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};
