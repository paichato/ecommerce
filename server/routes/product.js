const express = require("express");

const router = express.Router();

//middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

const {
  create,
  //   list,
  listAll,
  read,
  remove,
} = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", authCheck, read);
// router.get("/categories", list);
// router.get("/category/:slug", read);
// router.put("/category/:slug", authCheck, adminCheck, update);
// router.delete("/category/:slug", authCheck, adminCheck, remove);

module.exports = router;
