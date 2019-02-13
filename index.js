const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')
const storage = multer.memoryStorage()
const upload = multer({storage})

app.set('port',process.env.PORT || 3000)

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'./public')))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./page.html'))
})

app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    })
})

app.listen(app.get('port'),(err)=>{
    if(err){
        console.log('SERVER ERROR:',err)
        process.exit(1)
    }
    console.log(`Server Listening on http://localhost:${app.get('port')}`)
})