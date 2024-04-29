const Category = require("../models/category");
const Product = require("../models/product");

const create = (req, res, next) => {
  let categoryName = req.body.catName;
  let category = new Category({
    categoryName,
  });
  category.save().then((data) => {
    res.send(data);
  });
};

const view = (req, res, next) => {
  Category.find({}).then((data) => {
    res.send(data);
  });
};

const update = (req, res, next) => {
  Category.findByIdAndUpdate(req.params.id, req.body, (err, category) => {
    if (err) {
      return res
        .status(500)
        .send({ error: "Error with updating the category recorded. " });
    }
    res.send(category);
  });
};

const remove = (req, res, next) => {
  Category.findByIdAndDelete(req.params.id, (err, category) => {
    Product.find({}).then((data) => {
      data.forEach((d) => {
        if (d["category"] == req.params.id) {
          Product.deleteOne(d, (err, r) => {
            res.send("Deleted Successfully!");
          });
        }
      });
    });
  });
};

module.exports.create = create;
module.exports.view = view;
module.exports.update = update;
module.exports.remove = remove;
