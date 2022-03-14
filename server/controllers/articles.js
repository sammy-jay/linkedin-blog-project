const Article = require("../models/articles");

const getAllArticles = (req, res) => {
  Article.find({}, (err, data) => {
    if (!err) {
      return res.status(200).json(data);
    }
    res.status(404).json("An Error Occured.");
  });
};

const createArticle = (req, res) => {
  const { title, author, date, content } = req.body;

  const newArticle = new Article({
    title,
    date,
    author,
    content,
  });
  newArticle.save((err, data) => {
    if (!err) {
      return res.status(201).json(data);
    }
    res.status(404).json("An error occured");
  });
};

const getArticle = (req, res) => {
  const { id } = req.params;
  Article.findById(id, (err, data) => {
    if (!err) {
      return res.status(200).json(data);
    }
    res.status(404).json("An Error Occured.");
  });
};

const createComment = (req, res) => {
  const { id, reader, comment } = req.body;
  const newComment = { reader, comment };
  Article.findByIdAndUpdate(
    id,
    { $push: { comments: newComment } },
    (err, data) => {
      if (!err) {
        return res.status(200).json(data);
      }
      res.status(404).json("An Error Occured.");
    }
  );
};

const alterUpvotes = (req, res) => {
  const { id, incr } = req.body;
  if (incr) {
    Article.findByIdAndUpdate(id, { $inc: { upvotes: +1 } }, (err, data) => {
      if (!err) {
        return res.status(200).json(data);
      }
      res.status(404).json("An Error Occured.");
    });
  } else {
    Article.findByIdAndUpdate(id, { $inc: { upvotes: -1 } }, (err, data) => {
      if (!err) {
        return res.status(200).json(data);
      }
      res.status(404).json("An Error Occured.");
    });
  }
};

module.exports = {
  getAllArticles,
  createArticle,
  getArticle,
  createComment,
  alterUpvotes,
};
