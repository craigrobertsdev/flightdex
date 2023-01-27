const header = document.querySelector('header');
const going = document.getElementById('location-to');
const div = document.querySelector('#result');

// calling all the datas which are saved in localstorage

const finalGoingdata = JSON.parse(localStorage.getItem('finalGoingdata'));
const finalreturndata = JSON.parse(localStorage.getItem('finalreturndata'));
const currencydata = JSON.parse(localStorage.getItem('currencydata'));

const value = localStorage.getItem('WAYvalue');
const PASSENAGERvalue = localStorage.getItem('PASSENAGERvalue');
const departurecityname = localStorage.getItem('departurecityname');
const arrivalcityname = localStorage.getItem('arrivalcityname');
const departurecitycode = localStorage.getItem('departurecitycode');
const arrivalcitycode = localStorage.getItem('arrivalcitycode');

let ONEWAYcorrectdatas = [];
let RETURNcorrectdatas = [];
let lengthofRightdata = " ";

if (value === "ONEWAY") {
    onewayFlightData();
} else {
    returnFlightData();
}

//showing one way tickets
function onewayFlightData() {
    console.log(departurecityname);
    console.log(arrivalcityname);
    console.log(finalGoingdata);
    going.textContent = departurecityname + " (" + finalGoingdata.data[0].itineraries[0].segments[0].departure.iataCode + ")" + " ----> " + arrivalcityname + " (" + finalGoingdata.data[0].itineraries[0].segments[0].arrival.iataCode + ")";

    for (i = 0; i < 20; i++) {
        if (finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode === departurecitycode && finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode === arrivalcitycode) {
            ONEWAYcorrectdatas.push(i);
            console.log(ONEWAYcorrectdatas);
        } else if (finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode === departurecitycode || finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode === arrivalcitycode) {
            i++;
        }
    }

    for (i = 0; i < ONEWAYcorrectdatas.length; i++) {
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
        const passenager = document.createElement("p");

        ticket.setAttribute("style", "border:2px solid silver; margin-bottom:10px;");
        departure.setAttribute("style", "display:inline-block;");
        arrival.setAttribute("style", "display:inline-block;");
        DEtime.setAttribute("style", "display:inline-block;");
        ARtime.setAttribute("style", "display:inline-block;");

        departure.innerHTML = departurecityname + " (" + finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode + ")";
        arrival.innerHTML = arrivalcityname + " (" + finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode + ")";
        DEtime.innerHTML = finalGoingdata.data[i].itineraries[0].segments[0].departure.at;
        ARtime.innerHTML = finalGoingdata.data[i].itineraries[0].segments[0].arrival.at;
        flightclass.innerHTML = finalGoingdata.data[i].travelerPricings[0].fareDetailsBySegment[0].cabin;
        let AUDprice = currencydata.rates.AUD * finalGoingdata.data[i].travelerPricings[0].price.total
        price.innerHTML = AUDprice.toFixed(2) + " AUD";
        passenager.innerHTML = PASSENAGERvalue;

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
        description.appendChild(passenager);

        const destination = document.getElementById('destination-results');
        destination.insertAdjacentElement('afterend', ticket);
    }
}


//showing return tickets
function returnFlightData() {
    console.log(departurecityname);
    console.log(arrivalcityname);
    console.log(finalGoingdata);
    console.log(finalreturndata);
    console.log(currencydata);

    const hearder2 = document.createElement("p");
    going.innerHTML = departurecityname + " (" + finalGoingdata.data[0].itineraries[0].segments[0].departure.iataCode + ")" + " ----> " + arrivalcityname + " (" + finalGoingdata.data[0].itineraries[0].segments[0].arrival.iataCode + ")";
    hearder2.innerHTML = arrivalcityname + " (" + finalreturndata.data[0].itineraries[0].segments[0].departure.iataCode + ")" + " ----> " + departurecityname + " (" + finalreturndata.data[0].itineraries[0].segments[0].arrival.iataCode + ")";
    header.appendChild(hearder2)

    for (i = 0; i < 20; i++) {
        if (finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode === departurecitycode && finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode === arrivalcitycode) {
            ONEWAYcorrectdatas.push(i);
            console.log(ONEWAYcorrectdatas);
        } else if (finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode === departurecitycode || finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode === arrivalcitycode) {
            i++;
        }
    }

    for (i = 0; i < 20; i++) {
        if (finalreturndata.data[i].itineraries[0].segments[0].departure.iataCode === arrivalcitycode && finalreturndata.data[i].itineraries[0].segments[0].arrival.iataCode === departurecitycode) {
            RETURNcorrectdatas.push(i);
            console.log(RETURNcorrectdatas);

        } else if (finalreturndata.data[i].itineraries[0].segments[0].departure.iataCode === arrivalcitycode || finalreturndata.data[i].itineraries[0].segments[0].arrival.iataCode === departurecitycode) {
            i++;
        }
    }

    console.log(ONEWAYcorrectdatas.length);
    console.log(RETURNcorrectdatas.length);

    if (ONEWAYcorrectdatas.length > RETURNcorrectdatas.length) {
        lengthofRightdata = ONEWAYcorrectdatas.length;
    } else if (ONEWAYcorrectdatas.length > RETURNcorrectdatas.length) {
        lengthofRightdata = ONEWAYcorrectdatas.length;
    } else {
        lengthofRightdata = RETURNcorrectdatas.length;
    }

    console.log(lengthofRightdata);

    if (lengthofRightdata / 2 !== 0) {
        lengthofRightdata = lengthofRightdata - 1;
    } else {
        lengthofRightdata = lengthofRightdata;
    }



    for (i = 0, j = 0, z = 0; i < lengthofRightdata; i++, j = i / 2, z = i / 2 - 0.5) {
        if (i === 0 || i % 2 == 0) {
            const ticket = document.createElement("div");
            const place = document.createElement("div");
            const time = document.createElement("div");
            const description = document.createElement("div");
            const departure = document.createElement("p");
            const DEtime = document.createElement("p");
            const arrival = document.createElement("p");
            const ARtime = document.createElement("p");
            const flightclass = document.createElement("p");
            const price = document.createElement("p");
            const passenager = document.createElement("p");

            ticket.setAttribute("style", "border:2px solid silver; margin-bottom:10px; border-radius:5px;");
            departure.setAttribute("style", "display:inline-block;");
            arrival.setAttribute("style", "display:inline-block;");
            DEtime.setAttribute("style", "display:inline-block;");
            ARtime.setAttribute("style", "display:inline-block;");
          

            departure.innerHTML = departurecityname + " (" + finalGoingdata.data[j].itineraries[0].segments[0].departure.iataCode + ")";
            arrival.innerHTML = arrivalcityname + " (" + finalGoingdata.data[j].itineraries[0].segments[0].arrival.iataCode + ")";
            DEtime.innerHTML = finalGoingdata.data[j].itineraries[0].segments[0].departure.at;
            ARtime.innerHTML = finalGoingdata.data[j].itineraries[0].segments[0].arrival.at;
            flightclass.innerHTML = finalGoingdata.data[j].travelerPricings[0].fareDetailsBySegment[0].cabin;
            let AUDprice = currencydata.rates.AUD * finalGoingdata.data[j].travelerPricings[0].price.total
            price.innerHTML = AUDprice.toFixed(2) + " AUD";
            passenager.innerHTML = PASSENAGERvalue;

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
            description.appendChild(passenager);

            const destination = document.getElementById('destination-results');
            destination.insertAdjacentElement('afterend', ticket);
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
            const passenager = document.createElement("p");

            ticket.setAttribute("style", "border:2px solid silver; margin-bottom:10px; border-radius:5px;");
            departure.setAttribute("style", "display:inline-block;");
            arrival.setAttribute("style", "display:inline-block;");
            DEtime.setAttribute("style", "display:inline-block;");
            ARtime.setAttribute("style", "display:inline-block;");

            departure.innerHTML = departurecityname + " (" + finalGoingdata.data[z].itineraries[0].segments[0].departure.iataCode + ")";
            arrival.innerHTML = arrivalcityname + " (" + finalGoingdata.data[z].itineraries[0].segments[0].arrival.iataCode + ")";
            DEtime.innerHTML = finalreturndata.data[z].itineraries[0].segments[0].departure.at;
            ARtime.innerHTML = finalreturndata.data[z].itineraries[0].segments[0].arrival.at;
            flightclass.innerHTML = finalreturndata.data[z].travelerPricings[0].fareDetailsBySegment[0].cabin;
            let AUDprice = currencydata.rates.AUD * finalreturndata.data[z].travelerPricings[0].price.total
            price.innerHTML = AUDprice.toFixed(2) + " AUD";
            passenager.innerHTML = PASSENAGERvalue;

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
            description.appendChild(passenager);

            const destination = document.getElementById('return-results');
            destination.insertAdjacentElement('afterend', ticket);
        } else return;
    }
}

