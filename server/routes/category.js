const express = require("express");

const router = express.Router();

//middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/category");

router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category:slug", authCheck, adminCheck, read);
router.put("/category:slug", authCheck, adminCheck, update);
router.delete("/category:slug", authCheck, adminCheck, remove);

module.exports = router;
