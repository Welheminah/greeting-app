let assert = require("assert");
let theGreeting = require("../greet-factory");

describe('The Greeting function', function(){

    it('should greet Moipone correctly in English', function(){

    let newGreet = theGreeting();
    newGreet.weGreetPeople('english', 'Moipone')

    assert.equal('Hello Moipone', newGreet.message())
    });


    it('should greet Moipone correctly in Setswana', function(){

        let newGreet = theGreeting();

        newGreet.weGreetPeople('setswana', 'Moipone');
        
        assert.equal('Dumela Moipone', newGreet.message());
        });

    
    it('should greet Moipone correctly in isiXhosa', function(){

        let newGreet = theGreeting();

        newGreet.weGreetPeople('isiXhosa', 'Moipone');

        assert.equal('Molo Moipone', newGreet.message())
        });
      
});

describe('The counter function', function(){

    it('it should return the number of the names greeted', function(){

    let newGreet = theGreeting();

    newGreet.weStorenames("Hello Moipone");
    newGreet.weStorenames("Molo Mosa");
    newGreet.weStorenames("Dumela Okuhle");

    newGreet.theCounter();

    assert.equal(3, newGreet.theCounter())
    });    

    it('it should return the number of the names greeted', function(){

        let newGreet = theGreeting();
    
        newGreet.weStorenames("Hello Moipone");
        newGreet.weStorenames("Molo Mosa");
        newGreet.weStorenames("Dumela Okuhle");
        newGreet.weStorenames("Dumela Theo");
        newGreet.weStorenames("Hello Ruri");
        newGreet.weStorenames("Molo Ellen");

        newGreet.theCounter();
    
        assert.equal(6, newGreet.theCounter())
        });    
    

});

describe('The namestore function', function(){

    it('it should return the names greeted', function(){

    let newGreet = theGreeting();

    newGreet.weStorenames("Moipone");
    newGreet.weStorenames("Mosa");
    newGreet.weStorenames("Okuhle");
    
    

    newGreet.getName();

    assert.deepEqual(["Moipone", "Mosa", "Okuhle"], newGreet.getName())
    });    
    
    it('it should return the names greeted and it should not repeat names when you greet the name in different language', function(){

        let newGreet = theGreeting();
    
        newGreet.weStorenames("Moipone");
        newGreet.weStorenames("Mosa");
        newGreet.weStorenames("Okuhle");
        newGreet.weStorenames("Thabo");
        newGreet.weStorenames("Moipone");
        newGreet.weStorenames("mosa");
        newGreet.weStorenames("OKUhLE");
        newGreet.weStorenames("THabO");
        
        
    
        newGreet.getName();
    
        assert.deepEqual(["Moipone", "Mosa", "Okuhle", "Thabo"], newGreet.getName())
        });    
});
