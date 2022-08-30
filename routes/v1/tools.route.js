const express = require("express");
const toolsControllers = require("../../controllers/tools.controller");
const limiter = require("../../middleware/limiter");
const viewCount = require("../../middleware/viewCount");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("tools found");
// });

// router.post("/", (req, res) => {
//   res.send("tool added");
// });

router
  .route("/")
  /**
   * @api {get} /tools All tools
   */
  .get(toolsControllers.getAllTools)
  /**
   * @api {post} /tools Add
   */
  .post(toolsControllers.saveATool);

router
  .route("/:id")
  .get(viewCount, limiter, toolsControllers.getToolDetail)
  .patch(toolsControllers.updateTool)
  .delete(toolsControllers.deleteTool);

let tool = {
  id: 1,
  name: "hammer",
};

const newtool = { name: "test" };

// put
tool = { name: "test" };

// patch
tool = { id: 1, name: "test" };

module.exports = router;
