const controller = require("../controllers/constumer");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {
  app.use(function (req, res, next) {
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "x-access-token, Origin, Content-Type, Accept"
    // );
    next();
  });

  app.post(
    "/api/admin/addCostumer",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addCostumer
  );

  app.get(
    "/api/user/getAllCostumers",
    [authJwt.verifyToken],
    controller.getAllCostumers
  );

  app.delete(
    "/api/user/deleteCostumer/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteCostumer
  );

  app.put(
    "/api/user/updateCostumer",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateCostumer
  );
};
