const express = require("express");
const router = express.Router();
const {
  renderHomePage,
  renderSingleBlog,
  renderCreateBlog,
  createBlog,
  renderEditBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const upload = require("../middleware/multerConfig");

router.route("/").get(renderHomePage);
router.route("/blogs/:id").get(renderSingleBlog);
router
  .route("/create")
  .get(renderCreateBlog)
  .post(upload.single("image"), createBlog);
router
  .route("/blogs/:id/edit")
  .get(renderEditBlog)
  .post(upload.single("image"), updateBlog);
router.route("/blogs/:id/delete").post(deleteBlog);

module.exports = router;
