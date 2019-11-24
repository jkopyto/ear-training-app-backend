const Joi = require("joi")
const Schema = require("mongoose").Schema
const mongoose = require("mongoose")

const sheetSchema = new Schema({
  sheetTitle: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
})

const Sheet = mongoose.model("Sheet", sheetSchema)

const validateSheet = sheet => {
  const schema = {
    sheetTitle: Joi.string()
      .min(3)
      .max(50)
  }
  return Joi.validate(sheet, schema)
}

exports.Sheet = Sheet
exports.validateSheet = validateSheet
