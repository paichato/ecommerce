const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  console.log("bodY:", req.body);
  try {
    const { name } = req.body;
    let existingSub = await Sub.findOne({ slug: name }).exec();
    if (existingSub) {
      res.status(400).send("Sub already exists");
    } else {
      const sub = await new Sub({ name, slug: slugify(name) }).save();
      res.json(sub);
    }
  } catch (error) {
    res.status(400).send("Create sub failed");
  }
};
exports.list = async (req, res) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};
exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
};
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send("Sub update failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json({
      deleted,
    });
  } catch (error) {
    res.status(400).send("Sub delete failed");
  }
};