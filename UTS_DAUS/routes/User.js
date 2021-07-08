const router = require('express').Router()
const userController = require('../controller/User')

router.post('/register', (req, res) => {
  userController.register(req.body)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.post('/login', (req, res) => {
  userController.login(req.body)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.get('/getUser', (req, res) => {
  userController.getall()
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.get('/getByid/:id', (req, res) => {
  userController.getUserById(req.params.id)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.put('/editUser/:id', (req, res) => {
  userController.EditUser(req.params.id, req.body)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.delete('/deleteUser/:id', (req, res) => {
  userController.DeleteUser(req.params.id)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

module.exports = router