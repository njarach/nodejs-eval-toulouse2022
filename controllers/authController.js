const jwt = require("jwt-simple");
const config = require("../config");


const User = require("../models/user");


// ci-dessous copié collé des enfers mais promis c'est (plutôt) bien compris
exports.login = async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        const error = new Error("Wrong credentials");
        error.statusCode = 401;
        throw error;
      }
      const validPassword = await user.validPassword(password, user.password);
      if (!validPassword) {
        const error = new Error("Wrong credentials");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.encode({ id: user.id }, config.jwtSecret);
      return res.json({ user, token });
    } catch (err) {
      next(err);
    }
  };
  exports.signup = async (req, res, next) => {
    try {
     
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        const error = new Error("Email already used");
        error.statusCode = 403;
        throw error;
      }
      let user = new User();
      user.email = req.body.email;
      user.password = await user.encryptPassword(req.body.password);
      user.name = req.body.name;
      user = await user.save();
      const token = jwt.encode({ id: user.id }, config.jwtSecret);
    //   création de l'user et génération du token
      return res.json({ user, token });
    } catch (err) {
      next(err);
    }
  };
  
  exports.me = async (req, res, next) => {
    try {
      const user = await User.findById(req.user);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };
  