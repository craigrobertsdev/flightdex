
const header = document.querySelector('h1');
const div = document.querySelector('#result');

displayFlightData();

function displayFlightData() {
    const finaldata = JSON.parse(localStorage.getItem('finaldata'));
    const departurecityname = JSON.parse(localStorage.getItem('departurecitynamedata'));
    const arrivalcityname = JSON.parse(localStorage.getItem('arrivalcitynamedata'));
    console.log(departurecityname);
    console.log(arrivalcityname);
    console.log(finaldata);
    header.innerHTML = departurecityname.data[0].address.cityName + " (" + finaldata.data[0].itineraries[0].segments[0].departure.iataCode + ")" + " ----> " + arrivalcityname.data[0].address.cityName + " (" + finaldata.data[0].itineraries[0].segments[0].arrival.iataCode + ")";

    for (i = 0; i < 11; i++) {
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

        ticket.setAttribute("style", "border:5px solid black; margin-bottom:10px");
        departure.setAttribute("style", "display:inline-block;");
        arrival.setAttribute("style", "display:inline-block;");
        DEtime.setAttribute("style", "display:inline-block;");
        ARtime.setAttribute("style", "display:inline-block;");

        departure.innerHTML = departurecityname.data[0].address.cityName + " (" + finaldata.data[i].itineraries[0].segments[0].departure.iataCode + ")";
        arrival.innerHTML = arrivalcityname.data[0].address.cityName + " (" + finaldata.data[i].itineraries[0].segments[0].arrival.iataCode + ")";
        DEtime.innerHTML = finaldata.data[i].itineraries[0].segments[0].departure.at;
        ARtime.innerHTML = finaldata.data[i].itineraries[0].segments[0].arrival.at;
        flightclass.innerHTML = finaldata.data[i].travelerPricings[0].fareDetailsBySegment[0].cabin;
        price.innerHTML = finaldata.data[i].travelerPricings[0].price.total + "EUR";

        div.appendChild(ticket);
        ticket.appendChild(place);
        ticket.appendChild(time);
        ticket.appendChild(description);
        place.appendChild(departure);
        place.appendChild(arrival);
        time.appendChild(DEtime);
        time.appendChild(ARtime);
        description.appendChild(flightclass);
        description.appendChild(price);
    }
}