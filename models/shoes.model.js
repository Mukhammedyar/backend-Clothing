const { model, Schema } = require("mongoose");

const shoesSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  categoryType: { type: String, required: true },
  colors: { type: [String], required: true },
  colorName: { type: String, required: true },
  productId: { type: String, required: true},
  image: { type: String, required: true},
  complect1:{ type: [String]},
  complect2:{ type: [String]}
});

module.exports = model("Shoes", shoesSchema);
