const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    favouriteGenre: {
        type: String,
        minLength: 3
    }
})

module.exports = mongoose.model('User', schema)