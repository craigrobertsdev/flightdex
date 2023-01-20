import Geohash from 'https://cdn.jsdelivr.net/npm/latlon-geohash@2.0.0';

// Example API call   'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=Rokm7oUpGBonFqFDXXiA7tcSkqAaiQh4';
// &apikey=Rokm7oUpGBonFqFDXXiA7tcSkqAaiQh4
// expected query string format: ?lat={laitude}&long={longitude}&arrival={arrivalDate}&departure={departureDate}

/* 
  When the user selects their flights, then they are presented with a list of events for their destination location
  The list is divided by date for each day they are there
  Each day is subdivied into event category and is able to be sorted by cost and distance from location (using Maps API)
*/

const resultsSection = $('#results');
const queryString = '?lat=41.881832&long=-87.623177&arrival=2023-02-25&departure=2023-03-15'.split(
  '&'
);

const latitude = queryString[0].split('=')[1];
const longitude = queryString[1].split('=')[1];
const arrivalDate = queryString[2].split('=')[1];
const departureDate = queryString[3].split('=')[1];

const geoHash = Geohash.encode(latitude, longitude, 6);

// Radius from accommodation location. Can be set by the user as part of form submission
let radius = 30;

// data from API query
let resultData;

const requestUrl = `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geoHash}&radius=${radius}&startDateTime=${arrivalDate}T00:00:00Z&endDateTime=${departureDate}T00:00:00Z&apikey=Rokm7oUpGBonFqFDXXiA7tcSkqAaiQh4`;
function getEvents() {
  // event.preventDefault();

  fetch(requestUrl)
    .then((response) => {
      // if fetch request successful, return response in JSON format
      if (response.ok) {
        return response.json();
      }
    })
    // save response data for future use
    .then((data) => {
      resultData = data;
      console.log(resultData);
      displayResults();
    })
    .catch((reason) => {
      console.log('There was an error in processing the request: ' + reason);
    });

  console.log(resultData);
}

function displayResults() {
  for (let i = 0; i < 10; i++) {
    // const eventName = resultData._embedded.events[i].name;
    // const startDate = resultData._embedded.events[i].dates.start.localDate;
    // const startTime = resultData._embedded.events[i].dates.start.localTime;
    // const priceRangeMin = resultData._embedded.events[i].priceRanges[0].min;
    // const genre = resultData._embedded.events[i].classifications[0].genre.name;
    // const eventUrl = resultData._embedded.events[i].url;

    // Test data to develop with without repeated API calls
    const eventName = 'Hockey game';
    const startDate = '15/03/2023';
    const startTime = '12:00pm';
    const priceRangeMin = '$50';
    const genre = 'Hockey';
    const eventUrl = 'http://ticketmaster.com';

    const eventHeaderEl = $('<p></p>').text(eventName).addClass('header');
    const dateTimeEl = $('<p></p>').addClass('date-time');
    const startDateEl = $('<span></span>').text('Date: ' + startDate);
    const startTimeEl = $('<span></span>').text('Time: ' + startTime);
    $(dateTimeEl).append(startDateEl, startTimeEl);

    const priceRangeEl = $('<p></p>')
      .text('Tickets from $' + priceRangeMin)
      .addClass('price-range');

    const genreEl = $('<p></p>').text(genre).addClass('genre');
    const eventUrlEl = $('<a></a>')
      .attr('href', eventUrl)
      .attr('target', '_blank')
      .text('Link to event booking')
      .addClass('link');

    $('#results').append(eventHeaderEl, dateTimeEl, priceRangeEl, genreEl, eventUrlEl);
  }
}

getEvents();
