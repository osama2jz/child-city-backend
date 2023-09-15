import aboutUs from "../models/model.aboutUs.js";

//edit aboutUs with mongo
export const editAboutUs = async (req, res) => {
  const _id = req.params.id;
  try {
    delete req.body._id
    await aboutUs.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true,
    });
    res.json({ message: "AboutUs updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get aboutUs with mongo
export const viewAboutUs = async (req, res) => {
  try {
    const found = await aboutUs.find();
    res.json({ message: "AboutUs Found.", data: found });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
