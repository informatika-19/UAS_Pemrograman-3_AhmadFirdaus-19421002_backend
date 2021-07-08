const transaksiModel = require('../model/Transaksi')
const ObjectId = require ('mongoose').Types.ObjectId
const { requestResponse } = require ('../config/message.js')


exports.transaksi = (data) =>
  new Promise((resolve, reject) => {
    console.log(data)
    transaksiModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Transaksi')))
    .catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.getTransaksi = () =>
  new Promise((resolve, reject) => {
    transaksiModel.aggregate([
      {
        $lookup: {
          from: "motors",
          localField: "idMotor",
          foreignField: "_id",
          as: "dataMotor"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "idUser",
          foreignField: "_id",
          as: "dataUser"
        }
      }
    ]).then((data) => resolve(requestResponse.sukseswithdata('Success Get Data', data)))
    .catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.getTransaksiById = (id) =>
  new Promise((resolve, reject) => {
    transaksiModel.aggregate([
      {
        $match: {
          idUser: ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "motors",
          localField: "idMotor",
          foreignField: "_id",
          as: "dataMotor"
        }
      }
    ]).then((data) => resolve(requestResponse.sukseswithdata('Success Get Data', data)))
    .catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.konfirmasiuser = (id) => 
  new Promise((resolve, reject) => {
    transaksiModel.updateOne({
      _id: ObjectId(id)
    },
    {
      status: 3
    }).then(() => resolve(requestResponse.sukses('Berhasil Menerima Transaksi')))
    .catch(() => reject(requestResponse.serverError))
})

exports.konfirmasiadmin = (id) => 
  new Promise((resolve, reject) => {
    transaksiModel.updateOne({
      _id: ObjectId(id)
    },
    {
      status: 2
    }).then(() => resolve(requestResponse.sukses('Berhasil Konfirmasi Transaksi')))
    .catch(() => reject(requestResponse.serverError))
})