/**
 * Create RESTful routes that facilitate CRUD operations
 * over 'blogs' entity inside your blogpost app
 */

/**
 * RESTful routes
 * GET    /blogs            : Reads all blogs from DB, and renders base view
 * GET    /blogs/:id        : Fetches a single blog by its ID
 * GET    /blogs/new        : Renders add new Blog view
 * POST   /blogs            : Add a new blog to the DB
 * GET    /blogs/:id/edit   : View to update a blog
 * PATCH  /blogs/:id        : Handle update in DB
 * DELETE /blogs/:id        : Deletes blog by id
 */

const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.static(path.join(__dirname, "public"));

// * GET all  /blogs            : Reads all blogs from DB, and renders base view
//GET bY hash /blogs?hashtag=food  : Query
app.get("/blogs", async (req, res) => {
  const { hashtag } = req.query;
  try {
    const blogs = await Blog.find();
    res.status(200).render("index", { blogs });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
// * GET  /blogs/:id        : Fetches a single blog by its ID
app.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    res.status(200).render("index", { blog });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
// * GET  /blogs/new        : Renders add new Blog view
app.get("/blogs/new", (req, res) => {
  res.render("addBlog");
});
// * POST /blogs            : Add a new blog to the DB
app.post("/blogs", (req, res)=> {
    const { name, title, caption, img } = req.body;

})