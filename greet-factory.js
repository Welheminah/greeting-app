module.exports = function theGreeting(){

var nameStore = {};

var greetMsg = "";
 var errorMsgs = "";

var regex = /^[A-Za-z]+$/

function weGreetPeople(language, name){


    var userName = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
    var test = regex.test(userName);

    if(!test){
        return "Invalid"
    }

    if(language === "english"){
        greetMsg = "Hello, "  + userName;

    }else if(language === "setswana"){
        greetMsg =  "Dumela, " + userName;
        
      
    }else if(language === "isiXhosa"){
        greetMsg =  "Molo, " + userName;
        
  
    };
    
}

function message(){
    return greetMsg;
}

function theCounter(){
    var list = Object.keys(nameStore)
    return list.length;
}


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