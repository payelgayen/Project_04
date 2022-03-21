// 1.
//--- Express module
const express = require('express');
// ---Initialise express server
const app = express();
// -- create port variable
const PORT = 3000 || process.env.PORT;

//2. 
// 2. 
//import libraries and data
let ejs = require('ejs');
let morgan = require('morgan');


//3.
//---middleware
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public'))) 

//bodypaser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//LogingMiddeare
app.use(morgan('dev'));

//ejs config
app.set('view engine', 'ejs') // sets ejs as view engine
app.set('views', './views') // sets 'views' folder as teh folder for grabbing templates when res.rendering
