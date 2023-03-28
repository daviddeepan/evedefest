const mongoose = require("mongoose");
const schema = mongoose.Schema;

const festCardSchema = new schema({
	festName: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	location: {
		type: String,
		required: true,
	},
	festVotes: [
		{
			user: {
				type: schema.Types.ObjectId
			  }
		}
	],
});

module.exports = Item = mongoose.model("item", festCardSchema);
