const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const theGreeting = require('./greet-factory');
const theRoutes = require('./routes')

const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_names';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});


const app = express();

const greet = theGreeting(pool);

const routes = theRoutes(greet);

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));


const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts',

});

app.use(flash());
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.use(express.static('public'));



app.get('/', routes.main);
app.post('/', routes.mainPost);
app.get('/greeted', routes.greetedNames);
app.get('/greeted/:name', routes.userCounter);
app.post('/reset', routes.resetData);
app.get('/the-route', routes.flash);


const PORT = process.env.PORT || 3003;

app.listen(PORT, function () {
    console.log("App started:", PORT)
})