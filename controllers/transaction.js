const Transaction = require("../models/Transaction");
const Costumer = require("../models/Costumer");
const Product = require("../models/Product");
const User = require("../models/User");
const fastcsv = require("fast-csv");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const nodemailer = require("nodemailer");

exports.addTransactions = async (req, res) => {
  try {
    let user = await User.findById(req.userId);

    req.body.transactions.map(async (transaction) => {
      let customer = await Costumer.findById(transaction.customer);
      if (!customer)
        return res.status(500).send({ message: "Customer not found!" });

      let product = await Product.findById(transaction.product);
      if (!product)
        return res.status(500).send({ message: "Product not found!" });

      let trans = new Transaction({
        customer: customer._id,
        product: product._id,
        quantity: transaction.quantity,
        total: transaction.total,
        user: user._id,
      });

      await trans.save();
    });

    return res
      .status(201)
      .send({ message: "Your trasaction is successfully added!" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.getAllTransaction = async (req, res) => {
  try {
    let transactions = await Transaction.find({})
      .populate("customer", "-__v")
      .populate("product", "-__v");

    return res.status(200).send({
      transactions: transactions,
      message: "Successfully fetched transactions.",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
    });

    if (!transaction) {
      return res.status(400).send({ message: "Transaction doesn't Exists !" });
    }
    return res
      .status(200)
      .send({ message: "Transaction succesfully deleted !" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    let user = await User.findById(req.body.transaction.user);
    let product = await Product.findById(req.body.transaction.product);

    delete req.body.transaction.user;
    delete req.body.transaction.product;

    let transaction = await Transaction.findOneAndUpdate(
      { _id: req.body.transaction._id },
      { ...req.body.transaction, user: user._id, product: product._id },
      { upsert: true }
    );

    if (!transaction) {
      return res.status(400).send({ message: "Transaction doesn't Exists !" });
    }

    return res.status(200).send({
      message: `Transaction succesfully updated transaction: id ${transaction._id}!`,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.generateCSV = async (req, res) => {
  try {
    let user = await User.findById(req.userId);

    let transactions = await Transaction.find({})
      .populate("customer", "-__v")
      .populate("product", "-__v");

    let data = [];

    data[0] = [
      "Date",
      "ID",
      "Customer Name",
      "Customer Email",
      "User Name",
      "User Email",
      "Product",
      "Quantity",
      "Total Price",
    ];

    transactions.forEach((transaction, index) => {
      data[index + 1] = [
        moment(transaction.date).format("YYYY-MM-DD"),
        transaction._id,
        transaction.customer.username,
        transaction.customer.email,
        user.username,
        user.email,
        transaction.product.name,
        transaction.quantity,
        transaction.total,
      ];
    });
    let location = path.join(__dirname, "..", "public", req.userId + ".csv");
    const ws = fs.createWriteStream(location);
    fastcsv
      .write(data, { headers: true })
      .on("finish", function () {
        return res.status(200).send({
          location: location,
          url: "public/" + req.userId + ".csv",
          message: "Successfully generated CSV",
        });
      })
      .pipe(ws);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

exports.mailCSV = async (req, res) => {
  try {
    let user = await User.findById(req.userId);

    let transactions = await Transaction.find({})
      .populate("customer", "-__v")
      .populate("product", "-__v");

    let data = [];

    data[0] = [
      "Date",
      "ID",
      "Customer Name",
      "Customer Email",
      "User Name",
      "User Email",
      "Product",
      "Quantity",
      "Total Price",
    ];

    transactions.forEach((transaction, index) => {
      data[index + 1] = [
        moment(transaction.date).format("YYYY-MM-DD"),
        transaction._id,
        transaction.customer.username,
        transaction.customer.email,
        user.username,
        user.email,
        transaction.product.name,
        transaction.quantity,
        transaction.total,
      ];
    });
    let location = path.join(__dirname, "..", "public", req.userId + ".csv");
    const ws = fs.createWriteStream(location);
    fastcsv
      .write(data, { headers: true })
      .on("finish", function () {
        var transporter = nodemailer.createTransport({
          host: "smtp.hostinger.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "alifarhad@hindizy.online", // your domain email address
            pass: "Alifarhad@123", // your password
          },
        });
        console.log("generated csv");
        let mailOptions = {
          from: '"Nyenyezi" <alifarhad@hindizy.online>',
          to: req.body.email,
          subject: "Here is your Transactions Receipt",
          html: "We have attached your transaction Receipt with this mail. Check it out.",
          attachments: [
            {
              filename: "Transaction.csv",
              path: location,
            },
          ],
        };

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal Server Error" });
          }

          return res
            .status(200)
            .send({ message: "Successfully sent the mail!" });
        });
      })
      .pipe(ws);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};
