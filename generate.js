let myCanvas = document.getElementById('userPhoto');



function generateFemaleHeight() {

    return Math.floor(Math.random() * (182 - 148) + 148);
};

function generateMaleHeight() {

    return Math.floor(Math.random() * (187 - 158) + 158);

};

//-------------------------------------------------------------------------


function generateAgeStart(){
    
    let randNum=Math.floor((Math.random() * 4) + 1);
    let AgeStart='';

    if (randNum==1) {
        AgeStart='18';
    }
    
    else if (randNum==2) {
        AgeStart='20';
            
    }
    
    else if (randNum==3) {
        AgeStart='25';    
        
    }
    
    else if (randNum==4) {
        AgeStart='35';   
    
    }

    return AgeStart;
};

function generateAgeEnd(){

    let randNum=Math.floor((Math.random() * 4) + 1);
    let AgeEnd='';

    if (randNum==1) {
        AgeEnd='40';
    }
    
    else if (randNum==2) {
        AgeEnd='50';
            
    }
    
    else if (randNum==3) {
        AgeEnd='60';    
        
    }
    
    else if (randNum==4) {
        AgeEnd='70';   
    
    }

    return AgeEnd;

};


function parseName(name){

    let location=name.indexOf('_');
        
    let obj = {

        last: name.substr(0,location),
        first: name.substr(location+1,name.length)
    };
    autoGenEmail();
   return obj;
   
};

function generateBirthday() {

    let year =Math.floor(Math.random() * (2001 - 1965) + 1965);
    let month =Math.floor(Math.random() * (12 - 1) + 1);
    let day =Math.floor(Math.random() * (28 - 1) + 1);

    if (month<10) {

        month = '0' + month; 

    };

    if (day<10) {

        day = '0' + day; 

    };

    let date = year + '-' +  month + '-' + day;

    return date;

};

function generateInterests() {

    let list1 = ['hiking', 'skiing', 'cooking', 'video games', 'music', 'piano', 'violin', 'dancing', 'movies', 'travelling'];
    let list2 = ['basketball', 'football', 'soccer', 'reading', 'singing', 'board games', 'surfing', 'yoga', 'badminton', 'bowling'];
    let list3 = ['manga', 'anime', 'coin collecting', 'drawing', 'painting', 'photography', 'sport cards collecting', 'skating', 'hockey', 'baseball'];
    let list4 = ['weight training', 'rock climbing', 'scrapbooking', 'crochet', 'gardening', 'soap making', 'sculpting', 'candle making', 'wine tasting', 'magic tricks'];

    let rand1 =Math.floor(Math.random() * (3 - 0) + 0);
    let rand2 =Math.floor(Math.random() * (9 - 0) + 0);
    let rand3 =Math.floor(Math.random() * (9 - 0) + 0);
    let rand4 =Math.floor(Math.random() * (9 - 0) + 0);
    let rand5 =Math.floor(Math.random() * (9 - 0) + 0);


    let obj={};
 

    if (rand1 == 0) {

            obj = {
            inter1: list1[rand2],
            inter2: "",
            inter3: "",
            inter4: ""
        };

    }

    else if (rand1 == 1){
        
            obj = {
            inter1: list1[rand2],
            inter2: list2[rand3],
            inter3: '',
            inter4: ''
        };

    }

    else if (rand1 == 2){
            obj = {
            inter1: list1[rand2],
            inter2: list2[rand3],
            inter3: list3[rand4],
            inter4: ''
        };
        
    }

    else if (rand1 == 3){
    
            obj = {
            inter1: list1[rand2],
            inter2: list2[rand3],
            inter3: list3[rand4],
            inter4: list4[rand5]    
    };
    }

   
      return obj;
};

function genUserImage(){

    let ctx = myCanvas.getContext('2d');
    ctx.canvas.width = 500;
    ctx.canvas.height = 500;
    let img = new Image;
    img.onload = function(){
    ctx.drawImage(img,0,0,img.width,img.height,0,0,myCanvas.width,myCanvas.height); // Or at whatever offset you like
    
    };
    img.src = 'https://cors-anywhere.herokuapp.com/https://www.thispersondoesnotexist.com/image?' + new Date().getTime();
    img.crossOrigin='anonymous';


};

function autoGenMale() {

    jsonFileAutoGen('boy_names').then((value) => { 

        let firstGeneratedName = parseName(value[0]).first;
        let secondGeneratedName = parseName(value[0]).last;
        let generatedInterests = generateInterests();        
        uploadGeneratedInterests = generatedInterests;
        
        document.getElementById('firstName').value = parseName(value[0]).first;
        document.getElementById('lastName').value = parseName(value[0]).last;
        document.getElementById('preferredName').value = firstName.value;

        document.getElementById('userSex').value = 'M';
        document.getElementById('desiredSex').value = 'A';

        document.getElementById('userEmail').value = autoGenEmail(firstGeneratedName, secondGeneratedName).toLowerCase();
        document.getElementById('dateOfBirth').value = generateBirthday();
        document.getElementById('userHeight').value = generateMaleHeight();

        document.getElementById('lowerAgeRange').value = generateAgeStart();
        document.getElementById('upperAgeRange').value = generateAgeEnd();

        document.getElementById('maximumDistance').value = 50;

        document.getElementById('showProfile').value = 'true';
        document.getElementById('userHosting').value = 'true';
        
        document.getElementById('languages').value = 'English';

        document.getElementById('interest1').value = generatedInterests.inter1;
        document.getElementById('interest2').value = generatedInterests.inter2;
        document.getElementById('interest3').value = generatedInterests.inter3;
        document.getElementById('interest4').value = generatedInterests.inter4;
        
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

function autoGenEmail(first, last){


    let randEmailNum1=Math.floor((Math.random() * 4) + 1);
    let randEmailNum2=Math.floor((Math.random() * 4) + 1);
    let randEmailNum3=Math.floor((Math.random() * 9) + 1);
    let email='';
    
    //-------------------------------------------------------------------------
    if (randEmailNum1==1) {
        email=last + first + randEmailNum1 + randEmailNum2 + randEmailNum3;  
    }
    
    else if (randEmailNum1==2) {
        email=first + last + randEmailNum1 + randEmailNum2 + randEmailNum3;
            
    }
    
    else if (randEmailNum1==3) {
            
        email=last + '.' + first + randEmailNum2 + randEmailNum3;
    }
    
    else if (randEmailNum1==4) {
        email=first + '.' + last + randEmailNum1 + randEmailNum2 + randEmailNum3 ;   
    
    }
    
    //-------------------------------------------------------------------------
    if (randEmailNum2==1) { 
        email=email + '@yahoo.com';
    }
    
    else if (randEmailNum2==2) {
        email=email + '@outlook.com';
            
    }
    
    else if (randEmailNum2==3) {
            
        email=email + '@hotmail.com';
    }
    
    else if (randEmailNum2==4) {
        email=email + '@gmail.com';   
    
    }
    
return email;    

};

