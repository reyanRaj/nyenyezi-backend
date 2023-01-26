const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDb");

const app = express();

var corsOptions = {
  origin: "http://127.0.0.1:5173",
};

// setting up the environmental variables
dotenv.config({ path: "./config/config.env" });

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// connecting to databse
connectDB();

// static folder
app.use("/public", express.static("public"));

//  routes
require("./routes/auth")(app);
require("./routes/user")(app);
require("./routes/costumer")(app);
require("./routes/product")(app);
require("./routes/transaction")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
