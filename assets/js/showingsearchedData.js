
displayFlightData();

function displayFlightData() {
    let finaldata = JSON.parse(localStorage.getItem('finaldata'));
    const header = document.querySelector('h1');
    header.innerHTML = finaldata.data[0].itineraries[0].segments[0].departure.iataCode+ " ----> " +finaldata.data[0].itineraries[0].segments[0].arrival.iataCode;
    console.log(finaldata);

}