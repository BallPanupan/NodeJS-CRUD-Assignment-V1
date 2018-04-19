const Todolists  = require('../models/todolists')

async function get (req, res, next) {
  const data = await Todolists.find()
  res.status(200).json(data)
}

module.exports = {
  get

}
