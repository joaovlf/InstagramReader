const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const User = require('./model/Profile')
const RequestController = require('./controller/RequestController')


//database connection
mongoose.connect("mongodb+srv://joaovlf:233223Jj@cluster0.rcy0x.mongodb.net/instagram?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology: true})

//views config
app.set('view engine', 'ejs')
app.set('views',__dirname+'/views')

//set static files for public folder
app.use(express.static("public"))

//config body-parser
app.use(bodyParser.urlencoded({extended:true}))


//aplication

    //render view "index" in main router
app.get('/',(req,res)=>{
      res.render('index')
})

    //router of request user data
app.get('/user',RequestController)


    //save data user in database
app.post('/user',(req,res)=>{

        let saveUser = new User(req.body);
        saveUser.save().then(()=>{
            res.redirect('/')
        })            
})
    //select data and rendering on page "savedUser" on  front-end
app.get('/savedUser',(req,res)=>{
    
    User.find().then((data)=>{
        res.render('savedUser',{users:data})
    })
})
    // select user saved data and deleting on front-end and database
app.post('/savedUser',(req,res)=>{
    id = req.body.id
    User.findByIdAndRemove(id).exec()
    res.redirect('/savedUser')
})


//server listening config

let PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`successfully connected on port ${PORT}`);
})

    
