var results = document.getElementById('results');
var tokenType = '';

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
  console.log(response.status);
  response = await response.json();
  console.log(response);
  var token = response.access_token;
  console.log(token);
  tokenType = 'Bearer ' + token;
  console.log(tokenType);

  //run function to get city data
  cityCoordinates(cityCode);
}
//function for Location selection and hotel listing
async function cityCoordinates(city) {
  console.log(city);
  var hotelData = 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=' + city;
  console.log(hotelData);

  //fetch hotelData URL and wait until the call is complete
  let response = await fetch(hotelData, {
    headers: { Authorization: tokenType },
  });

  //If response fails
  console.log(response.ok);
  if (!response.ok) {
    console.log(response);
    return;
  }

  //convert response to json and if results are <150 limit
  response = await response.json();
  console.log(response);
  console.log(response.data.length);
  if (response.data.length < 150) {
    var iLength = response.data.length;
  } else {
    iLength = 150;
  }

  //create an Array to input hotel ids
  var hotelIdTag = new Array();
  for (i = 0; i < iLength; i++) {
    hotelIdTag.push(response.data[i].hotelId);
    //console.log(hotelIdTag)
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
  //console.log(hotelInfo)

  //One fetch request to call all URLs
  var responseTwo = await fetch(hotelInfo, {
    headers: { Authorization: tokenType },
  });

  //If response fails
  console.log(responseTwo.ok);
  if (!responseTwo.ok) {
    console.log(responseTwo);
    return;
  }

  //await until response has compiled
  responseTwo = await responseTwo.json();
  console.log(responseTwo);

  responseLength = responseTwo.data.length;
  console.log(responseLength);

  //for each URL that contains data collect the data for Name, Check in, Check out, Guests, Cost per night, Cost total and Currency used
  for (i = 0; i < responseLength; i++) {
    responseName = responseTwo.data[i].hotel.name;
    //console.log(responseName)

    responseCheckin = responseTwo.data[i].offers[0].checkInDate;
    //console.log(responseCheckin)

    responseCheckout = responseTwo.data[i].offers[0].checkOutDate;
    //console.log(responseCheckout)

    responseGuests = responseTwo.data[i].offers[0].guests.adults;
    //console.log(responseGuests)

    responsePriceB = responseTwo.data[i].offers[0].price.variations.average.base;
    //console.log(responsePriceB)

    responsePriceT = responseTwo.data[i].offers[0].price.total;
    //console.log(responsePriceT)

    responsePriceC = responseTwo.data[i].offers[0].price.currency;
    //console.log(responsePriceC)

    //create a new div for each result and add p and h2 values
    listD = document.createElement('div');
    listD.className = 'hotel';
    listD.id = `hotel${i + 1}`;
    var listP = document.createElement('p');
    var listHeading = document.createElement('h2');

    listHeading.innerHTML = responseName;

    //Output for HTML
    listP.innerHTML =
      'Check In - ' +
      responseCheckin +
      '   Check Out - ' +
      responseCheckout +
      '<br>' +
      'guests - ' +
      responseGuests +
      '<br>' +
      'Cost per Night - $' +
      responsePriceB +
      ' ' +
      responsePriceC +
      '<br>' +
      'Total Cost - $' +
      responsePriceT +
      ' ' +
      responsePriceC;
    
    // listD.className='columns';
    // listHeading.setAttribute('class', 'column is-2');
    // listP.setAttribute('class', 'column is-2');
    
    //remove loading text
    document.getElementById('loading').innerHTML = '';

    //Append h2 and p into div and append to HTML
    listD.appendChild(listHeading);
    listD.appendChild(listP);
    results.appendChild(listD);
  } 
  //function to wait for hotel selection
  //eventFunction(responseLength);
}

//event listener for all hotel options
// function eventFunction(length) {
//   selectedInput = document.getElementsByClassName('hotel');
//   for (var i = 0; i < length; i++) {
//     console.log(i);
//     selectedInput[i].addEventListener('click', logResult);
//   }
// }

//function to get data from selected hotel and input into local storage
function logResult(event) {
  var requestedName = event.target;
  var divParent = requestedName.parentElement;
  //   divParent.setAttribute('id', 'selected');
  //console.log(divParent)
  var h2 = divParent.querySelector('h2');
  h2 = h2.innerHTML;
  console.log(h2);

  hotelSelected = divParent.querySelector('p');
  //console.log(hotelSelected)
  hotelSelected = hotelSelected.innerText;
  hotelArray = hotelSelected.split('$');
  console.log(hotelArray);
  var hotelTotalCost = hotelArray[2];
  console.log(hotelTotalCost);

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
  //ADD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //localStorage.removeItem()
  //localStorage.removeItem()
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
