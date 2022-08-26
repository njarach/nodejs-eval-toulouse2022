const Product = requuire("../models/product");


exports.index = async (req,res) => {
    try {
        const products = await Product.find({
             // non implémenté : l'utilisateur doit être connecté
        })
        res.json(products);
        
    } catch (err) {
        next(err);
    }
};

exports.showOne = async (req,res) => {
    try {
        const product = await Product.findOne(req.params.id);
     // non implémenté : l'utilisateur doit être connecté
    res.json(product);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req,res, next) => {
    try {
        let product = new Product();
        product.name = req.body.name;
        product.price = req.body.price;
        product.brand = req.body.brand;
        product = await product.save();
        res.json(product);
    } catch (err) {
        next(err);
        
    }
};

exports.update = async (req, res, next) => {
    try {

      let product = await Product.findById(req.params.id);
    // non implémenté : l'utilisateur doit être connecté

    //   if (!product || product.id != req.product.id) {
    //     const error = new Error("Wrong request");
    //     error.statusCode = 400;
    //     throw error;
    //   }
      product.name = req.body.name;
      product.price = req.body.price;
      product.brand = req.body.brand;
      product = await product.save();
      res.json(product);
    } catch (err) {
      next(err);
    }
  };

  exports.delete = async (req, res, next) => {
    try {
      let product = await Post.findById(req.params.id);
    // non implémenté : l'utilisateur doit être connecté

    //   if (!product || product.id != req.product.id) {
    //     const error = new Error("Wrong request");
    //     error.statusCode = 400;
    //     throw error;
    //   }
      await product.delete();
      res.json({ message: "Post successfuly deleted!" });
    } catch (err) {
      next(err);
    }
  };