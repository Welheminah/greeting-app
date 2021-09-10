let assert = require("assert");
let theGreeting = require("../greet-factory");

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/test';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("DELETE FROM users");
    });

    it('should be able to greet the user with the language selected by the user', async function(){
        
        let greetInstance = theGreeting(pool);
        await greetInstance.weGreetPeople('english', 'Ruri')

        let greet = await greetInstance.message();
        
        assert.equal('Hello, Ruri', greet);

    });


    it('should count each name once, and dont duplicate the name', async function(){
        
        let greetInstance = theGreeting(pool);
        await greetInstance.weGreetPeople('english', 'Ruri')
        await greetInstance.weGreetPeople('setswana', 'Ruri')
        await greetInstance.weGreetPeople('isiXhosa', 'Ruri')
    
        let list = await greetInstance.theCounter();
        
        assert.equal(1, list);

    });

    it('should show how many times a user has been greeted', async function(){
        
        let greetInstance = theGreeting(pool);
        await greetInstance.weGreetPeople('english','Ruri')
        await greetInstance.weGreetPeople('setswana', 'Ruri')
        await greetInstance.weGreetPeople('isiXhosa', 'Ruri')
        
        let userCount = await greetInstance.weStorenames('Ruri');
       
        assert.equal(3, userCount.counter);
        assert.equal('Ruri', userCount.names);

    });

    it('should return the names that were greeted', async function(){
        
        let greetInstance = theGreeting(pool);
        await greetInstance.weGreetPeople('english','Ruri')
        await greetInstance.weGreetPeople('setswana', 'Moipone')
        await greetInstance.weGreetPeople('isiXhosa', 'ben')


        let nameList = await greetInstance.getName();
        assert.equal('Ruri', nameList[0].names);
        assert.equal('Moipone', nameList[1].names);
        assert.equal('Ben', nameList[2].names);


    });

    after(function(){
        pool.end();
    })
});