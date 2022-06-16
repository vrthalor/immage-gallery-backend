var mongoose = require('mongoose');
var datetime = require('node-datetime');
var date = datetime.create();
var formattedDate = date.format('m/d/y H:M:S');
var Schema = mongoose.Schema;

var gallerySchema = new Schema({
    category: { type: String },
    label: { type: String },
    path: { type: String },
    date: { type: Date, default: Date.now() },
}, { timestamps: true })
var galleryCollection = mongoose.model("nits_solutions", gallerySchema, "nits_solutions")

module.exports = {
    galleryCollection
}