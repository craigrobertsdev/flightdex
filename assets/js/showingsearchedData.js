const header = document.querySelector('header');
const going = document.querySelector('p');
const div = document.querySelector('#result');

let value = localStorage.getItem('ways')

if (value === "ONEWAY") {
    onewayFlightData();
} else {
    returnFlightData();
}

function onewayFlightData() {
    const finalGoingdata = JSON.parse(localStorage.getItem('finalGoingdata'));
    const departurecityname = JSON.parse(localStorage.getItem('departurecitynamedata'));
    const arrivalcityname = JSON.parse(localStorage.getItem('arrivalcitynamedata'));
    console.log(departurecityname);
    console.log(arrivalcityname);
    console.log(finalGoingdata);
    going.textContent = departurecityname.data[0].address.cityName + " (" + finalGoingdata.data[0].itineraries[0].segments[0].departure.iataCode + ")" + " ----> " + arrivalcityname.data[0].address.cityName + " (" + finalGoingdata.data[0].itineraries[0].segments[0].arrival.iataCode + ")";

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

        ticket.setAttribute("style", "border:5px solid black; margin-bottom:10px;");
        departure.setAttribute("style", "display:inline-block;");
        arrival.setAttribute("style", "display:inline-block;");
        DEtime.setAttribute("style", "display:inline-block;");
        ARtime.setAttribute("style", "display:inline-block;");

        departure.innerHTML = departurecityname.data[0].address.cityName + " (" + finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode + ")";
        arrival.innerHTML = arrivalcityname.data[0].address.cityName + " (" + finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode + ")";
        DEtime.innerHTML = finalGoingdata.data[i].itineraries[0].segments[0].departure.at;
        ARtime.innerHTML = finalGoingdata.data[i].itineraries[0].segments[0].arrival.at;
        flightclass.innerHTML = finalGoingdata.data[i].travelerPricings[0].fareDetailsBySegment[0].cabin;
        price.innerHTML = finalGoingdata.data[i].travelerPricings[0].price.total + "EUR";

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

function returnFlightData() {
    const finalGoingdata = JSON.parse(localStorage.getItem('finalGoingdata'));
    const finalreturndata = JSON.parse(localStorage.getItem('finalreturndata'));
    const departurecityname = JSON.parse(localStorage.getItem('departurecitynamedata'));
    const arrivalcityname = JSON.parse(localStorage.getItem('arrivalcitynamedata'));
    console.log(departurecityname);
    console.log(arrivalcityname);
    console.log(finalGoingdata);
    console.log(finalreturndata);
    const hearder2 = document.createElement("p");
    going.innerHTML = departurecityname.data[0].address.cityName + " (" + finalGoingdata.data[0].itineraries[0].segments[0].departure.iataCode + ")" + " ----> " + arrivalcityname.data[0].address.cityName + " (" + finalGoingdata.data[0].itineraries[0].segments[0].arrival.iataCode + ")";
    hearder2.innerHTML = arrivalcityname.data[0].address.cityName + " (" + finalreturndata.data[0].itineraries[0].segments[0].departure.iataCode + ")" + " ----> " + departurecityname.data[0].address.cityName + " (" + finalreturndata.data[0].itineraries[0].segments[0].arrival.iataCode + ")";
    header.appendChild(hearder2);

    for (i = 0, j = 0, z=0; i < 11; i++, j = i / 2, z=i/2-0.5) {
        if (i === 0 || i % 2 == 0) {
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

            ticket.setAttribute("style", "border:5px solid black; margin-bottom:10px;");
            departure.setAttribute("style", "display:inline-block;");
            arrival.setAttribute("style", "display:inline-block;");
            DEtime.setAttribute("style", "display:inline-block;");
            ARtime.setAttribute("style", "display:inline-block;");

            departure.innerHTML = departurecityname.data[0].address.cityName + " (" + finalGoingdata.data[j].itineraries[0].segments[0].departure.iataCode + ")";
            arrival.innerHTML = arrivalcityname.data[0].address.cityName + " (" + finalGoingdata.data[j].itineraries[0].segments[0].arrival.iataCode + ")";
            DEtime.innerHTML = finalGoingdata.data[j].itineraries[0].segments[0].departure.at;
            ARtime.innerHTML = finalGoingdata.data[j].itineraries[0].segments[0].arrival.at;
            flightclass.innerHTML = finalGoingdata.data[j].travelerPricings[0].fareDetailsBySegment[0].cabin;
            price.innerHTML = finalGoingdata.data[j].travelerPricings[0].price.total + "EUR";

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
    
        else if (i % 2 == 1) {
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

            ticket.setAttribute("style", "border:5px solid black; margin-bottom:10px;");
            departure.setAttribute("style", "display:inline-block;");
            arrival.setAttribute("style", "display:inline-block;");
            DEtime.setAttribute("style", "display:inline-block;");
            ARtime.setAttribute("style", "display:inline-block;");

            departure.innerHTML = departurecityname.data[0].address.cityName + " (" + finalGoingdata.data[z].itineraries[0].segments[0].departure.iataCode + ")";
            arrival.innerHTML = arrivalcityname.data[0].address.cityName + " (" + finalGoingdata.data[z].itineraries[0].segments[0].arrival.iataCode + ")";
            DEtime.innerHTML = finalreturndata.data[z].itineraries[0].segments[0].departure.at;
            ARtime.innerHTML = finalreturndata.data[z].itineraries[0].segments[0].arrival.at;
            flightclass.innerHTML = finalreturndata.data[z].travelerPricings[0].fareDetailsBySegment[0].cabin;
            price.innerHTML = finalreturndata.data[z].travelerPricings[0].price.total + "EUR";

            div.appendChild(ticket);
            ticket.appendChild(place);
            ticket.appendChild(time);
            ticket.appendChild(description);
            place.appendChild(arrival);
            place.appendChild(departure);
            time.appendChild(DEtime);
            time.appendChild(ARtime);
            description.appendChild(flightclass);
            description.appendChild(price);
        } else return;
    }
}