const userdeparture = document.querySelector("#departure");
const departureDate = document.querySelector("#datepicker");
const arrival = document.querySelector("#arrival");
const first = document.querySelector('#first');
const business = document.querySelector('#business');
const economy = document.querySelector('#economy');
const search = document.querySelector("#search");



let token_type = " ";
let accessToken = " ";
let DEiatacode = " ";
let ARiatacode = " ";
let selectedClass = " ";
let ways = " ";



search.addEventListener("click", getToken) // it runs when the toggle switch btn clicked

// generate new access-token whenever app starts
function getToken() {
  const TOKENUrl = "https://api.amadeus.com/v1/security/oauth2/token"

  fetch(TOKENUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=FgVXIVlEeBmSHOG5GhRdPceveA3CExUw&client_secret=IGDvlEYHGKe0dUiI'
  }).then(function (response) {
    return response.json();
  })
    .then(function (data) {
      token_type = data.token_type;
      accessToken = data.access_token;
      DEgetIATAcodeDATA(data);
      ARgetIATAcodeDATA(data);
    });
}

// fetching iATA code data with city keyword with the new generated access-token
function DEgetIATAcodeDATA(data) {
  let FetchHEADER = data.token_type + " " + data.access_token;

  let DErequestUrl = "https://api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=" + userdeparture.value.toUpperCase() + "&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL";

  fetch(DErequestUrl, {
    headers: { Authorization: FetchHEADER }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('data Response \n-------------');
      console.log(data);
      DEiatacode = data.data[0].iataCode;
      localStorage.setItem('departurecitycode', DEiatacode);
      localStorage.setItem('departurecitynamedata', JSON.stringify(data));
    });
}

function ARgetIATAcodeDATA(data) {
  let FetchHEADER = data.token_type + " " + data.access_token;

  let DErequestUrl = "https://api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=" + arrival.value.toUpperCase() + "&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL";

  fetch(DErequestUrl, {
    headers: { Authorization: FetchHEADER }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('data Response \n-------------');
      ARiatacode = data.data[0].iataCode;
      localStorage.setItem('arrivalcitycode', ARiatacode);
      localStorage.setItem('arrivalcitynamedata', JSON.stringify(data));
      getDATA();
    });
}


// fetching data with the new generated access-token
function getDATA() {
  DEiatacode = localStorage.getItem('departurecitycode');
  ARiatacode =  localStorage.getItem('arrivalcitycode');
  let FetchHEADER = token_type + " " + accessToken;
  let dateformatchange = departureDate.value.split(' ');
  console.log(dateformatchange);
  let DEdateformatchange = dateformatchange[0].split('/');
  let ARdateformatchange = dateformatchange[2].split('/');
  console.log(DEdateformatchange);
  console.log(ARdateformatchange);

  let DEdateforquery = DEdateformatchange[2] + "-" + DEdateformatchange[0] + "-" + DEdateformatchange[1];
  let ARdateforquery = ARdateformatchange[2] + "-" + ARdateformatchange[0] + "-" + ARdateformatchange[1];
  console.log(DEdateforquery);
  console.log(ARdateforquery);


  var select = document.getElementById("select");
  var value = select.value;
  selectedClass = value;
 
  console.log(value);

  let requestUrl = "https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=" + DEiatacode + "&destinationLocationCode=" + ARiatacode + "&departureDate=" + DEdateforquery + "&returnDate=" + ARdateforquery + "&adults=1&travelClass=" + selectedClass + "&nonStop=false&max=250";

  fetch(requestUrl, {
    headers: { Authorization: FetchHEADER }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("final data --------");
      console.log(data);
      localStorage.setItem('finaldata', JSON.stringify(data));
      setInterval(goingNextpage, 5000);
    });
}


function goingNextpage() {
  window.location.href = "./flight-results.html";
}

timeInterval = setInterval(() => {
  getToken();
}, 900000) // the token will be generated every 20mins - if you want to test it, change the number to 10000 then will be generated every 10 second
