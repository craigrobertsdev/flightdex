const header = document.querySelector('header');
const going = document.getElementById('location-to');
const div = document.querySelector('#result');
const returnh3 = document.querySelector('#location-from');
const returndiv = document.querySelector('#returndiv');
const tonextpage = document.querySelector('#tonextpage');

const togodiv = document.querySelector('#togodiv');
const sliderWithValue = document.querySelector('#sliderWithValue');

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
const departureDate = localStorage.getItem('departureDate');
const arrivalDate = localStorage.getItem('arrivalDate');

let ONEWAYcorrectdatas = [];
let RETURNcorrectdatas = [];
let lengthofRightdata = 0;
let lengthtogoforDELETE = 0;
let lengthreturnforDELETE = 0;
let Slidervalue = 0;

if (value === 'ONEWAY') {
  returnh3.setAttribute('style', 'display:none;');
  returndiv.setAttribute('style', 'display:none;');
  onewayFlightData();
} else {
  returnFlightData();
}

//showing one way tickets
function onewayFlightData() {
  console.log(departurecityname);
  console.log(arrivalcityname);
  console.log(finalGoingdata);
  going.textContent =
    departurecityname +
    ' (' +
    finalGoingdata.data[0].itineraries[0].segments[0].departure.iataCode +
    ')' +
    ' ----> ' +
    arrivalcityname +
    ' (' +
    finalGoingdata.data[0].itineraries[0].segments[0].arrival.iataCode +
    ')';

  for (i = 0; i < 20; i++) {
    if (
      finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode === departurecitycode &&
      finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode === arrivalcitycode
    ) {
      ONEWAYcorrectdatas.push(i);
      console.log(ONEWAYcorrectdatas);
    } else if (
      finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode === departurecitycode ||
      finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode === arrivalcitycode
    ) {
      i++;
    }
  }

  lengthtogoforDELETE = ONEWAYcorrectdatas.length;

  console.log(ONEWAYcorrectdatas.length);
  if (ONEWAYcorrectdatas.length === 0) {
    NOdata();
  } else {
    for (i = 0; i < ONEWAYcorrectdatas.length; i++) {
      const ticket = document.createElement('div');
      const DEcitydiv = document.createElement('div');
      const DEtimediv = document.createElement('div');
      const ARcitydiv = document.createElement('div');
      const ARtimediv = document.createElement('div');
      const Classdiv = document.createElement('div');
      const Costdiv = document.createElement('div');
      const Passenagerdiv = document.createElement('div');
      const p1 = document.createElement('p');
      const departurecity = document.createElement('p');
      const p2 = document.createElement('p');
      const DEtime = document.createElement('p');
      const p3 = document.createElement('p');
      const arrivalcity = document.createElement('p');
      const p4 = document.createElement('p');
      const ARtime = document.createElement('p');
      const p5 = document.createElement('p');
      const flightclass = document.createElement('p');
      const p6 = document.createElement('p');
      const price = document.createElement('p');
      const p7 = document.createElement('p');
      const passenager = document.createElement('p');

      ticket.addEventListener('click', savingGOINGdata);
      ticket.classList = 'columns TOticket container';

      DEcitydiv.setAttribute('class', 'column is-2');
      DEtimediv.setAttribute('class', 'column is-2');
      ARcitydiv.setAttribute('class', 'column is-2');
      ARtimediv.setAttribute('class', 'column is-2');
      Classdiv.setAttribute('class', 'column is-1');
      Costdiv.setAttribute('class', 'column is-1');
      Passenagerdiv.setAttribute('class', 'column is-1');

      departurecity.textContent =
        departurecityname + ' (' + finalGoingdata.data[ONEWAYcorrectdatas[i]].itineraries[0].segments[0].departure.iataCode + ')';
      arrivalcity.textContent = arrivalcityname + ' (' + finalGoingdata.data[ONEWAYcorrectdatas[i]].itineraries[0].segments[0].arrival.iataCode + ')';

      let DEdatefromDATA = finalGoingdata.data[ONEWAYcorrectdatas[i]].itineraries[0].segments[0].departure.at;
      const DEdateformatchange = DEdatefromDATA.split('T');
      const actualDEdate = DEdateformatchange[0];
      const actualDEtime = DEdateformatchange[1];
      let actualfromDATA = finalGoingdata.data[ONEWAYcorrectdatas[i]].itineraries[0].segments[0].arrival.at;
      const ARdateformatchange = actualfromDATA.split('T');
      const actualARdate = DEdateformatchange[0];
      const actualARtime = ARdateformatchange[1];
      DEtime.textContent = actualDEdate + ' - ' + actualDEtime;
      ARtime.textContent = actualARdate + ' - ' + actualARtime;

      flightclass.textContent = finalGoingdata.data[ONEWAYcorrectdatas[i]].travelerPricings[0].fareDetailsBySegment[0].cabin;
      let AUDprice = currencydata.rates.AUD * finalGoingdata.data[ONEWAYcorrectdatas[i]].price.total;
      price.textContent = AUDprice.toFixed(2) + ' AUD';
      passenager.textContent = PASSENAGERvalue;

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

      const destination = document.getElementById('destination-results');
      destination.insertAdjacentElement('afterend', ticket);
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

  const hearder2 = document.createElement('p');
  going.innerHTML = departurecityname + ' (' + departurecitycode + ')' + ' ----> ' + arrivalcityname + ' (' + arrivalcitycode + ')';
  hearder2.innerHTML = arrivalcityname + ' (' + arrivalcitycode + ')' + ' ----> ' + departurecityname + ' (' + departurecitycode + ')';
  returnh3.appendChild(hearder2);

  for (i = 0; i < 20; i++) {
    if (
      finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode === departurecitycode &&
      finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode === arrivalcitycode
    ) {
      ONEWAYcorrectdatas.push(i);
      console.log(ONEWAYcorrectdatas);
    } else if (
      finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode === departurecitycode ||
      finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode === arrivalcitycode
    ) {
      i++;
    }
  }

  for (i = 0; i < 20; i++) {
    if (
      finalreturndata.data[i].itineraries[0].segments[0].departure.iataCode === arrivalcitycode &&
      finalreturndata.data[i].itineraries[0].segments[0].arrival.iataCode === departurecitycode
    ) {
      RETURNcorrectdatas.push(i);
      console.log(RETURNcorrectdatas);
    } else if (
      finalreturndata.data[i].itineraries[0].segments[0].departure.iataCode === arrivalcitycode ||
      finalreturndata.data[i].itineraries[0].segments[0].arrival.iataCode === departurecitycode
    ) {
      i++;
    }
  }

  console.log(ONEWAYcorrectdatas.length);
  console.log(RETURNcorrectdatas.length);

  if (ONEWAYcorrectdatas.length > RETURNcorrectdatas.length && RETURNcorrectdatas.length !== 0) {
    lengthofRightdata = RETURNcorrectdatas.length;
  } else if (ONEWAYcorrectdatas.length < RETURNcorrectdatas.length && ONEWAYcorrectdatas.length !== 0) {
    lengthofRightdata = ONEWAYcorrectdatas.length;
  } else if (ONEWAYcorrectdatas.length === 0) {
    lengthofRightdata = ONEWAYcorrectdatas.length;
  } else if (RETURNcorrectdatas.length === 0) {
    lengthofRightdata = RETURNcorrectdatas.length;
  } else {
    lengthofRightdata = RETURNcorrectdatas.length;
  }

  console.log(lengthofRightdata);

  if (lengthofRightdata % 2 !== 0 && lengthofRightdata !== 1) {
    lengthofRightdata = lengthofRightdata - 1;
  } else {
    lengthofRightdata = lengthofRightdata;
  }

  console.log(lengthofRightdata);
  lengthreturnforDELETE = lengthofRightdata;

  if (lengthofRightdata === 1) {
    NewLengthofRightdata = lengthofRightdata + 1;
  } else if (lengthofRightdata === 0) {
    // data 없음 페이지

    NOdata();

    return;
  } else {
    NewLengthofRightdata = lengthofRightdata * 2;
    lastdata = lengthofRightdata;
  }
  console.log(NewLengthofRightdata);

  for (i = 0, j = 0, z = 0; i < NewLengthofRightdata; i++, j = Math.floor(i / 2), z = Math.floor(i / 2 - 0.5)) {
    if (i === 0 || (i % 2 == 0 && ONEWAYcorrectdatas.length !== 0)) {
      const ticket = document.createElement('div');
      const DEcitydiv = document.createElement('div');
      const DEtimediv = document.createElement('div');
      const ARcitydiv = document.createElement('div');
      const ARtimediv = document.createElement('div');
      const Classdiv = document.createElement('div');
      const Costdiv = document.createElement('div');
      const Passenagerdiv = document.createElement('div');
      const p1 = document.createElement('p');
      const departurecity = document.createElement('p');
      const p2 = document.createElement('p');
      const DEtime = document.createElement('p');
      const p3 = document.createElement('p');
      const arrivalcity = document.createElement('p');
      const p4 = document.createElement('p');
      const ARtime = document.createElement('p');
      const p5 = document.createElement('p');
      const flightclass = document.createElement('p');
      const p6 = document.createElement('p');
      const price = document.createElement('p');
      const p7 = document.createElement('p');
      const passenager = document.createElement('p');

      ticket.addEventListener('click', savingGOINGdata);
      ticket.classList = 'columns TOticket container';
      DEcitydiv.setAttribute('class', 'column is-2');
      DEtimediv.setAttribute('class', 'column is-2');
      ARcitydiv.setAttribute('class', 'column is-2');
      ARtimediv.setAttribute('class', 'column is-2');
      Classdiv.setAttribute('class', 'column is-1');
      Costdiv.setAttribute('class', 'column is-1');
      Passenagerdiv.setAttribute('class', 'column is-1');

      departurecity.textContent =
        departurecityname + ' (' + finalGoingdata.data[ONEWAYcorrectdatas[j]].itineraries[0].segments[0].departure.iataCode + ')';
      arrivalcity.textContent = arrivalcityname + ' (' + finalGoingdata.data[ONEWAYcorrectdatas[j]].itineraries[0].segments[0].arrival.iataCode + ')';

      let DEdatefromDATA = finalGoingdata.data[ONEWAYcorrectdatas[j]].itineraries[0].segments[0].departure.at;
      const DEdateformatchange = DEdatefromDATA.split('T');
      const actualDEdate = DEdateformatchange[0];
      const actualDEtime = DEdateformatchange[1];
      let actualfromDATA = finalGoingdata.data[ONEWAYcorrectdatas[j]].itineraries[0].segments[0].arrival.at;
      const ARdateformatchange = actualfromDATA.split('T');
      const actualARdate = DEdateformatchange[0];
      const actualARtime = ARdateformatchange[1];
      DEtime.textContent = actualDEdate + ' - ' + actualDEtime;
      ARtime.textContent = actualARdate + ' - ' + actualARtime;

      flightclass.textContent = finalGoingdata.data[ONEWAYcorrectdatas[j]].travelerPricings[0].fareDetailsBySegment[0].cabin;
      let AUDprice = currencydata.rates.AUD * finalGoingdata.data[ONEWAYcorrectdatas[j]].price.total;
      price.textContent = AUDprice.toFixed(2) + ' AUD';
      passenager.textContent = PASSENAGERvalue;

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

      const destination = document.getElementById('destination-results');
      destination.insertAdjacentElement('afterend', ticket);
    } else if (i % 2 == 1 || ONEWAYcorrectdatas.length !== 0) {
      const ticket = document.createElement('div');
      const DEcitydiv = document.createElement('div');
      const DEtimediv = document.createElement('div');
      const ARcitydiv = document.createElement('div');
      const ARtimediv = document.createElement('div');
      const Classdiv = document.createElement('div');
      const Costdiv = document.createElement('div');
      const Passenagerdiv = document.createElement('div');
      const p1 = document.createElement('p');
      const departurecity = document.createElement('p');
      const p2 = document.createElement('p');
      const DEtime = document.createElement('p');
      const p3 = document.createElement('p');
      const arrivalcity = document.createElement('p');
      const p4 = document.createElement('p');
      const ARtime = document.createElement('p');
      const p5 = document.createElement('p');
      const flightclass = document.createElement('p');
      const p6 = document.createElement('p');
      const price = document.createElement('p');
      const p7 = document.createElement('p');
      const passenager = document.createElement('p');

      ticket.addEventListener('click', savingRETURNdata);
      ticket.classList = 'columns REticket container';
      DEcitydiv.setAttribute('class', 'column is-2');
      DEtimediv.setAttribute('class', 'column is-2');
      ARcitydiv.setAttribute('class', 'column is-2');
      ARtimediv.setAttribute('class', 'column is-2');
      Classdiv.setAttribute('class', 'column is-1');
      Costdiv.setAttribute('class', 'column is-1');
      Passenagerdiv.setAttribute('class', 'column is-1');

      departurecity.innerHTML =
        arrivalcityname + ' (' + finalreturndata.data[RETURNcorrectdatas[z]].itineraries[0].segments[0].departure.iataCode + ')';
      arrivalcity.innerHTML =
        departurecityname + ' (' + finalreturndata.data[RETURNcorrectdatas[z]].itineraries[0].segments[0].arrival.iataCode + ')';

      let DEdatefromDATA = finalreturndata.data[RETURNcorrectdatas[z]].itineraries[0].segments[0].departure.at;
      const DEdateformatchange = DEdatefromDATA.split('T');
      const actualDEdate = DEdateformatchange[0];
      const actualDEtime = DEdateformatchange[1];
      let actualfromDATA = finalreturndata.data[RETURNcorrectdatas[z]].itineraries[0].segments[0].arrival.at;
      const ARdateformatchange = actualfromDATA.split('T');
      const actualARdate = DEdateformatchange[0];
      const actualARtime = ARdateformatchange[1];
      DEtime.textContent = actualDEdate + ' - ' + actualDEtime;
      ARtime.textContent = actualARdate + ' - ' + actualARtime;

      flightclass.innerHTML = finalreturndata.data[RETURNcorrectdatas[z]].travelerPricings[0].fareDetailsBySegment[0].cabin;
      let AUDprice = currencydata.rates.AUD * finalreturndata.data[RETURNcorrectdatas[z]].price.total;
      price.innerHTML = AUDprice.toFixed(2) + ' AUD';
      passenager.innerHTML = PASSENAGERvalue;

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

      const returnF = document.getElementById('arrival-results');
      returnF.insertAdjacentElement('afterend', ticket);
    } else return;
  }
}

function NOdata() {
  const ticket = document.createElement('div');
  const p1 = document.createElement('p');

  going.setAttribute('style', 'display:none;');
  returnh3.setAttribute('style', 'display:none;');
  returndiv.setAttribute('style', 'display:none;');
  ticket.setAttribute('id', 'ticket');
  ticket.setAttribute('class', 'nodataresult nodata');
  p1.setAttribute('style', 'font-size:40px; font-weight:bold;');
  p1.innerHTML = 'sorry.. There are no tickets available';
  ticket.appendChild(p1);

  const destination = document.getElementById('destination-results');
  destination.insertAdjacentElement('afterend', ticket);
}

slider.addEventListener('click', Decide);

function Decide() {
  if (value === 'ONEWAY') {
    Deleteonewayresult();
  } else {
    Deletereturnresult();
  }
}

function Deleteonewayresult() {
  const Newslidervalue = document.getElementById('sliderWithValue');
  const nodataresult = document.querySelector('.nodata');

  if (value === 'ONEWAY' && !nodataresult) {
    for (i = 0; i < lengthtogoforDELETE; i++) {
      lastresult = document.querySelector('.TOticket');
      togodiv.removeChild(lastresult);
    }
  }

  if (nodataresult && value === 'ONEWAY') {
    togodiv.removeChild(nodataresult);
    going.setAttribute('style', 'display:block;');
    returnh3.setAttribute('style', 'display:block;');
  }

  Slidervalue = Newslidervalue.value;
  SortingbyPRICEonewaytickets();
}

function Deletereturnresult() {
  const Newslidervalue = document.getElementById('sliderWithValue');
  const nodataresult = document.querySelector('.nodata');
  if (value !== 'ONEWAY' && !nodataresult) {
    for (i = 0; i < lengthreturnforDELETE; i++) {
      lastresult = document.querySelector('.TOticket');
      togodiv.removeChild(lastresult);
    }
    for (i = 0; i < lengthreturnforDELETE; i++) {
      lastresult = document.querySelector('.REticket');
      returndiv.removeChild(lastresult);
    }
  }

  if (nodataresult && value !== 'ONEWAY') {
    togodiv.removeChild(nodataresult);
    going.setAttribute('style', 'display:block;');
    returnh3.setAttribute('style', 'display:block;');
    returndiv.setAttribute('style', 'display:block;');
  }

  Slidervalue = Newslidervalue.value;
  SortingbyPRICEreturntickets();
}

function SortingbyPRICEonewaytickets() {
  for (i = 0; i < 20; i++) {
    if (currencydata.rates.AUD * finalGoingdata.data[i].price.total > 1000) {
      sliderWithValue.setAttribute('max', '10000');
    }
  }

  ONEWAYcorrectdatas = [];
  console.log(ONEWAYcorrectdatas);
  going.textContent =
    departurecityname +
    ' (' +
    finalGoingdata.data[0].itineraries[0].segments[0].departure.iataCode +
    ')' +
    ' ----> ' +
    arrivalcityname +
    ' (' +
    finalGoingdata.data[0].itineraries[0].segments[0].arrival.iataCode +
    ')';

  for (i = 0; i < 20; i++) {
    if (
      finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode === departurecitycode &&
      finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode === arrivalcitycode &&
      currencydata.rates.AUD * finalGoingdata.data[i].price.total < Slidervalue
    ) {
      ONEWAYcorrectdatas.push(i);
      console.log(ONEWAYcorrectdatas);
    } else if (
      finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode === departurecitycode ||
      (finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode === arrivalcitycode &&
        currencydata.rates.AUD * finalGoingdata.data[i].price.total > Slidervalue)
    ) {
      i++;
    }
  }

  lengthtogoforDELETE = ONEWAYcorrectdatas.length;
  if (ONEWAYcorrectdatas.length === 0) {
    NOdata();
  } else {
    for (i = 0; i < ONEWAYcorrectdatas.length; i++) {
      const ticket = document.createElement('div');
      const DEcitydiv = document.createElement('div');
      const DEtimediv = document.createElement('div');
      const ARcitydiv = document.createElement('div');
      const ARtimediv = document.createElement('div');
      const Classdiv = document.createElement('div');
      const Costdiv = document.createElement('div');
      const Passenagerdiv = document.createElement('div');
      const p1 = document.createElement('p');
      const departurecity = document.createElement('p');
      const p2 = document.createElement('p');
      const DEtime = document.createElement('p');
      const p3 = document.createElement('p');
      const arrivalcity = document.createElement('p');
      const p4 = document.createElement('p');
      const ARtime = document.createElement('p');
      const p5 = document.createElement('p');
      const flightclass = document.createElement('p');
      const p6 = document.createElement('p');
      const price = document.createElement('p');
      const p7 = document.createElement('p');
      const passenager = document.createElement('p');

      ticket.addEventListener('click', savingGOINGdata);
      ticket.classList = 'columns TOticket container';

      DEcitydiv.setAttribute('class', 'column is-2');
      DEtimediv.setAttribute('class', 'column is-2');
      ARcitydiv.setAttribute('class', 'column is-2');
      ARtimediv.setAttribute('class', 'column is-2');
      Classdiv.setAttribute('class', 'column is-1');
      Costdiv.setAttribute('class', 'column is-1');
      Passenagerdiv.setAttribute('class', 'column is-1');

      departurecity.textContent =
        departurecityname + ' (' + finalGoingdata.data[ONEWAYcorrectdatas[i]].itineraries[0].segments[0].departure.iataCode + ')';
      arrivalcity.textContent = arrivalcityname + ' (' + finalGoingdata.data[ONEWAYcorrectdatas[i]].itineraries[0].segments[0].arrival.iataCode + ')';

      let DEdatefromDATA = finalGoingdata.data[ONEWAYcorrectdatas[i]].itineraries[0].segments[0].departure.at;
      const DEdateformatchange = DEdatefromDATA.split('T');
      const actualDEdate = DEdateformatchange[0];
      const actualDEtime = DEdateformatchange[1];
      let actualfromDATA = finalGoingdata.data[ONEWAYcorrectdatas[i]].itineraries[0].segments[0].arrival.at;
      const ARdateformatchange = actualfromDATA.split('T');
      const actualARdate = DEdateformatchange[0];
      const actualARtime = ARdateformatchange[1];
      DEtime.textContent = actualDEdate + ' - ' + actualDEtime;
      ARtime.textContent = actualARdate + ' - ' + actualARtime;

      flightclass.textContent = finalGoingdata.data[ONEWAYcorrectdatas[i]].travelerPricings[0].fareDetailsBySegment[0].cabin;
      let AUDprice = currencydata.rates.AUD * finalGoingdata.data[ONEWAYcorrectdatas[i]].price.total;
      price.textContent = AUDprice.toFixed(2) + ' AUD';
      passenager.textContent = PASSENAGERvalue;

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

      const destination = document.getElementById('destination-results');
      destination.insertAdjacentElement('afterend', ticket);
    }
  }
}
function SortingbyPRICEreturntickets() {
  for (i = 0; i < 20; i++) {
    if (currencydata.rates.AUD * finalGoingdata.data[i].price.total > 1000 || currencydata.rates.AUD * finalreturndata.data[i].price.total > 1000) {
      sliderWithValue.setAttribute('max', '10000');
    }
  }

  ONEWAYcorrectdatas = [];
  RETURNcorrectdatas = [];

  for (i = 0; i < 20; i++) {
    if (
      finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode === departurecitycode &&
      finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode === arrivalcitycode &&
      currencydata.rates.AUD * finalGoingdata.data[i].price.total < Slidervalue
    ) {
      ONEWAYcorrectdatas.push(i);
      console.log(ONEWAYcorrectdatas);
    } else if (
      finalGoingdata.data[i].itineraries[0].segments[0].departure.iataCode === departurecitycode ||
      (finalGoingdata.data[i].itineraries[0].segments[0].arrival.iataCode === arrivalcitycode &&
        currencydata.rates.AUD * finalGoingdata.data[i].price.total > Slidervalue)
    ) {
      i++;
    }
  }

  for (i = 0; i < 20; i++) {
    if (
      finalreturndata.data[i].itineraries[0].segments[0].departure.iataCode === arrivalcitycode &&
      finalreturndata.data[i].itineraries[0].segments[0].arrival.iataCode === departurecitycode &&
      currencydata.rates.AUD * finalGoingdata.data[i].price.total < Slidervalue
    ) {
      RETURNcorrectdatas.push(i);
      console.log(RETURNcorrectdatas);
    } else if (
      finalreturndata.data[i].itineraries[0].segments[0].departure.iataCode === arrivalcitycode ||
      (finalreturndata.data[i].itineraries[0].segments[0].arrival.iataCode === departurecitycode &&
        currencydata.rates.AUD * finalGoingdata.data[i].price.total < Slidervalue)
    ) {
      i++;
    }
  }

  console.log(ONEWAYcorrectdatas.length);
  console.log(RETURNcorrectdatas.length);

  if (ONEWAYcorrectdatas.length > RETURNcorrectdatas.length && RETURNcorrectdatas.length !== 0) {
    lengthofRightdata = RETURNcorrectdatas.length;
  } else if (ONEWAYcorrectdatas.length < RETURNcorrectdatas.length && ONEWAYcorrectdatas.length !== 0) {
    lengthofRightdata = ONEWAYcorrectdatas.length;
  } else if (ONEWAYcorrectdatas.length === 0) {
    lengthofRightdata = ONEWAYcorrectdatas.length;
  } else if (RETURNcorrectdatas.length === 0) {
    lengthofRightdata = RETURNcorrectdatas.length;
  } else {
    lengthofRightdata = RETURNcorrectdatas.length;
  }

  console.log(lengthofRightdata);

  if (lengthofRightdata % 2 !== 0 && lengthofRightdata !== 1) {
    lengthofRightdata = lengthofRightdata - 1;
  } else {
    lengthofRightdata = lengthofRightdata;
    lengthtogoforDELETE = lengthofRightdata;
  }

  console.log(lengthofRightdata);
  lengthreturnforDELETE = lengthofRightdata;

  if (lengthofRightdata === 1) {
    NewLengthofRightdata = lengthofRightdata + 1;
  } else if (lengthofRightdata === 0) {
    NOdata();

    return;
  } else {
    NewLengthofRightdata = lengthofRightdata * 2;
    lastdata = lengthofRightdata;
  }
  console.log(NewLengthofRightdata);

  for (i = 0, j = 0, z = 0; i < NewLengthofRightdata; i++, j = Math.floor(i / 2), z = Math.floor(i / 2 - 0.5)) {
    if (i === 0 || (i % 2 == 0 && ONEWAYcorrectdatas.length !== 0)) {
      const ticket = document.createElement('div');
      const DEcitydiv = document.createElement('div');
      const DEtimediv = document.createElement('div');
      const ARcitydiv = document.createElement('div');
      const ARtimediv = document.createElement('div');
      const Classdiv = document.createElement('div');
      const Costdiv = document.createElement('div');
      const Passenagerdiv = document.createElement('div');
      const p1 = document.createElement('p');
      const departurecity = document.createElement('p');
      const p2 = document.createElement('p');
      const DEtime = document.createElement('p');
      const p3 = document.createElement('p');
      const arrivalcity = document.createElement('p');
      const p4 = document.createElement('p');
      const ARtime = document.createElement('p');
      const p5 = document.createElement('p');
      const flightclass = document.createElement('p');
      const p6 = document.createElement('p');
      const price = document.createElement('p');
      const p7 = document.createElement('p');
      const passenager = document.createElement('p');

      ticket.addEventListener('click', savingGOINGdata);
      ticket.classList = 'columns TOticket container';
      DEcitydiv.setAttribute('class', 'column is-2');
      DEtimediv.setAttribute('class', 'column is-2');
      ARcitydiv.setAttribute('class', 'column is-2');
      ARtimediv.setAttribute('class', 'column is-2');
      Classdiv.setAttribute('class', 'column is-1');
      Costdiv.setAttribute('class', 'column is-1');
      Passenagerdiv.setAttribute('class', 'column is-1');

      departurecity.textContent =
        departurecityname + ' (' + finalGoingdata.data[ONEWAYcorrectdatas[j]].itineraries[0].segments[0].departure.iataCode + ')';
      arrivalcity.textContent = arrivalcityname + ' (' + finalGoingdata.data[ONEWAYcorrectdatas[j]].itineraries[0].segments[0].arrival.iataCode + ')';

      let DEdatefromDATA = finalGoingdata.data[ONEWAYcorrectdatas[j]].itineraries[0].segments[0].departure.at;
      const DEdateformatchange = DEdatefromDATA.split('T');
      const actualDEdate = DEdateformatchange[0];
      const actualDEtime = DEdateformatchange[1];
      let actualfromDATA = finalGoingdata.data[ONEWAYcorrectdatas[j]].itineraries[0].segments[0].arrival.at;
      const ARdateformatchange = actualfromDATA.split('T');
      const actualARdate = DEdateformatchange[0];
      const actualARtime = ARdateformatchange[1];
      DEtime.textContent = actualDEdate + ' - ' + actualDEtime;
      ARtime.textContent = actualARdate + ' - ' + actualARtime;

      flightclass.textContent = finalGoingdata.data[ONEWAYcorrectdatas[j]].travelerPricings[0].fareDetailsBySegment[0].cabin;
      let AUDprice = currencydata.rates.AUD * finalGoingdata.data[ONEWAYcorrectdatas[j]].price.total;
      price.textContent = AUDprice.toFixed(2) + ' AUD';
      passenager.textContent = PASSENAGERvalue;

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

      const destination = document.getElementById('destination-results');
      destination.insertAdjacentElement('afterend', ticket);
    } else if (i % 2 == 1 || ONEWAYcorrectdatas.length !== 0) {
      const ticket = document.createElement('div');
      const DEcitydiv = document.createElement('div');
      const DEtimediv = document.createElement('div');
      const ARcitydiv = document.createElement('div');
      const ARtimediv = document.createElement('div');
      const Classdiv = document.createElement('div');
      const Costdiv = document.createElement('div');
      const Passenagerdiv = document.createElement('div');
      const p1 = document.createElement('p');
      const departurecity = document.createElement('p');
      const p2 = document.createElement('p');
      const DEtime = document.createElement('p');
      const p3 = document.createElement('p');
      const arrivalcity = document.createElement('p');
      const p4 = document.createElement('p');
      const ARtime = document.createElement('p');
      const p5 = document.createElement('p');
      const flightclass = document.createElement('p');
      const p6 = document.createElement('p');
      const price = document.createElement('p');
      const p7 = document.createElement('p');
      const passenager = document.createElement('p');

      ticket.addEventListener('click', savingRETURNdata);
      ticket.classList = 'columns REticket container';
      DEcitydiv.setAttribute('class', 'column is-2');
      DEtimediv.setAttribute('class', 'column is-2');
      ARcitydiv.setAttribute('class', 'column is-2');
      ARtimediv.setAttribute('class', 'column is-2');
      Classdiv.setAttribute('class', 'column is-1');
      Costdiv.setAttribute('class', 'column is-1');
      Passenagerdiv.setAttribute('class', 'column is-1');

      departurecity.innerHTML =
        arrivalcityname + ' (' + finalreturndata.data[RETURNcorrectdatas[z]].itineraries[0].segments[0].departure.iataCode + ')';
      arrivalcity.innerHTML =
        departurecityname + ' (' + finalreturndata.data[RETURNcorrectdatas[z]].itineraries[0].segments[0].arrival.iataCode + ')';

      let DEdatefromDATA = finalreturndata.data[RETURNcorrectdatas[z]].itineraries[0].segments[0].departure.at;
      const DEdateformatchange = DEdatefromDATA.split('T');
      const actualDEdate = DEdateformatchange[0];
      const actualDEtime = DEdateformatchange[1];
      let actualfromDATA = finalreturndata.data[RETURNcorrectdatas[z]].itineraries[0].segments[0].arrival.at;
      const ARdateformatchange = actualfromDATA.split('T');
      const actualARdate = DEdateformatchange[0];
      const actualARtime = ARdateformatchange[1];
      DEtime.textContent = actualDEdate + ' - ' + actualDEtime;
      ARtime.textContent = actualARdate + ' - ' + actualARtime;

      flightclass.innerHTML = finalreturndata.data[RETURNcorrectdatas[z]].travelerPricings[0].fareDetailsBySegment[0].cabin;
      let AUDprice = currencydata.rates.AUD * finalreturndata.data[RETURNcorrectdatas[z]].price.total;
      price.innerHTML = AUDprice.toFixed(2) + ' AUD';
      passenager.innerHTML = PASSENAGERvalue;

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

      const returnF = document.getElementById('arrival-results');
      returnF.insertAdjacentElement('afterend', ticket);
    } else return;
  }
}

const slidercurrentvalue = document.querySelector('#value');
const input = document.querySelector('#sliderWithValue');

slidercurrentvalue.textContent = input.value;
input.addEventListener('input', (event) => {
  slidercurrentvalue.textContent = Math.floor(event.target.value) + ' AUD';
});

function savingGOINGdata(event) {
  event.stopPropagation();
  console.log(event.currentTarget);
  let datadiv = event.currentTarget;

  departtime = datadiv.children[2].children[0].innerText;
  arrivaltime = datadiv.children[3].children[0].innerText;
  cost = datadiv.children[5].children[0].innerText;

  localStorage.setItem('ONEWAYdeparttime', departtime);
  localStorage.setItem('ONEWAYarrivaltime', arrivaltime);
  localStorage.setItem('ONEWAYcost', cost);
}

function savingRETURNdata(event) {
  event.stopPropagation();
  console.log(event.currentTarget);
  let datadiv = event.currentTarget;


  departtime = datadiv.children[2].children[0].innerText;
  arrivaltime = datadiv.children[3].children[0].innerText;
  cost = datadiv.children[5].children[0].innerText;


  localStorage.setItem('RETURNdeparttime', departtime);
  localStorage.setItem('RETURNarrivaltime', arrivaltime);
  localStorage.setItem('RETURNcost', cost);
}

tonextpage.addEventListener('click', () => {
  window.location.href = './hotel-results.html';
});
