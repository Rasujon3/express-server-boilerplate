const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

let tools = [
  { id: 1, name: "Hammer" },
  { id: 2, name: "Hammer2" },
  { id: 3, name: "Hammer3" },
];

module.exports.getAllTools = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const db = getDb();

    // cursor => toArray(), forEach()
    const tool = await db
      .collection("tools")
      .find()
      // .project({ _id: 0 })
      .skip(+page * limit)
      .limit(+limit)
      .toArray();

    res.status(200).json({ success: true, data: tool });
  } catch (error) {
    next(error);
  }
};

module.exports.saveATool = async (req, res, next) => {
  try {
    const db = getDb();
    const tool = req.body;

    const result = await db.collection("tools").insertOne(tool);
    console.log(result);
    if (!result.insertedId) {
      res.status(400).send({ status: false, error: "Something went wrong" });
    }
    if (result.insertedId) {
      res.send({
        success: true,
        message: `Tool added with id: ${result.insertedId}`,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getToolDetail = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid id" });
    }

    const tool = await db.collection("tools").findOne({ _id: ObjectId(id) });

    if (!tool) {
      return res
        .status(400)
        .json({ success: false, error: "Cont find data with this id" });
    }

    res.status(200).json({ success: true, data: tool });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTool = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid id" });
    }

    const tool = await db.collection("tools").deleteOne({ _id: ObjectId(id) });

    if (!tool.deletedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Couldn't delete the tool" });
    }

    res
      .status(200)
      .json({ success: true, data: "Successfully deleted the tool" });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTool = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid id" });
    }

    const tool = await db
      .collection("tools")
      .updateOne({ _id: ObjectId(id) }, { $set: req.body });

    if (!tool.modifiedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Couldn't update the tool" });
    }

    res
      .status(200)
      .json({ success: true, data: "Successfully update the tool" });
  } catch (error) {
    next(error);
  }
};
