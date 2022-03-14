const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: String,
  author: String,
  date: String,
  content: String,
  upvotes: {
    type: Number,
    default: 0,
  },
  comments: Array,
});

const Articles = mongoose.model("articles", articleSchema);

module.exports = Articles;
