const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/transaction");

module.exports = function (app) {
  app.use(function (req, res, next) {
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "x-access-token, Origin, Content-Type, Accept"
    // );
    next();
  });

  app.post(
    "/api/user/addTransactions",
    [authJwt.verifyToken],
    controller.addTransactions
  );

  app.get(
    "/api/user/getTransactions",
    [authJwt.verifyToken],
    controller.getAllTransaction
  );

  app.delete(
    "/api/user/deleteTransaction/:id",
    [authJwt.verifyToken],
    controller.deleteTransaction
  );

  app.put(
    "/api/user/updateTransaction",
    [authJwt.verifyToken],
    controller.updateTransaction
  );

  app.get(
    "/api/user/generateCSV",
    [authJwt.verifyToken],
    controller.generateCSV
  );

  app.post("/api/user/mailCSV", [authJwt.verifyToken], controller.mailCSV);
};
