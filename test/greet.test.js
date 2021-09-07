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

    it('should pass the db test', async function(){
        
        let greetInstance = theGreeting(pool);
        await greetInstance.weGreetPeople('english', 'Ruri')

        let list = await greetInstance.message();
        assert.equal('Hello, Ruri', list);

    });

    after(function(){
        pool.end();
    })
});