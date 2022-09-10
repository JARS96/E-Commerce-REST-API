const express = require('express');
const morgan = require('morgan');
const {Router} = require('express');
const router = Router();
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const initializePassport = require('./passportConfig');
initializePassport(passport);

const app = express();



app.use(morgan('dev'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session());

app.use(flash());
//app.use(express.urlencoded({extended: true}));

const PORT = 4000;


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index.js'));


app.listen(PORT);
console.log(`Server on port ${PORT}`);


