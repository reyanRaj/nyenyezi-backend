const mongoose = require("mongoose");
const Role = require("../models/Role");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb connected ${conn.connection.host}`);

    function initial() {
      Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
          new Role({
            name: "user",
          }).save((err) => {
            if (err) {
              console.log("error", err);
            }

            console.log("added 'user' to roles collection");
          });

          new Role({
            name: "admin",
          }).save((err) => {
            if (err) {
              console.log("error", err);
            }

            console.log("added 'admin' to roles collection");
          });
        }
      });
    }
    initial();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
