const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
//app.use(express.urlencoded({extended: true}));

const PORT = 4000;


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index.js'));


app.listen(PORT);
console.log(`Server on port ${PORT}`);