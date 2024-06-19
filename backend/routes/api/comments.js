const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

/**
 * Express router for handling comments API requests.
 * @module routes/api/comments
 */

module.exports = router;

/**
 * Route for getting all comments.
 * @name GET /api/comments
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Array of comments.
 */
router.get("/", async (req, res) => {
  const comments = await Comment.find();
  res.send(comments);
});

/**
 * Route for deleting a comment by ID.
 * @name DELETE /api/comments/:id
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Object with the ID of the deleted comment.
 * @throws {Object} - Object with an error message if the deletion fails.
 */
router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        await comment.remove();
        res.send({ id: req.params.id });
    } catch (error) {
        res.status(500).send({ error: "Failed to delete comment" });
    }
});