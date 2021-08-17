module.exports = function theGreeting(){

var nameStore = {};

var greetMsg = "";
 var errorMsgs = "";

function weGreetPeople(language, name){
    var userName = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
    

    if(language === "english"){
        greetMsg = "Hello "  + userName;

    }else if(language === "setswana"){
        greetMsg =  "Dumela " + userName;
        
      
    }else if(language === "isiXhosa"){
        greetMsg =  "Molo " + userName;
        
  
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

return {
    weGreetPeople,
    weStorenames,
    theCounter,
    getName,
    theName,
    message,
    errorMsg,
    testing
}

}