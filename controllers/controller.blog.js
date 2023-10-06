import blog from "../models/model.blog.js";

//add blog with mongo
export const addBlog = async (req, res) => {
  const data = req.body;
  try {
    await blog.create(data);
    res.json({ message: "Blog added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//edit blog with mongo
export const editBlog = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await blog.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Blog not found" });
    }
    await blog.findOneAndUpdate({ _id }, req.body);
    res.json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all blogs with mongo
export const viewAllBlogs = async (req, res) => {
  try {
    const found = await blog.find();
    res.json({ message: "Blogs Found.", data: found });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//all blogs with mongo
export const viewSingleBlog = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await blog.findOne({ _id });
    res.json({ message: "Blog Found.", data: found });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete blogs with mongo
export const deleteBlogs = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await blog.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Blog not found" });
    }
    await blog.deleteOne({ _id });
    res.json({ message: "Blog Deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//status change with mongo
export const statusChange = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await blog.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Blog not found" });
    }
    await blog.findOneAndUpdate({ _id }, { blocked: !found.blocked });
    res.json({ message: "Status changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
