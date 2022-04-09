const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  //   console.log(req.headers);

  try {
    if (req.headers.authtoken) {
      const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);
      console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
      req.user = firebaseUser;
    } else {
      return res.status(401).json({ error: "Missing token in header" });
    }

    // next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Invalid or expired token",
      errorMessage: error,
    });
  }

  next();
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email }).exec();

  try {
    if (adminUser.role !== "admin") {
      res.status(403).json({
        err: "Admin resources. Access denied.",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log("ADMIN CHECK ERROR:", error);
    return res.status(500).json({
      error: `ERRO AO VERIFICAR PERMISSOES: ${error}`,
    });
  }
};
