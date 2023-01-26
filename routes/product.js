const controller = require("../controllers/product");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/admin/addProduct",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addProduct
  );

  app.get(
    "/api/user/getAllProducts",
    [authJwt.verifyToken],
    controller.getAllProducts
  );

  app.delete(
    "/api/user/deleteProduct/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteProduct
  );

  app.put(
    "/api/user/updateProduct",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateProduct
  );
};
