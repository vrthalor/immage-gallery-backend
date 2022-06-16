const fs = require("fs")
const path = require("path")

//external imports
const {pascalCase} = require("change-case");
const Mongoose = require("mongoose")

const { mongoose } = require("./mongo.connection");

// const MODELS_DIRECTORY_PATH = path.resolve(__dirname, "models");

importModels = () => {
    const models = {};
    // fs.readdirSync(MODELS_DIRECTORY_PATH)
    // .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
    // .forEach((file) => {
        // const model = require(path.join(MODELS_DIRECTORY_PATH, file))(Mongoose)
        // models[pascalCase(model.modelName)] = model;
    // });
    return models;

};
const db = importModels();

db.mongoose = mongoose;
db.Mongoose = Mongoose;

module.exports = db;
