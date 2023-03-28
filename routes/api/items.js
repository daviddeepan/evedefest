const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth")
const festItem = require("../../models/Item");
const checkObjectId = require("../../middleware/checkObjectId")

router.get("/", (req, res) => {
	festItem
		.find()
		.sort({ date: -1 })
		.then((items) => res.json(items));
});

router.post("/", auth,(req, res) => {
	const newFestCard = new festItem({
		festName: req.body.festName,
		location: req.body.location,
	});

	newFestCard.save().then((item) => res.json(item));
});

router.delete("/:id", auth,(req, res) => {
	festItem
		.findById(req.params.id)
		.then((item) =>
			item
				.deleteOne({ _id: req.params.id })
				.then(() => res.json({ success: true }))
		)
		.catch((err) => res.status(404).json({ success: false }));
});
module.exports = router;

router.put("/like/:id", auth, checkObjectId("id"), async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Check if the post has already been liked

		post.likes.unshift({ user: req.user.id });

		await post.save();

		return res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
