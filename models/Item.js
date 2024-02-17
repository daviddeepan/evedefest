const mongoose = require("mongoose");
const schema = mongoose.Schema;

const festCardSchema = new schema({
	user: {
		type: schema.Types.ObjectId,
		ref: "user",
	},
	festName: {
		type: String,
		required: true,
	},
	collegeName: {
		type: String,
		required: true,
	},
	festDateFrom: {
		type: Date,
		required: true,
	},
	festDateTo: {
		type: Date,
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
				type: schema.Types.ObjectId,
				ref: "user",
			},
		},
	],
});

module.exports = Item = mongoose.model("item", festCardSchema);
