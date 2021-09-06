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
        return greetMsg;
    }

    async function theCounter() {
        var list = await pool.query("SELECT * FROM users");
        return list.rowCount;
        // var list = Object.keys(nameStore)
        // return list.length;
    }

   

    //name storing

    // async function weStorenames(ourName) {
    //     var storedNames = await pool.query("SELECT * FROM users")
    //     nameStore = {};
    //     var name = ourName.charAt(0).toUpperCase() + ourName.toLowerCase().slice(1);
    //     var test = regex.test(name);

    //     if (!test) {
    //         return "Invalid"
    //     }

    //     if (nameStore[name] === undefined) {
    //         nameStore[name] = 1;
    //     } else {
    //         nameStore[name]++;
    //     }
    // }

    async function weStorenames(name){
        var greetedNames = await pool.query("SELECT * FROM users");
        if(name){
            var nameStore = {};
            for (let i = 0; i < greetedNames.rows.length; i++){
                 nameStore["names"] = greetedNames.rows[i].names;
                 nameStore["couter"] = greetedNames.rows[i].greeted_no;
                // if(nameStore === name){
                //     nameStore = greetedNames.rows[i]
                // }

            }
            console.log(nameStore);
            return nameStore;
        }
        // else {
        //     return greetedNames.rows;
        // }
    }

    function testing() {
        return weStorenames();
    }

    async function getName() {
        var names = await pool.query("SELECT names FROM users");
        // var list = Object.keys(nameStore);
        console.log(names.rows);
        return names.rows
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

    // function theValue(name) {

    //     for (const key in nameStore) {

    //         if (nameStore.hasOwnProperty(key) && key == name) {
    //             const element = nameStore[key];

    //             return element;
    //         }
    //     }
    // }



    return {
        weGreetPeople,
        weStorenames,
        theCounter,
        getName,
        theName,
        message,
        errorMsg,
        testing,
        resetCounter,
        // theValue,
    }

}