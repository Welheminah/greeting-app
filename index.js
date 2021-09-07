const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const theGreeting = require('./greet-factory');

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



app.get('/', async function (req, res) {

   try {
    const greetMessage = greet.message();

    const counting = await greet.theCounter();
    console.log(counting);
    console.log(greetMessage);
    res.render('index', {
        counter: counting,
        message: greetMessage
    });
   } catch (error) {
       console.log(error);
   }
});


app.post('/', async (req, res) => {
    try {
        const {
            name,
            language
        } = req.body;
        if (name === '' || language === null) {
            req.flash('error', 'Please enter the name and select the language');
    
        } else if (language === null) {
            req.flash('error', 'Please select the language');
        } else if (name === '') {
            req.flash('error', 'Please enter the name');
        } else {
            await greet.weStorenames(name);
            await greet.weGreetPeople(language, name);
        }
    
    
        res.redirect('/');
    } catch (error) {
        console.log(error)
        
    }
});

app.get('/greeted',async function (req, res) {
    try {
        const nameList = await greet.getName();
    res.render('greeted', {
        names: nameList
    })
    } catch (error) {
        console.log(error)
    }
});


app.get('/greeted/:name', async function (req, res) {
   try {
    const name = req.params.name;
    const letsCount = await greet.weStorenames(name)
    
    res.render('greetedName', {
        name : letsCount.names,
        counter: letsCount.counter
    })
   } catch (error) {
    console.log(error)
   }
});

app.post('/reset', async function (req, res) {
   try {
    await greet.resetCounter();
    res.redirect('/')
   } catch (error) {
    console.log(error)
   }
});


app.get('/the-route', function (req, res) {
    try {
        const letsCheck = {
            'name': req.body.name,
            'language': req.body.language
        };
        if (letsCheck.name === '' || letsCheck.language === null) {
            req.flash('error', 'Please enter the name and select the language');
            res.redirect('/');
        } else if (language === null) {
            req.flash('error', 'Please select the language');
            res.redirect('/');
    
        }
    } catch (error) {
        console.log(error)
    }

});


const PORT = process.env.PORT || 3003;

app.listen(PORT, function () {
    console.log("App started:", PORT)
})