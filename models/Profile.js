const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProfileSchema = schema([{
	user: {
		type: mongoose.Schema.ObjectId,
	},
}]);

module.exports = Profile = mongoose.model("profile", ProfileSchema);
