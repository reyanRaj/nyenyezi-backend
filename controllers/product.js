const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    let oldProduct = await Product.find({ name: req.body.name });
    if (oldProduct.length > 0) {
      return res
        .status(400)
        .send({ message: "Product with this name already exists!" });
    }

    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });

    await product.save();
    return res.status(201).send({ message: "Saved successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    let products = await Product.find({});

    return res.status(200).send({ products });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findOneAndDelete({ _id: req.params.id });

    if (!product) {
      return res.status(400).send({ message: "Product doesn't Exists !" });
    }
    return res.status(200).send({ message: "Product succesfully deleted !" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.body.product._id },
      { ...req.body.product },
      { upsert: true }
    );

    if (!product) {
      return res.status(400).send({ message: "Product doesn't Exists !" });
    }

    return res.status(200).send({ message: "Product succesfully updated !" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};
