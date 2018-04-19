const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Todolist = new Schema({
	text: {type: String}
})

module.exports = Mongoose.model('Todolist', Todolist)
