const mongoose = require("mongoose")

const subscriptionSchema = new mongoose.Schema({
    planDetails: {},
    stripePlanId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'richpanelUsers'
    },
    stripePaymentId: {
        type: String,
        required: true
    },
    subscriptionId: {
        type: String
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    }

})


module.exports = mongoose.model("richpanelTransactions",subscriptionSchema)