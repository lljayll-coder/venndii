const userList = document.querySelector('#user-list');
const form = document.querySelector('#add-users');

let docId=''; 
let myCanvas = document.getElementById('userPhoto');
let uploadGeneratedInterests;


//create element and render users
function renderUsers(doc){

    let li = document.createElement('li');
    let name = document.createElement('span');
    let location = document.createElement('span');
    let desiredSex = document.createElement('span');
    
    let cross = document.createElement('div'); //delete x

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().firstName + " " + doc.data().lastName;
    location.textContent = doc.data().homeLocation;
    desiredSex.textContent = doc.data().desiredSex;

    cross.textContent = 'view'; //adding x

    li.appendChild(name);
    li.appendChild(location);
    li.appendChild(desiredSex);
    
    li.appendChild(cross);

    userList.appendChild(li);
    
    //view user (e) event object, stopPropogation 
    cross.addEventListener('click', (e) => { 
            //get doc id
        docId=doc.id;
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        
        form.lastName.value=doc.data().lastName; 
        form.firstName.value=doc.data().firstName;
        form.homeLocation.value=doc.data().homeLocation;
        form.desiredSex.value=doc.data().desiredSex;
        form.userEmail.value=doc.data().userEmail;
        form.dateOfBirth.value=doc.data().dateOfBirth;
        form.userHeight.value=doc.data().userHeight;
        form.upperAgeRange.value=doc.data().upperAgeRange;
        form.lowerAgeRange.value=doc.data().lowerAgeRange;
        form.homeLocation.value=doc.data().homeLocation;
        form.formattedAddress.value=doc.data().formattedAddress;
        form.latitudeLocation.value=doc.data().latitudeLocation;
        form.longitudeLocation.value=doc.data().longitudeLocation;
        form.userHosting.value=doc.data().userHosting;

    })
}

//.then() waits for action to complete  //db.collection('VenndiiDatabase').where('location', '==', 'calgary').get().then((snapshot) => {
db.collection('VenndiiDatabase').get().then((snapshot) => { //place for sorting
    snapshot.docs.forEach(doc => { //forEach cycles each document
   renderUsers(doc); //get data from documents
})       

});

//Add user button press
/*
document.getElementById("addUserButton").addEventListener("click", function() {
    
    jsonFile(form.latitudeLocation.value, form.longitudeLocation.value, form.maximumDistance.value).then((value) => { 
            
            //formatting data to match front end
            let data = value.geonames;
            let parseData=[];
            
            for (let i = 0; i<data.length; i++){
                parseData.push(data[i].name);
            };

            db.collection('VenndiiDatabase').add({
                
                //puts text box info in db variable to be loaded into firestore
                lastName: form.lastName.value,
                firstName: form.firstName.value,
                preferredName: form.preferredName.value,
                gender: form.userSex.value,
                desiredSex: [form.desiredSex.value], 
                email: form.userEmail.value,
                dob: form.dateOfBirth.value,
                height: form.userHeight.value,
                ageRange: {end:form.upperAgeRange.value, start:form.lowerAgeRange.value},
                homeLocation: {formatted_address: form.homeLocation.value},
                latitudeLocation: form.latitudeLocation.value,
                longitudeLocation: form.longitudeLocation.value,
                maximumDistance: form.maximumDistance.value,
                showProfile: form.showProfile.value,
                userHosting: form.userHosting.value,
                images: [myCanvas.toDataURL()],
                interests: uploadGeneratedInterests,
                languages: form.languages.value,
                referrals: [],
                placesBeen: [],
                placesToGo: [],
                top1: parseData,
                generatedUser: 'true'
                
            });

    
    
    //clear text boxes so new data can be added right away
    clearFields();
    });

  });
  

function clearFields() {

    form.lastName.value = "";
    form.firstName.value = "";
    form.homeLocation.value = "";
    form.desiredSex.value = "";
    form.userEmail.value = "";
    form.dateOfBirth.value = "";
    form.userHeight.value = "";
    form.upperAgeRange.value = "";
    form.lowerAgeRange.value = "";
    form.homeLocation.value = "";
    form.maximumDistance.value = "";
    form.latitudeLocation.value = "";
    form.longitudeLocation.value = "";
    form.userHosting.value = "";
    
};

function saveChanges() {

    db.collection("VenndiiDatabase").doc(docId).set({
       
        lastName: form.lastName.value,
        firstName: form.firstName.value,
        location: form.homeLocation.value,
        desiredSex: form.desiredSex.value,
        userEmail: form.userEmail.value,
        dateOfBirth: form.dateOfBirth.value,
        userHeight: form.userHeight.value,
        upperAgeRange: form.upperAgeRange.value,
        lowerAgeRange: form.lowerAgeRange.value,
        homeLocation: form.homeLocation.value,
        formattedAddress: form.formattedAddress.value,
        latitudeLocation: form.latitudeLocation.value,
        longitudeLocation: form.longitudeLocation.value,
        userHosting: form.userHosting.value
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

};


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
        // User is signed in
      document.getElementById('loginDiv').style.display='none';
      document.getElementById('main').style.display='none';
      document.getElementById('logoutBut').style.display='block';
      document.getElementById('navButtons').style.display='block';
      document.getElementById('searchWindow').style.display='none';
      document.getElementById('addUser').style.display='none';
      document.getElementById('user-list').style.display='none';

    } else {
      
        // No user is signed in
      document.getElementById('loginDiv').style.display='block';
      document.getElementById('main').style.display='none';
      document.getElementById('logoutBut').style.display='none';
      document.getElementById('navButtons').style.display='none';
      document.getElementById('searchWindow').style.display='none';
      document.getElementById('addUser').style.display='none';
      document.getElementById('user-list').style.display='none';
    }
  
});

function login(){

    //get input field info for email and password
    let userEmail = document.getElementById('emailField').value;
    let userPassword = document.getElementById('passwordField').value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('wrong email or password');
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

};


function autoGenMale() {

    

    jsonFileAutoGen('boy_names').then((value) => { 

        let firstGeneratedName = parseName(value[0]).first;
        let secondGeneratedName = parseName(value[0]).last;
        let generatedInterests = generateInterests();
        uploadGeneratedInterests = generatedInterests;

        form.firstName.value = parseName(value[0]).first;
        form.lastName.value = parseName(value[0]).last;
        form.preferredName.value = firstName.value;
        form.userSex.value = 'M';
        form.desiredSex.value = 'A';
        form.userEmail.value = autoGenEmail(firstGeneratedName, secondGeneratedName).toLowerCase();
        form.maximumDistance.value = 50;
        form.userHeight.value = generateMaleHeight();
        form.lowerAgeRange.value = generateAgeStart();
        form.upperAgeRange.value = generateAgeEnd();
        form.showProfile.value = 'true';
        form.userHosting.value = 'true';
        form.dateOfBirth.value = generateBirthday();
        form.languages.value = 'English';
        form.interest1.value = generatedInterests.inter1;
        form.interest2.value = generatedInterests.inter2;
        form.interest3.value = generatedInterests.inter3;
        form.interest4.value = generatedInterests.inter4;

        



    });

};

function autoGenFemale() { 

    jsonFileAutoGen('girl_names').then((value) => { 

        let firstGeneratedName = parseName(value[0]).first;
        let secondGeneratedName = parseName(value[0]).last;
        let generatedInterests = generateInterests();
        uploadGeneratedInterests = generatedInterests;

        form.firstName.value = firstGeneratedName;
        form.lastName.value = secondGeneratedName;
        form.preferredName.value = firstGeneratedName;
        form.userSex.value = 'F';
        form.desiredSex.value = 'A';
        form.userEmail.value = autoGenEmail(firstGeneratedName, secondGeneratedName).toLowerCase();
        form.maximumDistance.value = 50;
        form.userHeight.value = generateFemaleHeight();
        form.lowerAgeRange.value = generateAgeStart();
        form.upperAgeRange.value = generateAgeEnd();
        form.showProfile.value = 'true';
        form.userHosting.value = 'true';
        form.dateOfBirth.value = generateBirthday();
        form.languages.value = 'English';
        form.interest1.value = generatedInterests.inter1;
        form.interest2.value = generatedInterests.inter2;
        form.interest3.value = generatedInterests.inter3;
        form.interest4.value = generatedInterests.inter4;
        
        
    });
    

};
*/


