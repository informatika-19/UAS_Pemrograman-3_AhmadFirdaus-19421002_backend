const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose= require ('mongoose')

mongoose.connect('mongodb://localhost:27017/utsdaus', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then (() => {
    console.log('Connected Database')
}).catch((e)=>{
    console.log(e)
    console.log('Failed')
})
app.use(bodyParser.json({
    extended: true,
    limit: '20mb'
}))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '20mb'
}))

const directory = path.join(__dirname, '/statics/')
app.use(express.static(directory))
app.use(cors())

app.use('/user', require('./routes/User'))
app.use('/motor', require('./routes/Motor'))
app.use('/transaksi', require('./routes/Transaksi'))

app.listen(3000, () => {
    console.log('Server Started in Port 3000')
})