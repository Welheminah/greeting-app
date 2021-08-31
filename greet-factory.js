module.exports = function theGreeting(pool){

var nameStore = {};

var greetMsg = "";
 var errorMsgs = "";

var regex = /^[A-Za-z]+$/

async function weGreetPeople(language, name){

    try{
        var userName = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
    var test = regex.test(userName);

    if(!test){
        return "Invalid"
    }

    var dbName = await pool.query('SELECT names FROM greeted_people WHERE names = $1', [name]);

    if (dbName.rowCount === 0){
        await pool.query('INSERT INTO greeted_people(names, greeted_no) VALUES($1, $2)',[name, 1])
    }
    else{
        await pool.query('UPDATE greeted_people SET greeted_no = greeted_no +1 WHERE names = $1',[name])
    }

    if(language === "english"){
        greetMsg = "Hello, "  + userName;

    }else if(language === "setswana"){
        greetMsg =  "Dumela, " + userName;
        
      
    }else if(language === "isiXhosa"){
        greetMsg =  "Molo, " + userName;
        
  
    };

    }
    catch(err){
        console.error('Your error is', err)
        throw err;
    }
    
    
}

function message(){
    return greetMsg;
}

function theCounter(){
    var list = Object.keys(nameStore)
    return list.length;
}

//name storing

function weStorenames(ourName){
    
     var name = ourName.charAt(0).toUpperCase() + ourName.toLowerCase().slice(1);
     var test = regex.test(name);

     if(!test){
         return "Invalid"
     }
    
    if(nameStore[name] === undefined){
        nameStore[name] = 1;     
   }
   else{
    nameStore[name]++;
   }
}

function testing(){
    return weStorenames();
}

function getName(){
    var list = Object.keys(nameStore);
    return list;
}

function theName(){
    return name
}

function errorMsg(name, language){
    if(language === null){
        return "Please select the language";
    }
    else if(name === ""){
        return "Please enter your name";
    }
    else if(language === null && name === ""){
        return "Please enter the username and select the language"
    }
}

function clearData(){
    return "";
}

function resetCounter(){
    nameStore = {};
}

function theValue(name){
   
    for (const key in nameStore) {
       
        if (nameStore.hasOwnProperty(key) && key == name) {
            const element = nameStore[key];
            
            return element;
        }
    }
}



return {
    weGreetPeople,
    weStorenames,
    theCounter,
    getName,
    theName,
    message,
    errorMsg,
    testing,
    clearData,
    resetCounter,
    theValue
}

}