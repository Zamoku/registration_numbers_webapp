const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Registration = require('./registration');
const RegRoutes = require('./reg-route');
const RegFunction = require('./reg-mesages')

const pgPromise = require("pg-promise")
const pgp = pgPromise({})

// SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// which db connection to use
 const connectionString = process.env.DATABASE_URL || 'postgresql://zamoe:zamo123@localhost:5432/registration_db';

const db = pgp({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const registration = Registration(db)
const regFunction = RegFunction()
const registrationRoutes = RegRoutes(registration, regFunction)

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
 app.use(bodyParser.json());

app.use(session({
    secret: "my greet secret",
    cookie: {
        maxAge: 1000 * 36000
      },
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.post('/registr', registrationRoutes.addRegNum);
app.get('/reset', registrationRoutes.deleteAll);
app.get('/show', registrationRoutes.showReg);
app.get('/', registrationRoutes.showReg);
// app.get('/reg_number/:reg_number', registrationRoutes.showReg);
app.post('/filter', registrationRoutes.filterReg);



const PORT = process.env.PORT || 3034

app.listen(PORT, function () {
    console.log('App started at port:', PORT)

})
