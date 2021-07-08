const router = require('express').Router()
const motorController = require('../controller/Motor')
const uploadSetting = require('../config/uploadConfig')
const fields = uploadSetting.upload.fields([
  {
    name: 'image',
    maxCount: 1
  }
])

router.post('/insert', fields, (req, res) => {
  // Mencek apakah file image ada atau tidak
  const imageName = uploadSetting.cekNull(req.files['image'])

  /* Menyatukan data dari request body dan imageName
    req.body => untuk postman
    JSON.parse(req.body.data) => untuk quasar
   */
  
  const data = Object.assign(JSON.parse(req.body.data), {
    image: imageName
  })
  // const data = Object.assign(req.body, {
  //   image: imageName
  // })
  
  motorController.insertMotor(data)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/getMotor', (req, res) => {
  motorController.getMotor()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/getMotorbyId/:id', (req, res) => {
  motorController.getMotor(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.put('/editMotor/:id', fields, (req, res) => {
  const imageName = uploadSetting.cekNull(req.files['image'])

  /* Pilih salah satu,
    req.body => jika postman
    JSON.parse(req.body.data) => jika quasar
  */ 
  // let data = req.body
  let data = JSON.parse(req.body.data) 


  let changeImage = false
  if (imageName) {
    changeImage = true
    data = Object.assign(data, {
      image: imageName
    })
  }
  console.log(data)

  motorController.updateMotor(req.params.id, data, changeImage)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.delete('/deleteMotor/:id', (req, res) => {
  motorController.deleteMotor(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

module.exports = router