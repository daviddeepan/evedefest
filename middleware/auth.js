const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function auth(req, res, next) {
	try {
		const token = req.header("x-auth-token");
		if (!token)
			return res
				.status(401)
				.json({ msg: "No token, authorization needed" });
		const decoded = jwt.verify(token, config.get("jwtSecret"));
		req.user = decoded;
		next();
	} catch (e) {
		res.status(400).json({ msg: "Token not valid" });
	}
}
const checkUser = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (token) {
		jwt.verify(token, config.get("jwtSecret"), async (error, decoded) => {
			if (error) {
				console.log(error.message);
				res.status(401).json({ msg: "Token is not valid" });
				res.locals.user = null;
				next();
			} else {
				console.log(decoded);
				let user = await User.findById(decoded.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = { auth, checkUser };
