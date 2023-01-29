const userdeparture = document.querySelector('#departure');
const arrival = document.querySelector('#arrival');
const people = document.querySelector('#people');
const first = document.querySelector('#first');
const business = document.querySelector('#business');
const economy = document.querySelector('#economy');
const search = document.querySelector('#search');

let departurecityname = ' ';
let arrivalcityname = ' ';
let finalGoingdata = {};
let finalreturndata = {};

let token_type = ' ';
let accessToken = ' ';
let DEiatacode = ' ';
let ARiatacode = ' ';
let DEdateforquery = ' ';
let ARdateforquery = ' ';
let selectedClass = ' ';
let passenager = ' ';
let ways = ' ';

// reload page to initial all inputs
if (self.name != 'reload') {
  self.name = 'reload';
  self.location.reload(true);
} else self.name = '';

//clearing old data in localstorage
localStorage.clear();

// fetching currency API
async function getCurrencyData() {
  const api = 'https://api.exchangerate-api.com/v4/latest/eur';

  return fetch(`${api}`)
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      console.log('returning from getCurrencyData()');
      localStorage.setItem('currencydata', JSON.stringify(data));
    });
}
// generate new access-token whenever app starts
// if user stays in search page(index page) for more than 20 mins, it will generated new access-token

async function getApiToken() {
  const TOKENUrl = 'https://api.amadeus.com/v1/security/oauth2/token';

  fetch(TOKENUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&client_id=FgVXIVlEeBmSHOG5GhRdPceveA3CExUw&client_secret=IGDvlEYHGKe0dUiI',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      token_type = data.token_type;
      accessToken = data.access_token;
      console.log('returning from getApiToken()');
    });
}

//arrival.addEventListener("click", DEgetIATAcodeDATA);

// getting departure IATA code from finding cityname API
async function DEgetIATAcodeDATA() {
  let FetchHEADER = token_type + ' ' + accessToken;
  console.log(FetchHEADER);
  let DErequestUrl =
    'https://api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=' +
    userdeparture.value.toUpperCase() +
    '&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL';

  return fetch(DErequestUrl, {
    headers: { Authorization: FetchHEADER },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      DEiatacode = data.data[0].iataCode;
      localStorage.setItem('departurecitycode', DEiatacode);
      departurecityname = userdeparture.value.toUpperCase();
      localStorage.setItem('departurecityname', departurecityname);
      console.log('returning from DEgetIATAcodeDATA()');
    });
}

//people.addEventListener("click", ARgetIATAcodeDATA);

// getting arrival IATA code from finding cityname API
async function ARgetIATAcodeDATA() {
  let FetchHEADER = token_type + ' ' + accessToken;

  let DErequestUrl =
    'https://api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=' +
    arrival.value.toUpperCase() +
    '&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL';

  return fetch(DErequestUrl, {
    headers: { Authorization: FetchHEADER },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      ARiatacode = data.data[0].iataCode;
      localStorage.setItem('arrivalcitycode', ARiatacode);
      arrivalcityname = arrival.value.toUpperCase();
      localStorage.setItem('arrivalcityname', arrivalcityname);
      console.log('returning from ARgetIATAcodeDATA()');
    });
}

search.addEventListener('click', makingQueryDATA);

// making querydata function (date,seatclass,oneway or return)
async function makingQueryDATA() {
  // manipulate arrival and departure date into formats the API expects (YYYY-MM-DD)
  manipulateDates();

  var select1 = document.getElementById('select1');
  selectedClass = select1.value;

  //console.log(selectedClass);

  var select2 = document.getElementById('select2');
  var wayvalue = select2.value;
  localStorage.setItem('WAYvalue', wayvalue);

  var people = document.getElementById('people');
  passenager = people.value;
  localStorage.setItem('PASSENAGERvalue', passenager);

  // deal with asynchronous code here

  // wait for API token to be obtained before moving on
  await getApiToken();
  // call methods that get data for flight queries
  Promise.all([getCurrencyData(), DEgetIATAcodeDATA(), ARgetIATAcodeDATA()]);

  // call once all data has been obtained and saved to local storage
  if (wayvalue === 'ONEWAY') {
    await onewayDATA();
  } else {
    Promise.all([onewayDATA(), returnDATA()]);
  }
  // finally load next page
  goingNextpage();
}

async function choosingWAY(wayvalue) {
  if (wayvalue === 'ONEWAY') {
    onewayDATA();
  }

  if (wayvalue === 'RETURN') {
    onewayDATA();
    returnDATA();
  }
}

//going flight
async function onewayDATA() {
  let FetchHEADER = token_type + ' ' + accessToken;
  let deIatacode = localStorage.getItem('departurecitycode');
  console.log(deIatacode);
  let requestUrlgoing =
    'https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=' +
    deIatacode +
    '&destinationLocationCode=' +
    ARiatacode +
    '&departureDate=' +
    DEdateforquery +
    '&adults=' +
    passenager +
    '&travelClass=' +
    selectedClass +
    '&nonStop=false&max=250';

  return fetch(requestUrlgoing, {
    headers: { Authorization: FetchHEADER },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      finalGoingdata = data;
      localStorage.setItem('finalGoingdata', JSON.stringify(finalGoingdata));
      console.log('returning from onewayDATA()');

      //setInterval(goingNextpage, 5000);
    });
}

// return flight
async function returnDATA() {
  let FetchHEADER = token_type + ' ' + accessToken;
  let deIatacode = localStorage.getItem('departurecitycode');
  console.log(deIatacode);
  let requestUrlreturn =
    'https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=' +
    ARiatacode +
    '&destinationLocationCode=' +
    deIatacode +
    '&departureDate=' +
    ARdateforquery +
    '&adults=' +
    passenager +
    '&travelClass=' +
    selectedClass +
    '&nonStop=false&max=250';

  return fetch(requestUrlreturn, {
    headers: { Authorization: FetchHEADER },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      finalreturndata = data;
      localStorage.setItem('finalreturndata', JSON.stringify(finalreturndata));
      console.log('returning from returnDATA()');
    });
}

//going next page function
function goingNextpage() {
  console.log("goingnextpage()")
  //window.location.href = './flight-results.html';
}

timeInterval = setInterval(() => {
  window.location.reload();
}, 900000); // the token will be generated every 20mins - if you want to test it, change the number to 10000 then will be generated every 10 second

function manipulateDates() {
  const traveldate = localStorage.getItem('date');
  let dateformatchange = traveldate.split(' ');
  console.log(dateformatchange);
  let DEdateformatchange = dateformatchange[0].split('/');
  let ARdateformatchange = dateformatchange[2].split('/');
  console.log(DEdateformatchange);
  console.log(ARdateformatchange);

  let DEchanged = DEdateformatchange[2] + '-' + DEdateformatchange[0] + '-' + DEdateformatchange[1];
  let ARchanged = ARdateformatchange[2] + '-' + ARdateformatchange[0] + '-' + ARdateformatchange[1];
  DEdateforquery = DEchanged;
  ARdateforquery = ARchanged;
  console.log(DEdateforquery);
  console.log(ARdateforquery);
  localStorage.setItem('departureDate', DEdateforquery);
  localStorage.setItem('arrivalDate', ARdateforquery);
}
