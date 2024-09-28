const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
  name: { type: String },
  type: { type: String },
  count: { type: Number },
  image: { type: String },
});

module.exports = model("Category", categorySchema);
