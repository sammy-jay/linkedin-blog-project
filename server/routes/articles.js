const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  createArticle,
  getArticle,
  createComment,
  alterUpvotes,
} = require("../controllers/articles");

router.get("/", getAllArticles);
router.post("/", createArticle);
router.get("/:id", getArticle);
router.patch("/", createComment);
router.patch("/article", alterUpvotes);

module.exports = router;
