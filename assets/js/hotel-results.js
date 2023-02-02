var results = document.getElementById('results');
var tokenType = '';

var nameD = '';
var inD = '';
var outD = '';
var guestsD = '';
var priceBD = '';
var priceCD = '';
var priceTD = '';

//Getting parameters to search from localstorage
var cityCode = localStorage.getItem('arrivalcitycode');
var arrive = localStorage.getItem('departureDate');
var depart = localStorage.getItem('arrivalDate');
var peopleNo = localStorage.getItem('PASSENAGERvalue');

// used for tracking currently clicked hotel and modifying styling accordingly
let selectedHotel;

//Function to create token for API and add it to Header value
async function tokenFunction() {
  //Send client ID and Secret to receive token
  let response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    headers: {
      'Content-Type': ' application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=BrtG02hEbIco7uiyR3DRJAvGMMtMHVbe&client_secret=piDWDBPQ5cjMQOdm',
  });
  response = await response.json();
  var token = response.access_token;
  tokenType = 'Bearer ' + token;

  //run function to get city data
  cityCoordinates(cityCode);
}
//function for Location selection and hotel listing
async function cityCoordinates(city) {
  var hotelData = 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=' + city;

  //fetch hotelData URL and wait until the call is complete
  let response = await fetch(hotelData, {
    headers: { Authorization: tokenType },
  });

  //If response fails
  if (!response.ok) {
    return;
  }

  //convert response to json and if results are <150 limit
  response = await response.json();
  if (response.data.length < 150) {
    var iLength = response.data.length;
  } else {
    iLength = 150;
  }

  //create an Array to input hotel ids
  var hotelIdTag = new Array();
  for (i = 0; i < iLength; i++) {
    hotelIdTag.push(response.data[i].hotelId);
  }

  //create another Array of all URLs to be called by the API
  var hotelInfo = new Array();
  hotelInfo =
    'https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=' +
    hotelIdTag +
    '&adults=' +
    peopleNo +
    '&checkInDate=' +
    arrive +
    '&checkOutDate=' +
    depart;

  //One fetch request to call all URLs
  var responseTwo = await fetch(hotelInfo, {
    headers: { Authorization: tokenType },
  });

  //If response fails
  if (!responseTwo.ok) {
    return;
  }

  //await until response has compiled
  responseTwo = await responseTwo.json();

  responseLength = responseTwo.data.length;

  //for each URL that contains data collect the data for Name, Check in, Check out, Guests, Cost per night, Cost total and Currency used
  for (i = 0; i < responseLength; i++) {
    responseName = responseTwo.data[i].hotel.name;

    responseCheckin = responseTwo.data[i].offers[0].checkInDate;

    responseCheckout = responseTwo.data[i].offers[0].checkOutDate;

    responseGuests = responseTwo.data[i].offers[0].guests.adults;

    responsePriceB = responseTwo.data[i].offers[0].price.variations.average.base;

    responsePriceT = responseTwo.data[i].offers[0].price.total;

    responsePriceC = responseTwo.data[i].offers[0].price.currency;

    // create a new div for each result and add p and h2 values
    listD = document.createElement('div');
    listD.className = 'hotel';
    listD.id = `hotel${i + 1}`;
    var nameD = document.createElement('div');
    var inD = document.createElement('div');
    var outD = document.createElement('div');
    var guestsD = document.createElement('div');
    var priceBD = document.createElement('div');
    var priceCD = document.createElement('div');
    var priceTD = document.createElement('div');

    listD.classList = 'columns hotel'
    nameD.setAttribute('class', 'column is-2');
    inD.setAttribute('class', 'column is-2');
    outD.setAttribute('class', 'column is-2');
    guestsD.setAttribute('class', 'column is-2');
    priceBD.setAttribute('class', 'column is-2');
    priceTD.setAttribute('class', 'column is-2');

    nameD.innerHTML = responseName +  ' ';
    inD.innerHTML = responseCheckin + ' ';
    outD.innerHTML = responseCheckout + ' ';
    guestsD.innerHTML = responseGuests + ' ';
    priceBD.innerHTML = '$' + responsePriceB + ' ';
    priceTD.innerHTML =  '$' + responsePriceT;

    //remove loading text
    document.getElementById('loading').innerHTML = '';

    //Append div and append to HTML
    listD.appendChild(nameD);
    listD.appendChild(inD);
    listD.appendChild(outD);
    listD.appendChild(guestsD);
    listD.appendChild(priceBD);
    listD.appendChild(priceTD);

    results.appendChild(listD);
  }
}

//function to get data from selected hotel and input into local storage
function logResult(event) {
  var requestedName = event.target;
  var divParent = requestedName.parentElement;
  var h2 = divParent.children[0].innerHTML;

  hotelSelected = document.querySelector('p');
  hotelSelected = hotelSelected.innerText;
  hotelArray = hotelSelected.split('$');
  var hotelTotalCost = divParent.children[5].innerHTML;


  localStorage.setItem('hotelName', h2);
  localStorage.setItem('hotelCost', hotelTotalCost);
  
  changeButton();
}

//function to change button text
function changeButton() {
  var button = document.getElementById('continue');
  buttonData = button.innerHTML = 'Continue to Events';
}

//button function to remove any old event data and continue to next page
function button() {
  location.assign('./event-results.html');
}

document.getElementById('continue').addEventListener('click', button);
//When page loads load token function to request a new token
tokenFunction();

$('#results').on('click', '.hotel', handleselectedHotel);

function handleselectedHotel(event) {
  if ($(selectedHotel).attr('id') === $(event.target).parent('.hotel').attr('id')) {
    $(selectedHotel).removeClass('selected');
    selectedHotel === null;
    localStorage.removeItem('selectedHotel');
  } else {
    $(selectedHotel).removeClass('selected');
    selectedHotel = $(event.target).parent('.hotel');
    $(selectedHotel).addClass('selected');
  }
  logResult(event);
}
