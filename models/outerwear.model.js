const { model, Schema } = require("mongoose");

const outerWearSchema = new Schema({
  name: { type: String},
  type: { type: String },
  categoryType: { type: String},
  color: { type: [String], required: true },
  colorName: { type: String, required: true},
  productId: { type: String},
  image: { type: String},
  complect1:{ type: [String]},
  complect2:{ type: [String]}
});

module.exports = model("OuterWear", outerWearSchema);
