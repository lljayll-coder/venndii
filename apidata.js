function activatePlacesSearch(){

    let input = document.getElementById('homeLocation'); //city
    let autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function(){

        let place = autocomplete.getPlace();
        //place longitude/latitude in text box
        document.getElementById('latitudeLocation').value = place.geometry.location.lat(); 
        document.getElementById('longitudeLocation').value = place.geometry.location.lng();

    });
     
};

async function jsonFile(lat, lng, radius) {
    
    let goodUrl=`http://api.geonames.org/findNearbyJSON?lat=${lat}&lng=${lng}&radius=${radius}&username=lljayll`; 
    let response = await fetch(goodUrl);
    let geoNamesdata = await response.json();
    
    return geoNamesdata;

};

async function jsonFileAutoGen(gender) {
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let goodUrl=`http://names.drycodes.com/10?nameOptions=${gender}`; 
    let response = await fetch(proxyurl+goodUrl);
    let data = await response.json();

    return data;
    
};

async function getUserImage() {
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let goodUrl='https://www.thispersondoesnotexist.com/image'; 
    let response = await fetch(proxyurl+goodUrl);
    let data = await response;

    return data;
    
};








