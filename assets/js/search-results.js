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
function getCurrencyData() {
  const api = 'https://api.exchangerate-api.com/v4/latest/eur';

  return fetch(`${api}`);
}

function saveCurrencyData(data) {
  localStorage.setItem('currencydata', JSON.stringify(data));
}
// generate new access-token whenever app starts
// if user stays in search page(index page) for more than 20 mins, it will generated new access-token

function getApiToken() {
  const TOKENUrl = 'https://api.amadeus.com/v1/security/oauth2/token';
  return fetch(TOKENUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&client_id=FgVXIVlEeBmSHOG5GhRdPceveA3CExUw&client_secret=IGDvlEYHGKe0dUiI',
  });
}

function saveToken(data) {
  token_type = data.token_type;
  accessToken = data.access_token;
}

// getting departure IATA code from finding cityname API
function DEgetIATAcodeDATA() {
  let FetchHEADER = token_type + ' ' + accessToken;
  let DErequestUrl =
    'https://api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=' +
    userdeparture.value.toUpperCase() +
    '&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL';

  return fetch(DErequestUrl, {
    headers: { Authorization: FetchHEADER },
  });
}

function saveDepartureIataData(data) {
  DEiatacode = data.data[0].iataCode;
  localStorage.setItem('departurecitycode', DEiatacode);
  departurecityname = userdeparture.value.toUpperCase();
  localStorage.setItem('departurecityname', departurecityname);
}

// getting arrival IATA code from finding cityname API
function ARgetIATAcodeDATA() {
  let FetchHEADER = token_type + ' ' + accessToken;
  let DErequestUrl =
    'https://api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=' +
    arrival.value.toUpperCase() +
    '&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL';

  return fetch(DErequestUrl, {
    headers: { Authorization: FetchHEADER },
  });
}

function saveArrivalIataData(data) {
  ARiatacode = data.data[0].iataCode;
  localStorage.setItem('arrivalcitycode', ARiatacode);
  arrivalcityname = arrival.value.toUpperCase();
  localStorage.setItem('arrivalcityname', arrivalcityname);
}

search.addEventListener('click', makingQueryDATA);

// making querydata function (date,seatclass,oneway or return)
async function makingQueryDATA() {
  // manipulate arrival and departure date into formats the API expects (YYYY-MM-DD)
  manipulateDates();

  var select1 = document.getElementById('select1');
  selectedClass = select1.value;

  var select2 = document.getElementById('select2');
  var wayvalue = select2.value;
  localStorage.setItem('WAYvalue', wayvalue);

  var people = document.getElementById('select3');
  passenager = people.value;
  localStorage.setItem('PASSENAGERvalue', passenager);

  // deal with asynchronous code here

  // wait for API token to be obtained before moving on
  const tokenResponse = await getApiToken();
  const tokenData = await tokenResponse.json();
  saveToken(tokenData);

  // get data from APIs for flight queries
  const [currencyData, departureData, arrivalData] = await callApis();

  // save the necessary information
  saveCurrencyData(currencyData);
  saveArrivalIataData(arrivalData);
  saveDepartureIataData(departureData);

  // call once all data has been obtained and saved to local storage
  if (wayvalue === 'ONEWAY') {
    const departureDate = localStorage.getItem('departureDate');
    let arrivaldateONEWAY = dayjs(departureDate).add(1, 'day');
    let add1date = arrivaldateONEWAY.format('YYYY-MM-DD');
    localStorage.setItem('arrivalDate', add1date);

    const oneWayResponse = await onewayDATA();
    const oneWayData = await oneWayResponse.json();
    saveOneWayData(oneWayData);
  } else {
    const oneWayResponse = onewayDATA().then((response) => {
      return response.json();
    });

    const returnResponse = returnDATA().then((response) => {
      return response.json();
    });

    const [oneWayData, returnData] = await Promise.all([oneWayResponse, returnResponse]);
    saveOneWayData(oneWayData);
    saveReturnData(returnData);
  }
  // finally load next page
  goingNextpage();
}
('https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=ADL&departureDate=2023-01-17&adults=1&travelClass=ECONOMY&nonStop=false&max=250');
//going flight
function onewayDATA() {
  let FetchHEADER = token_type + ' ' + accessToken;
  let deIatacode = localStorage.getItem('departurecitycode');
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
  });
}

function saveOneWayData(data) {
  finalGoingdata = data;
  localStorage.setItem('finalGoingdata', JSON.stringify(finalGoingdata));
}

// return flight
function returnDATA() {
  let FetchHEADER = token_type + ' ' + accessToken;
  let deIatacode = localStorage.getItem('departurecitycode');
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
  });
}

function saveReturnData(data) {
  finalreturndata = data;
  localStorage.setItem('finalreturndata', JSON.stringify(finalreturndata));
}

//going next page function
function goingNextpage() {
  window.location.href = './flight-results.html';
}

// changes date format from DD/MM/YYYY to YYYY-MM-DD
function manipulateDates() {
  const traveldate = localStorage.getItem('date');
  let dateformatchange = traveldate.split(' ');
  let DEdateformatchange = dateformatchange[0].split('/');
  if (dateformatchange[2]) {
    let ARdateformatchange = dateformatchange[2].split('/');
    let ARchanged = ARdateformatchange[2] + '-' + ARdateformatchange[0] + '-' + ARdateformatchange[1];
    ARdateforquery = ARchanged;
    localStorage.setItem('arrivalDate', ARdateforquery);
  }

  let DEchanged = DEdateformatchange[2] + '-' + DEdateformatchange[0] + '-' + DEdateformatchange[1];
  DEdateforquery = DEchanged;
  localStorage.setItem('departureDate', DEdateforquery);
}

async function callApis() {
  const currencyResponse = getCurrencyData().then((response) => {
    return response.json();
  });

  const departureResponse = DEgetIATAcodeDATA().then((response) => {
    return response.json();
  });

  const arrivalResponse = ARgetIATAcodeDATA().then((response) => {
    return response.json();
  });
  // awaitng the processing of the JSON response
  const responses = await Promise.all([currencyResponse, departureResponse, arrivalResponse]);

  return [responses[0], responses[1], responses[2]];
}
