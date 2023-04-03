const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const festItem = require("../../models/Item");
const User = require("../../models/User");
router.get("/", (req, res) => {
	festItem
		.find()
		.sort({ date: -1 })
		.then((items) => res.json(items));
});

router.post("/", auth, async (req, res) => {
	const user = await User.findById(req.user.id).select("-password");

	const newFestCard = new festItem({
		user: req.user.id,
		festName: req.body.festName,
		location: req.body.location,
	});

	newFestCard.save().then((item) => res.json(item));
});

router.delete("/:id", auth, (req, res) => {
	festItem
		.findById(req.params.id)
		.then((item) =>
			item
				.deleteOne({ _id: req.params.id })
				.then(() => res.json({ success: true }))
		)
		.catch((err) => res.status(404).json({ success: false }));
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
	try {
		const post = await festItem.findById(req.params.id);
		// Check if the post has already been liked
		if (
			post.festVotes.filter(
				(like) => like.user.toString() === req.user.id
			).length > 0
		) {
			return res.status(400).json({ msg: "Post already liked" });
		}

		post.festVotes.unshift({ user: req.user.id });

		await post.save();

		res.json(post.festVotes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    PUT api/posts/unlike/:id
// @desc     Like a post
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
	try {
		const post = await festItem.findById(req.params.id);

		// Check if the post has already been liked
		if (
			post.festVotes.filter(
				(like) => like.user.toString() === req.user.id
			).length === 0
		) {
			return res.status(400).json({ msg: "Post has not yet been liked" });
		}

		// Get remove index
		const removeIndex = post.festVotes
			.map((like) => like.user.toString())
			.indexOf(req.user.id);

		post.likes.splice(removeIndex, 1);

		await post.save();

		res.json(post.festVotes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
