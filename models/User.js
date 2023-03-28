const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
	name: {
		type: String,
		required: true,
	},
    email :{
        type: String,
        required: true,
        unique: true,
    },
	regiter_date: {
		type: Date,
		default: Date.now,
	},
	password: {
		type: String,
		required: true,
	},
	
});

module.exports = User = mongoose.model("user", UserSchema);