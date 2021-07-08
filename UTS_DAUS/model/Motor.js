const mongoose = require('mongoose')
const Schema = mongoose.Schema

const motorSchema = new Schema({
	namaMotor:{
		type: String
  },
  tipeMotor:{
    type: String
  },
  kecepatanMotor:{
    type: String
  },
  tahunMotor:{
    type: String
  },
  hargaMotor:{
    type: Number
  },
  image:{
    type: String
  }
})
module.exports = mongoose.model('motor', motorSchema)