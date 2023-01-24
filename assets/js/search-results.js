const userdeparture = document.querySelector("#departure");
const arrival = document.querySelector("#arrival");
const first = document.querySelector('#first');
const business = document.querySelector('#business');
const economy = document.querySelector('#economy');
const search = document.querySelector("#search");



let token_type = " ";
let accessToken = " ";
let DEiatacode = " ";
let ARiatacode = " ";
let DEdateforquery = " ";
let ARdateforquery = " ";
let selectedClass = " ";
let passenager = " ";
let ways = " ";



search.addEventListener("click", getToken); // it runs when the toggle switch btn clicked

// fetching currency API
const api = "https://api.exchangerate-api.com/v4/latest/eur";


fetch(`${api}`)
    .then(currency => {
        return currency.json();
    }).then(function (data) {
        console.log(data);
        localStorage.setItem('currencydata', JSON.stringify(data));
    });

// generate new access-token whenever app starts 
// if user stays in search page(index page) for more than 20 mins, it will generated new access-token
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

// getting departure IATA code from finding cityname API 
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

// getting arrival IATA code from finding cityname API 
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
      makingQueryDATA();
    });
}


// making querydata function (date,seatclass,oneway or return)
function makingQueryDATA() {
  const traveldate = localStorage.getItem("date")
  let dateformatchange = traveldate.split(' ');
  console.log(dateformatchange);
  let DEdateformatchange = dateformatchange[0].split('/');
  let ARdateformatchange = dateformatchange[2].split('/');
  console.log(DEdateformatchange);
  console.log(ARdateformatchange);
  

  let DEchanged = DEdateformatchange[2] + "-" + DEdateformatchange[0] + "-" + DEdateformatchange[1];
  let ARchanged = ARdateformatchange[2] + "-" + ARdateformatchange[0] + "-" + ARdateformatchange[1];
  DEdateforquery = DEchanged;
  ARdateforquery = ARchanged;
  console.log(DEdateforquery);
  console.log(ARdateforquery);
  localStorage.setItem('departureDate', DEdateforquery);
  localStorage.setItem('arrivalDate', ARdateforquery);

  var select1 = document.getElementById("select1");
  var classvalue = select1.value;
  selectedClass = classvalue;

  console.log(selectedClass);

  var select2 = document.getElementById("select2");
  var wayvalue = select2.value;
  ways = wayvalue;
  localStorage.setItem('WAYvalue',ways);
  console.log(ways);

  var people = document.getElementById("people");
  var passenagervalue = people.value;
  passenager = passenagervalue;
  localStorage.setItem('PASSENAGERvalue',passenager);
  console.log(passenager);

  if (ways === "ONEWAY") {
    onewayDATA();

  }

  if (ways === "RETURN") {
    onewayDATA();
    returnDATA();
  }
}



//going flight
function onewayDATA() {
  DEiatacode = localStorage.getItem('departurecitycode');
  ARiatacode = localStorage.getItem('arrivalcitycode');
  let FetchHEADER = token_type + " " + accessToken;
  let requestUrlgoing = "https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=" + DEiatacode + "&destinationLocationCode=" + ARiatacode + "&departureDate=" + DEdateforquery + "&adults=" + passenager + "&travelClass=" + selectedClass + "&nonStop=false&max=250";

  fetch(requestUrlgoing, {
    headers: { Authorization: FetchHEADER }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("final data --------");
      console.log(data);
      localStorage.setItem('finalGoingdata', JSON.stringify(data));
      setInterval(goingNextpage, 5000);
    });
}

// return flight
function returnDATA() {
  DEiatacode = localStorage.getItem('departurecitycode');
  ARiatacode = localStorage.getItem('arrivalcitycode');
  let FetchHEADER = token_type + " " + accessToken;

  let requestUrlreturn = "https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=" + ARiatacode + "&destinationLocationCode=" + DEiatacode + "&departureDate=" + ARdateforquery +  "&adults=" + passenager + "&travelClass=" + selectedClass + "&nonStop=false&max=250";

  fetch(requestUrlreturn, {
    headers: { Authorization: FetchHEADER }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("final data --------");
      console.log(data);
      localStorage.setItem('finalreturndata', JSON.stringify(data));
    });

}



//going next page function
function goingNextpage() {
  window.location.href = "./flight-results.html";
}


timeInterval = setInterval(() => {
  getToken();
}, 900000) // the token will be generated every 20mins - if you want to test it, change the number to 10000 then will be generated every 10 second

bulmaSlider.attach();