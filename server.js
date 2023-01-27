const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDb");

const app = express();

const whitelist = [
  "http://127.0.0.1:5173",
  "http://nyenyezi.hindizy.online",
  "https://nyenyezi.hindizy.online",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// setting up the environmental variables
dotenv.config({ path: "./config/config.env" });

app.use(cors(corsOptions));

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
require("./routes/branch")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
