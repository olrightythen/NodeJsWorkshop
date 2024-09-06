const express = require("express");
const router = express.Router();
const { renderHomePage, renderSingleBlog, renderCreateBlog, createBlog, renderEditBlog, updateBlog, deleteBlog } = require("../controllers/blogController");
const upload = require("../middleware/multerConfig");

router.route("/").get(renderHomePage);
router.route("/blogs/:id").get(renderSingleBlog);
router.route("/create").get(renderCreateBlog).post(upload.single("image"), createBlog);
router.route("/edit/:id").get(renderEditBlog).put(upload.single("image"), updateBlog);
router.route("/delete/:id").delete(deleteBlog);

module.exports = router;
