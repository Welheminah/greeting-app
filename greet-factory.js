module.exports = function theGreeting(pool) {
    var greetMsg = "";
    

    async function weGreetPeople(language, name) {
        var regex = /^[A-Za-z]+$/;
        try{
        var userName = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
        var test = regex.test(userName);

        if (!test) {
            return "Invalid"
        }

        var dbName = await pool.query('SELECT names FROM users WHERE names = $1', [userName]);

        if (dbName.rowCount === 0) {
            await pool.query('INSERT INTO users(names, greeted_no) VALUES($1, $2)', [userName, 1])
        } else {
            await pool.query('UPDATE users SET greeted_no = greeted_no +1 WHERE names = $1', [userName])
        }

        if (language === "english") {
            greetMsg = "Hello, " + userName;

        } else if (language === "setswana") {
            greetMsg = "Dumela, " + userName;


        } else if (language === "isiXhosa") {
            greetMsg = "Molo, " + userName;


        };

        }
        catch(err){
            console.error('Your error is', err)
            throw err;
        }


    }

    function message() {
       try {
        return greetMsg;
       } catch (error) {
           
       }
    }

    async function theCounter() {
        try {
            var list = await pool.query("SELECT * FROM users");
        return list.rowCount;
        } catch (error) {
            console.error(error)
        }
        
    }


    async function weStorenames(name){
        try {
            var greetedNames = await pool.query("SELECT * FROM users WHERE names = $1", [name]);
        if(name){
            var nameStore = {};
            for (let i = 0; i < greetedNames.rows.length; i++){
                 nameStore["names"] = greetedNames.rows[i].names;
                 nameStore["counter"] = greetedNames.rows[i].greeted_no;
                if(nameStore === name){
                    nameStore = greetedNames.rows[i]
                }

            }
            return nameStore;
        }

        } catch (error) {
            
        }
    }



    async function getName() {
       try {
        var names = await pool.query("SELECT names FROM users");
        return names.rows
       } catch (error) {
           console.log(error)
           
       }
    }

    function theName() {
        return name;
    }

    function errorMsg(name, language) {
        if (language === null) {
            return "Please select the language";
        } else if (name === "") {
            return "Please enter your name";
        } else if (language === null && name === "") {
            return "Please enter the username and select the language"
        }
    }


    async function resetCounter() {
        let theClear = await pool.query("DELETE FROM users;")
        return theClear;
    }

    



    return {
        weGreetPeople,
        weStorenames,
        theCounter,
        getName,
        theName,
        message,
        errorMsg,
        resetCounter
    }

}