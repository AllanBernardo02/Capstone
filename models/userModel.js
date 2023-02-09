const mongoose = require ("mongoose");
const { required } = require("nodemon/lib/config");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: "string",
            required: true,
        },
        email: {
            type: "string",
            required: true,
        },
        password: {
            type: "string",
            required: true,
        },

        isDoctor: {
            type: boolean,
            default: false,
        },
        isAdmin: {
            type: boolean,
            default: false,
        },
        isApplyDoctor: {
            type: boolean,
            default: false,
        },
        isBlocked: {
            type: boolean,
            deafault: false,
        },
        seenNotification: {
            type: Array,
            default: [],
        },
        unseenNotification: {
            type: Array,
            default: []
        },

    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;