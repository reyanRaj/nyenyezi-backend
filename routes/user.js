const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/user");

module.exports = function (app) {
  app.use(function (req, res, next) {
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "x-access-token, Origin, Content-Type, Accept"
    // );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get("/api/auth/getUser", [authJwt.verifyToken], controller.getUser);

  app.post(
    "/api/admin/addUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addUser
  );

  app.get(
    "/api/user/getAllUsers",
    [authJwt.verifyToken],
    controller.getAllUsers
  );

  app.delete(
    "/api/user/deleteUser/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );

  app.put(
    "/api/user/updateUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );
};
