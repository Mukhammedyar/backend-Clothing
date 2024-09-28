const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  categoryType: { type: String, required: true },
  colors: { type: [String], required: true },
  colorName: { type: String, required: true },
  sizes: { type: [String], required: true },
  price: { type: Number, required: true},
  productId: { type: String, required: true},
  image: { type: String, required: true},
  complect1:{ type: [String]},
  complect2:{ type: [String]},
  description: { type: String},
});

module.exports = model("ProductSchema", ProductSchema);