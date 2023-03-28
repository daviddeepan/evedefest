const express = require("express");
const config = require("config");
const auth = require("../../middleware/auth");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

router.post("/", (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(404).json({ msg: "Please fill out all details" });
	}

	User.findOne({ email }).then((user) => {
		if (!user) return res.status(404).json({ msg: "user not found" });
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch)
				return res
					.status(404)
					.json({ msg: "Invalid password try again !" });
			jwt.sign(
				{ id: user.id },
				config.get("jwtSecret"),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({
						user: {
							token,
							id: user.id,
							name: user.name,
							email: user.email,
						},
					});
				}
			);
		});
	});
});

router.get("/user", auth, (req, res) => {
	User.findOne(req.user.id)
		.select("-password")
		.then((user) => res.json(user));
});
module.exports = router;
