const productRouter = require("epxress").Router();
const productController = require("../controllers/postController");


productRouter.get("/product", productController.index);
productRouter.get("/product/:id", postController.showOne);

productRouter.post(
    "/product",
    productController.create
);
productRouter.put("/product/:id", productController.update);
productRouter.delete("/product/:id", productController.delete);

module.exports = productRouter;