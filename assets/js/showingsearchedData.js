
const header = document.querySelector('h1');
const div = document.querySelector('#div');

displayFlightData();

function displayFlightData() {
    const finaldata = JSON.parse(localStorage.getItem('finaldata'));
    const departurecityname = JSON.parse(localStorage.getItem('departurecityname'));
    const arrivalcityname = JSON.parse(localStorage.getItem('arrivalcityname'));
    console.log(finaldata);
    header.innerHTML = finaldata.data[0].itineraries[0].segments[0].departure.iataCode+ " ----> " +finaldata.data[0].itineraries[0].segments[0].arrival.iataCode;

    const ticket = document.createElement("div");
    const place = document.createElement("div");
    const time = document.createElement("div");
    const description = document.createElement("div");
    const departure = document.createElement("p");
    const arrival = document.createElement("p");
    const DEtime = document.createElement("p");
    const ARtime = document.createElement("p");
    const flightclass = document.createElement("p");
    const price = document.createElement("p");

    departure.setAttribute("style","display:inline-block");
    arrival.setAttribute("style","display:inline-block");
    DEtime.setAttribute("style","display:inline-block");
    ARtime.setAttribute("style","display:inline-block");

    departure.innerHTML = finaldata.data[0].itineraries[0].segments[0].departure.iataCode;
    arrival.innerHTML = finaldata.data[0].itineraries[0].segments[0].arrival.iataCode;
    DEtime.innerHTML = finaldata.data[0].itineraries[0].segments[0].departure.at;
    ARtime.innerHTML = finaldata.data[0].itineraries[0].segments[0].arrival.at;
    flightclass.innerHTML = finaldata.data[0].travelerPricings[0].fareDetailsBySegment[0].cabin;
    price.innerHTML = finaldata.data[0].travelerPricings[0].price.total+ "EUR";

    div.appendChild(ticket);
    div.appendChild(place);
    div.appendChild(time);
    div.appendChild(description);
    place.appendChild(departure);
    place.appendChild(arrival);
    time.appendChild(DEtime);
    time.appendChild(ARtime);
    description.appendChild(flightclass);
    description.appendChild(price);
}