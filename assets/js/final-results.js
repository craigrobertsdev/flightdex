var arrivalCity = localStorage.getItem('arrivalcityname');
var departureCity = localStorage.getItem('departurecityname');
var arrivalDate = localStorage.getItem('departureDate');
var departureDate = localStorage.getItem('arrivalDate');
var leaveDepart = localStorage.getItem('ONEWAYdeparttime');
var leaveArrive = localStorage.getItem('ONEWAYarrivaltime');
var returnDepart = localStorage.getItem('RETURNdeparttime');
var returnArrive = localStorage.getItem('RETURNarrivaltime');
var leaveCost = localStorage.getItem('ONEWAYcost');
var returnCost = localStorage.getItem('RETURNcost');
var wayValue = localStorage.getItem('WAYvalue');
var passenger = localStorage.getItem('PASSENAGERvalue');
var hotelName = localStorage.getItem('hotelName');
var hotelCost = localStorage.getItem('hotelCost');
hotelCost = hotelCost.split('$')[1];
var hotelTotalCost = '';
var flightTotalCost = '';
const eventData = JSON.parse(localStorage.getItem('eventData'));

let eventName, eventPrice, eventDate, eventTime;

// adding data to events variables
if (eventData) {
  eventName = eventData.eventName;
  eventPrice = eventData.eventPrice;
  eventDate = eventData.eventDate;
  eventTime = eventData.eventTime;
}

//change city name from full caps to proper noun formatting
arrivalCityChange = arrivalCity.toLowerCase();
arrivalCity = arrivalCityChange[0].toUpperCase() + arrivalCityChange.substring(1);

var departureCityChange = departureCity.toLowerCase();
departureCity = departureCityChange[0].toUpperCase() + departureCityChange.substring(1);

//input data for flights
function inputData() {
  CityInput = document.createElement('p');
  CityInput.innerHTML = departureCity + '  to  ' + arrivalCity + ' leaving on the ';
  document.getElementById('p1').appendChild(CityInput);

  //separating data inside local storage to input correctly 
  var dateChangeA = arrivalDate.split('-');
  var changedArrivalDate = dateChangeA[2] + '-' + dateChangeA[1] + '-' + dateChangeA[0];

  var dateChangeD = departureDate.split('-');
  var changedDepartureDate = dateChangeD[2] + '-' + dateChangeD[1] + '-' + dateChangeD[0];

  var leaveDepartTime = leaveDepart.split(' - ');
  leaveDepartTime = leaveDepartTime[1];

  var leaveArriveTime = leaveArrive.split(' - ');
  leaveArriveTime = leaveArriveTime[1];

  //appending data for leaving flight
  leaveDateInput = document.createElement('p');
  leaveDateInput.innerHTML = changedArrivalDate + ' departing at ' + leaveDepartTime + '<br>and arriving at ' + leaveArriveTime + '.';
  document.getElementById('p2').appendChild(leaveDateInput);

  leaveCostValue = leaveCost.split(' ');
  leaveTotalCost = Number(leaveCostValue[0]);
  flightTotalCost = leaveTotalCost;

  leaveCost = document.createElement('p');
  leaveCost.innerHTML = 'Cost of flight to ' + arrivalCity + ': $' + leaveTotalCost;
  document.getElementById('p6').appendChild(leaveCost);

  //if statement for return flights 
  if (wayValue == 'ONEWAY') {
    const returnElement = document.getElementById('p3');
    returnElement.remove();
  } else {
    //getting data from local storage
    returnDepartTime = returnDepart.split(' - ');
    returnDepartTime = returnDepartTime[1];

    returnArriveTime = returnArrive.split(' - ');
    returnArriveTime = returnArriveTime[1];

    returnDateInput = document.createElement('p');
    returnDateInput.innerHTML = changedDepartureDate + ' departing at ' + returnDepartTime + '<br>and arriving at ' + returnArriveTime + '.';
    document.getElementById('p3').appendChild(returnDateInput);
    //fix final numebr result
    returnCostValue = returnCost.split(' ');
    returnTotalCost = Number(returnCostValue[0]);
    flightTotalCost = returnTotalCost + leaveTotalCost;
    flightTotalCost = flightTotalCost.toFixed(2);
    //append onto page
    returnCost = document.createElement('p');
    returnCost.innerHTML = 'Cost of flight to ' + departureCity + ': $' + returnTotalCost;
    document.getElementById('p6').appendChild(returnCost);

    fTotalCost = document.createElement('p');
    fTotalCost.innerHTML = 'Total cost of return flight: $' + flightTotalCost;
    document.getElementById('p6').appendChild(fTotalCost);
  }

  hotelFunction();

  // capture reference to the book button for later functionality
  var bookButton = document.getElementById('#bookButton');


  homeButton = document.getElementById('homeButton');

  homeButton.addEventListener('click', button);
}

//function for checking if a hotel was selected and if so inputting that data onto the page
function hotelFunction() {
  if (hotelName == null) {
    const hotelElement = document.getElementById('p4');
    hotelElement.remove();
  } else {
    hotel = document.createElement('p');
    hotel.innerHTML = hotelName;
    document.getElementById('p4').appendChild(hotel);

    hotelCostValue = hotelCost.split(' ');
    hotelTotalCost = Number(hotelCostValue[0]);

    hotelCost = document.createElement('p');
    hotelCost.innerHTML = 'Total cost of Hotel: $' + hotelTotalCost;
    document.getElementById('p6').appendChild(hotelCost);
  }
  eventFunction();
  finalTotal();
}

//check for event data and if so log to page data received
function eventFunction() {
  const eventElement = document.getElementById('p5');
  if (eventData === null) {
    eventElement.remove();
  } else {
    const eventText = document.createElement('p');
    eventText.textContent = eventName;
    eventElement.append(eventText);
    if (eventPrice) {
      eventCost = document.createElement('p');
      eventCost.innerHTML = 'Total cost of events: $' + eventPrice;
      document.getElementById('p6').appendChild(eventCost);
    }
  }
}

//work out total cost of all flights, hotel and event data and log to website
function finalTotal() {
  if (hotelTotalCost == null) {
    hotelTotal = 0;
  } else {
    hotelTotal = hotelTotalCost;
  }
  var totalCost = +hotelTotalCost + +flightTotalCost;
  if (eventPrice) {
    console.log(eventPrice);
    totalCost += +eventPrice;
  }

  totalCost = totalCost.toFixed(2);
  finalTotalCost = document.createElement('p');
  finalTotalCost.innerHTML = '$' + totalCost;
  document.getElementById('p7').appendChild(finalTotalCost);
}

//function for home button to return to main pag and clear local storage
function button() {
  localStorage.clear();
  location.assign('./index.html');
}

inputData();

finalTotalCost.style.color = '#00d1b2';
finalTotalCost.style.fontSize = '40px';
