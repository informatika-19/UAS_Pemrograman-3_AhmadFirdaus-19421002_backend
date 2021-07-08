const motorModel = require ('../model/Motor')
const ObjectId = require ('mongoose').Types.ObjectId
const { requestResponse } = require ('../config/message.js')
const { deleteImage } = require('../config/uploadConfig')

exports.insertMotor = (data) =>
  new Promise((resolve, reject) => {
    motorModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Menambahkan Motor')))
    .catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.getMotor = () =>
  new Promise((resolve, reject) => {
    motorModel.find({})
    .then((motor) => resolve(requestResponse.sukseswithdata('Success Get Data', motor)))
    .catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.getMotorbyId = (id) =>
  new Promise((resolve, reject) => {
    motorModel.findOne({
      _id: ObjectId(id)
    })
    .then((motor) => resolve(requestResponse.sukseswithdata('Success Get Data', motor)))
    .catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.updateMotor = (id, data, changeImage) =>
  new Promise((resolve, reject) => {
    motorModel.findOne({
      _id: ObjectId(id)
    }).then((motor) => {
      if (changeImage) {
        if (motor.image !== 'null') {
          deleteImage(motor.image)
        }
      }
      motorModel.updateOne({
        _id: ObjectId(id)
      }, data)
      .then(() => resolve(requestResponse.sukses('Berhasil Ubah Motor')))
      .catch((err) => {
        console.log(err)
        reject(requestResponse.gagal('Gagal Ubah Motor'))
      })
    }).catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.deleteMotor = (id) =>
  new Promise((resolve, reject) => {
    motorModel.findOne({
      _id: ObjectId(id)
    }).then((motor) => {
      deleteImage(motor.image)
      motorModel.deleteOne({
        _id: ObjectId(id)
      }).then(() => resolve(requestResponse.sukses('Berhasil Hapus Motor')))
      .catch((err) => {
        console.log(err)
        reject(requestResponse.gagal('Gagal Hapus Motor'))
      })
    }).catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })