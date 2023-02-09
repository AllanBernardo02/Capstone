const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection

connection.on("connected", () => {
    console.log("Mongodb is connected")
})

connection.on("error", () => {
    console.log("Mongodb is error", error)
})

module.exports = mongoose