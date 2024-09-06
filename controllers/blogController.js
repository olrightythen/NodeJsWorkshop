const { blogs } = require("../models/index");

// Fetch all blogs and render home page
exports.renderHomePage = async (req, res) => {
  try {
    const allBlogs = await blogs.findAll();
    res.render("layout", { title: "Home", body: "index", blogs: allBlogs });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Fetch a blog by ID and render the blog page
exports.renderSingleBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogs.findByPk(id);
    if (blog) {
      res.render("layout", { title: blog.title, body: "blogs", blog });
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Render the form for creating a blog
exports.renderCreateBlog = (req, res) => {
  res.render("layout", { title: "Create blogs", body: "create" });
};

// Create a new blog and store it in the database
exports.createBlog = async (req, res) => {
  const { title, subtitle, description } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    await blogs.create({
      title,
      subtitle,
      description,
      image,
    });
    res.send(
      "<h1>Blog created successfully!</h1> <a href='/'>Go back to the homepage</a>"
    );
  } catch (error) {
    res.status(500).send("Error creating blog");
  }
};

// Render the form for editing a blog
exports.renderEditBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogs.findByPk(id);
    if (blog) {
      res.render("layout", { title: "Edit blogs", body: "edit", blog });
    } else {
      res
        .status(404)
        .send("<h1>404 Not Found</h1><a href='/'>Go back to the homepage</a>");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Update an existing blog in the database
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, description } = req.body;
  const image = req.file ? req.file.filename : undefined; // Only update if new image is uploaded

  try {
    const blog = await blogs.findByPk(id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    blog.title = title;
    blog.subtitle = subtitle;
    blog.description = description;
    if (image) blog.image = image; // Update the image only if a new one is provided

    await blog.save();
    res.redirect(`/blogs/${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating blog");
  }
};

// Delete a blog from the database
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogs.findByPk(id);
    if (blog) {
      await blog.destroy();
      res.redirect("/");
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};
