const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const commentController = require("../controllers/commentController");

//Create a comment
router.post("/create", verifyToken, commentController.create);

//Get all comment of a post
router.get("/:id", verifyToken, commentController.getAllComment);

//Update a comment
router.put("/update/:id", verifyToken, commentController.update);

//Delete a comment
router.delete("/delete/:id", verifyToken, commentController.delete);

module.exports = router;
