console.log("It all starts here");

var quotes= [] // test list

// This is the button being called on click
var myButton = document.querySelector("#greetingButton");
console.log("button query:", myButton);
//Main button
myButton.onclick = function () {
  //1. query the input
  var greetingNameInput = document.querySelector("#name");
  //2. Capture the text value
  var greetingName = greetingNameInput.value;
  
  var greetingTypeInput = document.querySelector("#type");
  var greetingType = greetingTypeInput.value;

  var greetingEffectivenessInput = document.querySelector("#effectiveness");
  var greetingEffectiveness = greetingEffectivenessInput.value;

  var greetingPubliclyAcceptableInput = document.querySelector("#publiclyAcceptable"); 
  var greetingPubliclyAcceptable = greetingPubliclyAcceptableInput.value;

  var greetingWhoSaidItInput = document.querySelector("#whoSaidIt");
  var greetingWhoSaidIt = greetingWhoSaidItInput.value;
  
  //3. Call the createGreeting function passing the text value
  createGreeting(greetingName, greetingType, greetingEffectiveness, greetingPubliclyAcceptable, greetingWhoSaidIt);
};


function displayEditForm(greetingName, greetingType, greetingEffectiveness, greetingPubliclyAcceptable, greetingWhoSaidIt, greetingId) {
  document.getElementById("popupForm").style.display = "block";
  var greetingNameInput = document.querySelector("#the-name");
  greetingNameInput.value = greetingName

  var greetingTypeInput = document.querySelector("#the-type");
  greetingTypeInput.value = greetingType

  var greetingEffectivenessInput = document.querySelector("#the-effectiveness");
  greetingEffectivenessInput.value = greetingEffectiveness

  var greetingAcceptableInput = document.querySelector("#the-acceptability");
  greetingAcceptableInput.value = greetingPubliclyAcceptable

  var greetingWhoInput = document.querySelector("#the-who");
  greetingWhoInput.value = greetingWhoSaidIt

  var submitButton = document.querySelector(".btn");
  console.log("button query:", submitButton);
  submitButton.onclick = function () {
    //1. query the input
    var greetingNameInput = document.querySelector("#the-name");
    //2. Capture the text value
    var greetingName = greetingNameInput.value;
    
    var greetingTypeInput = document.querySelector("#the-type");
    var greetingType = greetingTypeInput.value;

    var greetingEffectivenessInput = document.querySelector("#the-effectiveness");
    var greetingEffectiveness = greetingEffectivenessInput.value;

    var greetingPubliclyAcceptableInput = document.querySelector("#the-acceptability"); 
    var greetingPubliclyAcceptable = greetingPubliclyAcceptableInput.value;

    var greetingWhoSaidItInput = document.querySelector("#the-who");
    var greetingWhoSaidIt = greetingWhoSaidItInput.value;
    
    //3. Call the createGreeting function passing the text value
    updateGreeting(greetingName, greetingType, greetingEffectiveness, greetingPubliclyAcceptable, greetingWhoSaidIt, greetingId )};
    

var closeButton = document.querySelector(".btn-cancel");
console.log("button query:", closeButton);
closeButton.onclick = function () {
  document.getElementById("popupForm").style.display = "none";
};
   
};



function deleteGreetingFromServer(greetingId) {
  fetch("https://greetings-central.herokuapp.com/greetings/" + greetingId, {
    method: "DELETE",
    credentials:'include'
  }).then(function (response) {
  if (response.status == 200){
    console.log("The greeting was successfully deleted!");
    loadquotes();
  }
  });
}


function createGreeting(greetingName, greetingType, greetingEffectiveness, greetingPubliclyAcceptable, greetingWhoSaidIt) {
  var data = 'name=' + encodeURIComponent(greetingName);
  data += '&type=' + encodeURIComponent(greetingType);
  data += '&effectiveness=' + encodeURIComponent(greetingEffectiveness);
  data += '&publiclyAcceptable=' + encodeURIComponent(greetingPubliclyAcceptable);
  data += '&whoSaidIt=' + encodeURIComponent(greetingWhoSaidIt);
  console.log("this is the data i'm sending to the server", data)

  fetch("https://greetings-central.herokuapp.com/greetings", {
  method: 'POST',
  credentials:'include',
  body: data, 
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  }).then(function(response){
  loadquotes();
  });
}

function updateGreeting(greetingName, greetingType, greetingEffectiveness, greetingPubliclyAcceptable, greetingWhoSaidIt, greetingId ) {
  var data = 'name=' + encodeURIComponent(greetingName);
  data += '&type=' + encodeURIComponent(greetingType);
  data += '&effectiveness=' + encodeURIComponent(greetingEffectiveness);
  data += '&publiclyAcceptable=' + encodeURIComponent(greetingPubliclyAcceptable);
  data += '&whoSaidIt=' + encodeURIComponent(greetingWhoSaidIt);
  console.log("this is the data i'm sending to the server", data)
  console.log("did I capture the id number: ",greetingId)
  fetch("https://greetings-central.herokuapp.com/greetings/" + greetingId, {
  method: 'PUT',
  credentials:'include',
  body: data, 
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  }).then(function(response){
  loadquotes();
  });
}



function createUsers(userEmail, userFname, userLname, userPasswd) {
  var data = 'email=' + encodeURIComponent(userEmail);
  data += '&encrypted_pw=' + encodeURIComponent(userPasswd);
  data += '&first_name=' + encodeURIComponent(userLname);
  data += '&last_name=' + encodeURIComponent(userFname);
  console.log("this is the data i'm sending to the server", data)

  fetch("https://greetings-central.herokuapp.com/users", {
  method: 'POST',
  credentials:'include',
  body: data, 
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  }).then(function(response){
  loadquotes();
  if (response.status == 409){
    alert("Email already in use")
    return;
     }
  else if (response.status == 201){
  alert("Account Created!")
  return;
    }
  });
}

var userButton = document.querySelector(".create-btn");
console.log("button query:", userButton);
//Main button
userButton.onclick = function () {
  //1. query the input
  var userEmailInput = document.querySelector("#create-email");
  //2. Capture the text value
  var userEmail = userEmailInput.value;
  
  var userFnameInput = document.querySelector("#create-fname");
  var userFname = userFnameInput.value;

  var userLnameInput = document.querySelector("#create-lname");
  var userLname = userLnameInput.value;

  var userPasswdInput = document.querySelector("#create-passwd"); 
  var userPasswd = userPasswdInput.value;

  
  //3. Call the createUser function passing the values
  createUsers(userEmail, userLname, userFname,  userPasswd);
};


function createSessions(userEmail,userPasswd) {
  var data = 'email=' + encodeURIComponent(userEmail);
  data += '&encrypted_pw=' + encodeURIComponent(userPasswd);
  console.log("this is the data i'm sending to the server", data)

  fetch("https://greetings-central.herokuapp.com/sessions", {
  method: 'POST',
  credentials:'include',
  body: data, 
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  }).then(function(response){
  loadquotes();
  if (response.status == 401){
    alert("Invalid username or password")
    return;
     }
  else if (response.status == 201){
  alert("Greetings! You've successfully logged in!");
  var audio = new Audio("resources/obiwan.mp3");
  audio.play();

    }
  });
}

var sessionButton = document.querySelector(".just-btn");
console.log("button query:", userButton);
//Main button
sessionButton.onclick = function () {
  //1. query the input
  var userEmailInput = document.querySelector("#just-email");
  //2. Capture the text value
  var userEmail = userEmailInput.value;
  var userPasswdInput = document.querySelector("#just-passwd"); 
  var userPasswd = userPasswdInput.value;

  
  //3. Call the createUser function passing the values
  createSessions(userEmail, userPasswd);
};



//load quotes from python server
function loadquotes() {
  fetch("https://greetings-central.herokuapp.com/greetings", {credentials:'include'}).then(function (response) {


// This code hides/shows content based off of authenticated status
  if (response.status == 200){
    document.querySelector("#login-stoof").style.display = "none";
    document.querySelector("#wrapper").style.display = "grid";
     }
  // This code hides/shows content based off of authenticated status
  else if (response.status == 401){
    document.querySelector("#login-stoof").style.display = "center";
    document.querySelector("#wrapper").style.display = "none";
    return;
     }

    response.json().then(function (data) {
      quotes = data;
      console.log("from the server", data)

      var greetingList = document.querySelector("#my-list");
      console.log("from query selector", greetingList)
      greetingList.innerHTML = "";
      quotes.forEach(function(greet) {
      var newListItem = document.createElement("li");
     
      // one inner div for the name
      var nameDiv = document.createElement("div");
      nameDiv.innerHTML = greet.name;
      nameDiv.classList.add("greeting-name")
      newListItem.appendChild(nameDiv);

      // one inner div for the type
      var typeDiv = document.createElement("div");
      typeDiv.innerHTML = greet.type;
      typeDiv.classList.add("greeting-type")
      newListItem.appendChild(typeDiv);

      // one inner div for the effectveness
      var effectivenessDiv = document.createElement("div");
      effectivenessDiv.innerHTML = greet.effectiveness;
      effectivenessDiv.classList.add("greeting-effectiveness")
      newListItem.appendChild(effectivenessDiv);

            // one inner div for the publiclyAcceptable
      var publiclyAcceptableDiv = document.createElement("div");
      publiclyAcceptableDiv.innerHTML = greet.publiclyAcceptable;
      publiclyAcceptableDiv.classList.add("greeting-publiclyAcceptable")
      newListItem.appendChild(publiclyAcceptableDiv);
      
      // one inner div for the whoSaidIt
      var whoSaidItDiv = document.createElement("div");
      whoSaidItDiv.innerHTML = greet.whoSaidIt;
      whoSaidItDiv.classList.add("greeting-whoSaidIt")
      newListItem.appendChild(whoSaidItDiv);

      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = function () {
        console.log("delete button clicked!", greet.id );
        if (confirm("Are you sure?")){
        deleteGreetingFromServer(greet.id);
        }
      };
      greetingList.appendChild(deleteButton);

      var editButton = document.createElement("button");
      editButton.innerHTML = "Edit";
      editButton.onclick = function () {
        console.log("edit button clicked!", greet.id );
        displayEditForm(greet.name, greet.type, greet.effectiveness, greet.publiclyAcceptable, greet.whoSaidIt, greet.id);
        }; // display edit form  needs to be here within the function
      greetingList.appendChild(editButton);

        greetingList.appendChild(newListItem);
      });
    });
  }); //then is used to call back data 
}
loadquotes(); 