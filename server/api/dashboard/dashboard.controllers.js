
const {  galleryCollection } = require('../../models/schema')

exports.dashboard = async (req, res) => {
    res.send("welcome in test dashboard");
}

exports.getGallery = async (req, res) => {
    console.log("inside gallery")
    const data = await galleryCollection.find({}).limit().sort({"_id":1})
    if (data) {
        res.status(200).json({
            error: false,
            code: 200,
            message: "success fatch gallery",
            data: data
        });
    }
    else {
        res.status(400).json({
            error: false,
            code: 400,
            message: "not found"
        });
    }
}

