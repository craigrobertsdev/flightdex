import Geohash from 'https://cdn.jsdelivr.net/npm/latlon-geohash@2.0.0';

// Example API call   'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=Rokm7oUpGBonFqFDXXiA7tcSkqAaiQh4';
// &apikey=Rokm7oUpGBonFqFDXXiA7tcSkqAaiQh4
// expected query string format: ?lat={laitude}&long={longitude}&arrival={arrivalDate}&departure={departureDate}

/* 
  When the user selects their flights, then they are presented with a list of events for their destination location
  The list is divided by date for each day they are there
  Each day is subdivied into event category and is able to be sorted by cost and distance from location (using Maps API)
  User has option to enter their location. If they do so, the events will display the distance from them using Leaflet
*/

const resultsSection = $('#results');
const filterOptions = $('#filter-options');
const radiusInput = $('#radius-input');
const keywordInput = $('#keyword-input');
const searchButton = $('#event-search-button');

// test query string
const searchString = '?lat=41.881832&long=-87.623177&arrival=2023-02-25&departure=2023-03-15';
// remove ? from start of searchString
const queryString = searchString.substring(1, searchString.length).split('&'); //location.search

// stores different options for building a query string
const options = {};

const latitude = queryString.find((option) => option.startsWith('lat')).split('=')[1];
const longitude = queryString.find((option) => option.startsWith('long')).split('=')[1];

options.startDateTime = queryString.find((option) => option.startsWith('arrival')).split('=')[1];
options.endDateTime = queryString.find((option) => option.startsWith('departure')).split('=')[1];
options.geoPoint = Geohash.encode(latitude, longitude, 6);

// Default radius to search for from accommodation location. Can be modified by user in radiusInput
options.radius = 30;
// search string to be passed to the API. Built each time a search is to be completed based on user entered data.
let url = buildUrl(options);

// data from API query
let resultData;

// takes an options object, iterates over it and produces a query string that the TicketMaster API accepts.
function buildUrl(options) {
  const urlArr = ['https://app.ticketmaster.com/discovery/v2/events.json?apikey=Rokm7oUpGBonFqFDXXiA7tcSkqAaiQh4&size=200'];

  for (let key in options) {
    urlArr.push('&', key, '=', options[key]);
    // add time value to either start or end time to satisfy API requirement
    if (key === 'endDateTime' || key === 'startDateTime') {
      urlArr.push('T00:00:00Z');
    }
  }

  return urlArr.join('');
}

function getEvents(url) {
  fetch(url)
    .then((response) => {
      // if fetch request successful, return response in JSON format
      if (response.ok) {
        return response.json();
      }
    })
    // save response data for future use
    .then((data) => {
      resultData = data._embedded.events;
      determineEventTypes();
      displayResults(resultData);
    })
    .catch((reason) => {
      console.log(resultData);
      if (!resultData) {
        $(resultsSection).html('There were no results matching your request');
        return;
      }
      console.log('There was an error in processing the request: ' + reason);
    });
}

// clears the current resultData section and displays the currently filtered options
function displayResults(resultData) {
  $(resultsSection).html('');
  for (let i = 0; i < 10; i++) {
    const eventName = resultData[i].name;
    const startDate = resultData[i].dates.start.localDate;
    const startTime = resultData[i].dates.start.localTime;
    const priceRangeMin = resultData[i].priceRanges[0].min;
    const genre = resultData[i].classifications[0].genre.name;
    const eventUrl = resultData[i].url;

    const eventHeaderEl = $('<p></p>').text(eventName).addClass('header');
    const dateTimeEl = $('<p></p>').addClass('date-time');
    const startDateEl = $('<span></span>').text('Date: ' + startDate);
    const startTimeEl = $('<span></span>').text('Time: ' + startTime);
    $(dateTimeEl).append(startDateEl, startTimeEl);

    const priceRangeEl = $('<p></p>')
      .text('Tickets from $' + priceRangeMin)
      .addClass('price-range');

    const genreEl = $('<p></p>')
      .text('Event Type: ' + genre)
      .addClass('genre');
    const eventUrlEl = $('<a></a>').attr('href', eventUrl).attr('target', '_blank').text('Link to event booking').addClass('link');

    $(resultsSection).append(eventHeaderEl, dateTimeEl, priceRangeEl, genreEl, eventUrlEl);
  }
}

// Adds functionality to the filter button to filter displayed results by the user selected event type
$(filterOptions).on('change', function (event) {
  event.preventDefault();
  const eventType = $(filterOptions).val();
  console.log(eventType);
  const filteredOptions = resultData.filter((event) => {
    return event.classifications[0].segment.name === eventType;
  });

  displayResults(filteredOptions);
});

// iterates over result set and determines unique event types before adding them to the filter options dropdown list.
function determineEventTypes() {
  const eventTypes = [];
  for (let i = 0; i < resultData.length; i++) {
    let eventType = resultData[i].classifications[0].segment.name;
    if (!eventTypes.includes(eventType)) {
      eventTypes.push(eventType);
    }
  }

  for (let type of eventTypes) {
    const option = $('<option></option>').val(type).text(type);
    $(filterOptions).append(option);
  }
}

// when user click search button, a new query string is created with currently entered values and data is retrieved from the API
$(searchButton).on('click', function (event) {
  event.preventDefault();
  if ($(radiusInput).val()) {
    // API uses miles but site is built for users who deal in km
    options.radius = convertToMiles($(radiusInput).val());
  }

  if ($(keywordInput.val())) {
    options.keyword = $(keywordInput).val();
  }

  const queryString = buildUrl(options);
  getEvents(queryString);
});

function convertToMiles(km) {
  return Math.floor(km * 0.621371);
}

getEvents(url);
