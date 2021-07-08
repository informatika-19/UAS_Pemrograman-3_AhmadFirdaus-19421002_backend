const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userScema = new Schema({
	username:{
		type: String
  },
  nama:{
    type: String
  },
  email:{
    type: String
  },
  password:{
    type: String
  },
  level:{
    type: Number,
    // 2 = Pembeli, 1 = Admin
    default: 2
  },
})
module.exports = mongoose.model('user',userScema)