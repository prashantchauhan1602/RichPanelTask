const mongoose = require("mongoose")

const planSchema = new mongoose.Schema({
    basic: {
       "Monthly-Price": Number,
       "Number-of-active-screens-at-one-time": Number,
       "Resolution": String,
       "Video-Quality": String,
       "Yearly-Price": Number
    },
    premium: {
       "Monthly-Price": Number,
       "Number-of-active-screens-at-one-time": Number,
       "Resolution": String,
       "Video-Quality": String,
       "Yearly-Price": Number
    },
    regular: {
       "Monthly-Price": Number,
       "Number-of-active-screens-at-one-time": Number,
       "Resolution": String,
       "Video-Quality": String,
       "Yearly-Price": Number
    },
    standarad: {
       "Monthly-Price": Number,
       "Number-of-active-screens-at-one-time": Number,
       "Resolution": String,
       "Video-Quality": String,
       "Yearly-Price": Number
    }
})


module.exports = mongoose.model("richpanelplans",planSchema)