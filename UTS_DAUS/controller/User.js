const userModel = require('../model/User')
const ObjectId = require ('mongoose').Types.ObjectId
const { requestResponse } = require ('../config/message.js')
const bcrypt = require('bcrypt')

exports.register = (data) =>
  new Promise((resolve, reject) => {
    userModel.findOne({
      username: data.username
    }).then((user) => {
      if (user) {
        reject(requestResponse.gagal('Username Telah Terdaftar'))
      } else {
        bcrypt.hash(data.password, 10, (err, hash) => {
          data.password = hash
          userModel.create(data)
          .then(() => resolve(requestResponse.sukses('Berhasil Register')))
          .catch((err) => {
            console.log(err)
            reject(requestResponse.gagal('Gagal Register'))
          })
        })
      }
    }).catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.login = (data) => 
  new Promise((resolve, reject) => {
    userModel.findOne({
      username: data.username
    }).then((user) => {
      if (user) {
        if (bcrypt.compareSync(data.password, user.password)) {
          console.log(user)
          resolve(requestResponse.sukseswithdata('Berhasil Login',user))
        } else {
          reject(requestResponse.gagal('Password Salah'))
        }
      } else {
        reject(requestResponse.gagal('Username tidak terdaftar'))
      }
    }).catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.getall = () =>
  new Promise((resolve, reject) =>{
    userModel.find({
      level: 2
    }).then((user) => resolve(requestResponse.sukseswithdata('Berhasil Mendapatkan User', user)))
    .catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.getUserById = (id) =>
  new Promise((resolve, reject) => {
    userModel.findOne({
      _id: ObjectId(id)
    }).then((user) => resolve(requestResponse.sukseswithdata('Berhasil Mendapatkan User', user)))
    .catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.EditUser = (id, data) =>
  new Promise((resolve, reject) => {
    userModel.updateOne({
      _id: ObjectId(id)
    }, data)
    .then(() => resolve(requestResponse.sukses('Berhasil Mengubah Data')))
    .catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.DeleteUser = (id) =>
  new Promise((resolve, reject) => {
    userModel.deleteOne({
      _id: ObjectId(id)
    })
    .then(() => resolve(requestResponse.sukses('Berhasil Hapus User')))
    .catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })