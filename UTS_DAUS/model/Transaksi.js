const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Schema.ObjectId

const transaksiSchema = new Schema({
	idUser:{
		type: objectId
  },
  idMotor:{
    type: objectId
  },
  hargaMotor:{
    type: Number
  },
  jumlah:{
    type: Number
  },
  kecepatanMotor:{
    type: String
  },
  totalHarga: {
    type: Number
  },
  pembayaran: {
    /*  1: Cash, 
        2: Credit  
    */
    type: String
  },
  status: {
    /*  1: Sedang Di Proses 
        2: Sedang Dikirim
        3: Sudah Diterima
    */
    type: Number,
    default: 1
  },
  image: {
    type: String
  }
})
module.exports = mongoose.model('transaksi', transaksiSchema)