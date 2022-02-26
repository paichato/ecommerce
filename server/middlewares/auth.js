const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  //   console.log(req.headers);

  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    req.user = firebaseUser;
    // next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }

  next();
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email }).exec();

  if (adminUser !== "admin") {
    res.status(403).json({
      err: "Admin resources. Access denied.",
    });
  } else {
    next();
  }
};
