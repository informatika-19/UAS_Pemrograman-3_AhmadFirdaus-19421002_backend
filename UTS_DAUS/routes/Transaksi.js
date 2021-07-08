const router = require('express').Router()
const transaksiController = require('../controller/Transaksi')
const uploadSetting = require('../config/uploadConfig')
const fields = uploadSetting.upload.fields([
  {
    name: 'image',
    maxCount: 1
  }
])

router.post('/insert', fields, (req, res) => {
  const imageName = uploadSetting.cekNull(req.files['image'])

  /* Menyatukan data dari request body dan imageName
    req.body => untuk postman
    JSON.parse(req.body.data) => untuk quasar
   */
  
  const data = Object.assign(JSON.parse(req.body.data), {
    image: imageName
  })
  transaksiController.transaksi(data)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/getTransaksi', (req, res) => {
  transaksiController.getTransaksi()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/getTransaksiId/:id', (req, res) => {
  transaksiController.getTransaksiById(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})


// Untuk Konfirmasi bahwa pesanan telah diterima
router.put('/konfirmasiuser/:id', (req, res) => {
  transaksiController.konfirmasiuser(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})


// Untuk Konfirmasi bahwa pesanan telah dikonfirmasi oleh admin
router.put('/konfirmasiadmin/:id', (req, res) => {
  console.log(req.params.id)
  transaksiController.konfirmasiadmin(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

module.exports = router