

firebase.auth().onAuthStateChanged(function(user) {
    
    

    if (user) {
      
        // User is signed in
        
        
        
        
    

    } else {
      
        // No user is signed in
        
        

    }

    
});




function login(){

    //get input field info for email and password
    let userEmail = document.getElementById('emailField').value;
    let userPassword = document.getElementById('passwordField').value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then(user => {
    // Sign in success
    window.location.href = "main.html";
    }).catch(error => {
        console.error(error);
    })

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('wrong email or password');
        document.getElementById('loginMessage').innerHTML = 'Incorrect email or password';
        // ...
    });
    
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    
    
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });


  
};

function logout(){
    
    firebase.auth().signOut().then(function() {
            // Sign-out successful
        }).catch(function(error) {
            // An error happened
    });
    window.location.href = "index.html";

};

