const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/branch");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/admin/addBranch",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addBranch
  );

  app.get(
    "/api/user/getAllBranches",
    [authJwt.verifyToken],
    controller.getAllBranches
  );

  app.delete(
    "/api/user/deleteBranch/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteBranch
  );

  app.put(
    "/api/user/updateBranch",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateBranch
  );
};
