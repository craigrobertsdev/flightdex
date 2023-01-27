const header = document.querySelector('header');
const going = document.getElementById('location-to');
const div = document.querySelector('#result');
const slider = document.querySelector('#sliderWithValue');
const notice = document.createElement("div");


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
let Slidervalue = 500;


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
        if (currencydata.rates.AUD * finalGoingdata.data[i].travelerPricings[0].price.total > Slidervalue) {
            notice.setAttribute("id", "nodata");
            notice.setAttribute("style", "border:5px solid black; margin-bottom:10px;");
            notice.innerHTML = "There are not tickets below the max price";
            div.appendChild(notice);
        } else {
            const box = document.createElement("div");
            const header = document.createElement("h3");
            const ticket = document.createElement("div");
            const DEcitydiv = document.createElement("div");
            const DEtimediv = document.createElement("div");
            const ARcitydiv = document.createElement("div");
            const ARtimediv = document.createElement("div");
            const Classdiv = document.createElement("div");
            const Costdiv = document.createElement("div");
            const Passenagerdiv = document.createElement("div");
            const p1 = document.createElement("p");
            const departurecity = document.createElement("p");
            const p2 = document.createElement("p");
            const DEtime = document.createElement("p");
            const p3 = document.createElement("p");
            const arrivalcity = document.createElement("p");
            const p4 = document.createElement("p");
            const ARtime = document.createElement("p");
            const p5 = document.createElement("p");
            const flightclass = document.createElement("p");
            const p6 = document.createElement("p");
            const price = document.createElement("p");
            const p7 = document.createElement("p");
            const passenager = document.createElement("p");

            const hr = document.createElement("hr");

            box.setAttribute("class", "box");
            header.setAttribute("class", "title is-5");
            ticket.setAttribute("id", "destination-results");
            ticket.setAttribute("class", "columns");
            DEcitydiv.setAttribute("class", "columns is-2");
            DEtimediv.setAttribute("class", "columns is-2");
            ARcitydiv.setAttribute("class", "columns is-2");
            ARtimediv.setAttribute("class", "columns is-2");
            Classdiv.setAttribute("class", "columns is-1");
            Costdiv.setAttribute("class", "columns is-1");
            Passenagerdiv.setAttribute("class", "columns is-1");
            hr.setAttribute("class", "rounded");

            p1.innerHTML = "Departure City";
            p2.innerHTML = "Depart Time";
            p3.innerHTML = "Arrival City";
            p4.innerHTML = "Arrival Time";
            p5.innerHTML = "Class";
            p6.innerHTML = "Cost";
            p7.innerHTML = "Passengers";


            header.innerHTML = "Flights to:";
            departurecity.textContent = departurecityname + " (" + finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode + ")";
            arrivalcity.textContent = arrivalcityname + " (" + finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode + ")";
            DEtime.textContent = finalGoingdata.data[i].itineraries[0].segments[0].departure.at;
            ARtime.textContent = finalGoingdata.data[i].itineraries[0].segments[0].arrival.at;
            flightclass.textContent = finalGoingdata.data[i].travelerPricings[0].fareDetailsBySegment[0].cabin;
            let AUDprice = currencydata.rates.AUD * finalGoingdata.data[i].travelerPricings[0].price.total;
            price.textContent = AUDprice.toFixed(2) + " AUD";
            passenager.textContent = PASSENAGERvalue;

            div.appendChild(box);
            box.appendChild(header);
            box.appendChild(ticket);
            ticket.appendChild(DEcitydiv);
            ticket.appendChild(DEtimediv);
            ticket.appendChild(ARcitydiv);
            ticket.appendChild(ARtimediv);
            ticket.appendChild(Classdiv);
            ticket.appendChild(Costdiv);
            ticket.appendChild(Passenagerdiv);
            DEcitydiv.appendChild(p1);
            p1.appendChild(departurecity);
            DEtimediv.appendChild(p2);
            p2.appendChild(arrivalcity);
            ARcitydiv.appendChild(p3);
            p3.appendChild(DEtime);
            ARtimediv.appendChild(p4);
            p4.appendChild(ARtime);
            Classdiv.appendChild(p5);
            p5.appendChild(flightclass);
            Costdiv.appendChild(p6);
            p6.appendChild(price);
            Passenagerdiv.appendChild(p7);
            p7.appendChild(passenager);
            box.appendChild(hr);
        }
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
    going.appendChild(hearder2)

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
        lengthofRightdata = RETURNcorrectdatas.length;
    } else if (ONEWAYcorrectdatas.length < RETURNcorrectdatas.length) {
        lengthofRightdata = ONEWAYcorrectdatas.length;
    } else {
        lengthofRightdata = RETURNcorrectdatas.length;
    }

    console.log(lengthofRightdata);

    if (lengthofRightdata / 2 !== 0 && lengthofRightdata / 2 !== 1) {
        lengthofRightdata = lengthofRightdata - 1;
    } else {
        lengthofRightdata = lengthofRightdata;
    }



    for (i = 0, j = 0, z = 0; i < lengthofRightdata*2; i++, j = i / 2, z = i / 2 - 0.5) {
        if (i === 0 || i % 2 == 0) {

            const box = document.createElement("div");
            const header = document.createElement("h3");
            const ticket = document.createElement("div");
            const DEcitydiv = document.createElement("div");
            const DEtimediv = document.createElement("div");
            const ARcitydiv = document.createElement("div");
            const ARtimediv = document.createElement("div");
            const Classdiv = document.createElement("div");
            const Costdiv = document.createElement("div");
            const Passenagerdiv = document.createElement("div");
            const p1 = document.createElement("p");
            const departurecity = document.createElement("p");
            const p2 = document.createElement("p");
            const DEtime = document.createElement("p");
            const p3 = document.createElement("p");
            const arrivalcity = document.createElement("p");
            const p4 = document.createElement("p");
            const ARtime = document.createElement("p");
            const p5 = document.createElement("p");
            const flightclass = document.createElement("p");
            const p6 = document.createElement("p");
            const price = document.createElement("p");
            const p7 = document.createElement("p");
            const passenager = document.createElement("p");

            const hr = document.createElement("hr");

            box.setAttribute("class", "box");
            header.setAttribute("class", "title is-5");
            ticket.setAttribute("id", "destination-results");
            ticket.setAttribute("class", "columns");
            DEcitydiv.setAttribute("class", "columns is-2");
            DEtimediv.setAttribute("class", "columns is-2");
            ARcitydiv.setAttribute("class", "columns is-2");
            ARtimediv.setAttribute("class", "columns is-2");
            Classdiv.setAttribute("class", "columns is-1");
            Costdiv.setAttribute("class", "columns is-1");
            Passenagerdiv.setAttribute("class", "columns is-1");
            hr.setAttribute("class", "rounded");

            p1.innerHTML = "Departure City";
            p2.innerHTML = "Depart Time";
            p3.innerHTML = "Arrival City";
            p4.innerHTML = "Arrival Time";
            p5.innerHTML = "Class";
            p6.innerHTML = "Cost";
            p7.innerHTML = "Passengers";


            header.innerHTML = "Flights to:";
            departurecity.textContent = departurecityname + " (" + finalGoingdata.data[ONEWAYcorrectdatas[j]].itineraries[0].segments[0].departure.iataCode + ")";
            arrivalcity.textContent = arrivalcityname + " (" + finalGoingdata.data[ONEWAYcorrectdatas[j]].itineraries[0].segments[0].arrival.iataCode + ")";
            DEtime.textContent = finalGoingdata.data[ONEWAYcorrectdatas[j]].itineraries[0].segments[0].departure.at;
            ARtime.textContent = finalGoingdata.data[ONEWAYcorrectdatas[j]].itineraries[0].segments[0].arrival.at;
            flightclass.textContent = finalGoingdata.data[ONEWAYcorrectdatas[j]].travelerPricings[0].fareDetailsBySegment[0].cabin;
            let AUDprice = currencydata.rates.AUD * finalGoingdata.data[ONEWAYcorrectdatas[j]].travelerPricings[0].price.total;
            price.textContent = AUDprice.toFixed(2) + " AUD";
            passenager.textContent = PASSENAGERvalue;

            div.appendChild(box);
            box.appendChild(header);
            box.appendChild(ticket);
            ticket.appendChild(DEcitydiv);
            ticket.appendChild(DEtimediv);
            ticket.appendChild(ARcitydiv);
            ticket.appendChild(ARtimediv);
            ticket.appendChild(Classdiv);
            ticket.appendChild(Costdiv);
            ticket.appendChild(Passenagerdiv);
            DEcitydiv.appendChild(p1);
            p1.appendChild(departurecity);
            DEtimediv.appendChild(p2);
            p2.appendChild(arrivalcity);
            ARcitydiv.appendChild(p3);
            p3.appendChild(DEtime);
            ARtimediv.appendChild(p4);
            p4.appendChild(ARtime);
            Classdiv.appendChild(p5);
            p5.appendChild(flightclass);
            Costdiv.appendChild(p6);
            p6.appendChild(price);
            Passenagerdiv.appendChild(p7);
            p7.appendChild(passenager);
            box.appendChild(hr);

        }

        else if (i % 2 == 1) {

            const box = document.createElement("div");
            const header = document.createElement("h3");
            const ticket = document.createElement("div");
            const DEcitydiv = document.createElement("div");
            const DEtimediv = document.createElement("div");
            const ARcitydiv = document.createElement("div");
            const ARtimediv = document.createElement("div");
            const Classdiv = document.createElement("div");
            const Costdiv = document.createElement("div");
            const Passenagerdiv = document.createElement("div");
            const p1 = document.createElement("p");
            const departurecity = document.createElement("p");
            const p2 = document.createElement("p");
            const DEtime = document.createElement("p");
            const p3 = document.createElement("p");
            const arrivalcity = document.createElement("p");
            const p4 = document.createElement("p");
            const ARtime = document.createElement("p");
            const p5 = document.createElement("p");
            const flightclass = document.createElement("p");
            const p6 = document.createElement("p");
            const price = document.createElement("p");
            const p7 = document.createElement("p");
            const passenager = document.createElement("p");

            const hr = document.createElement("hr");

            box.setAttribute("class", "box");
            header.setAttribute("class", "title is-5");
            ticket.setAttribute("id", "destination-results");
            ticket.setAttribute("class", "columns");
            DEcitydiv.setAttribute("class", "columns is-2");
            DEtimediv.setAttribute("class", "columns is-2");
            ARcitydiv.setAttribute("class", "columns is-2");
            ARtimediv.setAttribute("class", "columns is-2");
            Classdiv.setAttribute("class", "columns is-1");
            Costdiv.setAttribute("class", "columns is-1");
            Passenagerdiv.setAttribute("class", "columns is-1");
            hr.setAttribute("class", "rounded");

            p1.innerHTML = "Departure City";
            p2.innerHTML = "Depart Time";
            p3.innerHTML = "Arrival City";
            p4.innerHTML = "Arrival Time";
            p5.innerHTML = "Class";
            p6.innerHTML = "Cost";
            p7.innerHTML = "Passengers";

            header.innerHTML = "Flights from:";
            departurecity.innerHTML = arrivalcityname + " (" + finalreturndata.data[RETURNcorrectdatas[z]].itineraries[0].segments[0].departure.iataCode + ")";
            arrivalcity.innerHTML = departurecityname + " (" + finalreturndata.data[RETURNcorrectdatas[z]].itineraries[0].segments[0].arrival.iataCode + ")";
            DEtime.innerHTML = finalreturndata.data[RETURNcorrectdatas[z]].itineraries[0].segments[0].departure.at;
            ARtime.innerHTML = finalreturndata.data[RETURNcorrectdatas[z]].itineraries[0].segments[0].arrival.at;
            flightclass.innerHTML = finalreturndata.data[RETURNcorrectdatas[z]].travelerPricings[0].fareDetailsBySegment[0].cabin;
            let AUDprice = currencydata.rates.AUD * finalreturndata.data[RETURNcorrectdatas[z]].travelerPricings[0].price.total
            price.innerHTML = AUDprice.toFixed(2) + " AUD";
            passenager.innerHTML = PASSENAGERvalue;





            div.appendChild(box);
            box.appendChild(header);
            box.appendChild(ticket);
            ticket.appendChild(DEcitydiv);
            ticket.appendChild(DEtimediv);
            ticket.appendChild(ARcitydiv);
            ticket.appendChild(ARtimediv);
            ticket.appendChild(Classdiv);
            ticket.appendChild(Costdiv);
            ticket.appendChild(Passenagerdiv);
            DEcitydiv.appendChild(p1);
            p1.appendChild(departurecity);
            DEtimediv.appendChild(p2);
            p2.appendChild(arrivalcity);
            ARcitydiv.appendChild(p3);
            p3.appendChild(DEtime);
            ARtimediv.appendChild(p4);
            p4.appendChild(ARtime);
            Classdiv.appendChild(p5);
            p5.appendChild(flightclass);
            Costdiv.appendChild(p6);
            p6.appendChild(price);
            Passenagerdiv.appendChild(p7);
            p7.appendChild(passenager);
            box.appendChild(hr)

        } else return;
    }
}


//slider.addEventListener("click", MaxPrice)
//
//function MaxPrice() {
//    console.log(slider.value);
//    slider.setAttribute("value", slider.value);
//    Slidervalue = slider.value;
//    if (value === "ONEWAY" && Slidervalue === slider.value) {
//        //const notice = document.querySelector("#nodata")
//        //notice.setAttribute("style","display:none;");
//        //const ticket = document.querySelector("#ticket")
//        //ticket.setAttribute("style","display:none;");
//
//        ONEWAYcorrectdatas = [];
//        onewayFlightData();
//    } else {
//        returnFlightData();
//    }
//
//}
