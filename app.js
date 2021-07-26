
const express = require('express')
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv')
const app = express();
dotenv.config({ path: './config.env' })

const sendEmail = require('./sendmail')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);
// Connect flash
app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    const { name, email, phoneNumber, message } = req.body;
    sendEmail(name, email, phoneNumber, message);
    req.flash('error_msg','We have recieved your message, will contact you soon.')
    res.redirect('/')
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)

})