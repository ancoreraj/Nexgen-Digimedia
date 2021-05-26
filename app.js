
const express = require('express')
const dotenv = require('dotenv')
const app = express();
dotenv.config({ path: './config.env' })

const sendEmail = require('./sendmail')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req,res)=>{
    try{
        const {name, email, phoneNumber, message} = req.body;
        sendEmail(name, email, phoneNumber, message);
        res.redirect('/')

    }catch(err){

    }
    
    
})



const PORT = 3000 || process.env.PORT
app.listen(3000, () => {
    console.log(`Listening to port ${PORT}`)

})