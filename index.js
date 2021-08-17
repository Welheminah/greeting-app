const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const theGreeting = require('./greet-factory');

// const pg = require("pg");
// const Pool = pg.Pool;

const app = express();

const greet = theGreeting();

app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts',
    
});

app.use(flash());
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');



app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static('public'));



app.get('/', function(req, res){

    const greetMessage = greet.message();
    
    const counting = greet.theCounter();
    console.log(counting);
    res.render('index', { 
        counter: counting, 
        message: greetMessage
    });
});


app.post('/', (req, res) => {
    const {name, language} =  req.body;
    if (name === '' || language === null){
        req.flash('error', 'Please enter the name and select te language');

        
    }
    else {
        greet.weStorenames(name);
        greet.weGreetPeople(language, name);
    }
    
    
    res.redirect('/');
});

app.get('/greeted', function(req, res){
    const nameList = greet.getName();
    res.render('greeted',
    {names:  nameList}
    )
});

app.get('/counter', function(req, res){
   
    res.render('',);
});



app.get('/the-route', function (req, res) {
    const letsCheck = {'name': req.body.name, 'language': req.body.language};
    if (letsCheck.name === '' || letsCheck.language === null){
        req.flash('message', 'Please enter the name and select te language');
        res.redirect('/');
    }
   
});




const PORT = process.env.PORT || 3003;

app.listen(PORT, function(){
    console.log("App started:", PORT)
})