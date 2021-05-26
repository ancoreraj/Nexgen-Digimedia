
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
        console.log(err)

    }
    
    
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)

})