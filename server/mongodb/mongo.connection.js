const Mongoose = require("mongoose");

const config = require("../configuration");

let uri = config.get("mongodb.url");
let dbName = config.get("mongodb.database");
let cloudMongodb = config.get("mongodb.cloudMongodb")
// let mongoose = Mongoose.connect(`${uri}${dbName}`, {
let mongoose = Mongoose.connect(cloudMongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("successfully connect to MongoDB.");
    })
    .catch((err) => {
        console.error("connection error", err);
        process.exit();
    });

module.exports = { mongoose };