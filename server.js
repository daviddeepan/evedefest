const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const app = express();
const items = require("./routes/api/items");
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = config.get("mongoURI");

mongoose
	.connect(db)
	.then(() => console.log("Mongo Online ....."))
	.catch((err) => console.log(err));

const port = process.env.PORT || 5000;


app.use("/api/users", require("./routes/api/users"));
app.use("/api/items", items);
app.use("/api/auth", require("./routes/api/auth"));

app.listen(port, () => console.log(`Port Started and listening on ${port}`));
