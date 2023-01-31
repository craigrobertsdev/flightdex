import Geohash from './geohash.js';

// Example API call   'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=Rokm7oUpGBonFqFDXXiA7tcSkqAaiQh4';
// apikey=Rokm7oUpGBonFqFDXXiA7tcSkqAaiQh4
// expected query string format: ?lat={laitude}&long={longitude}&arrival={arrivalDate}&departure={departureDate}

/* 
  When the user selects their flights, then they are presented with a list of events for their destination location
  The list is divided by date for each day they are there
  Each day is subdivied into event category and is able to be sorted by cost and distance from location (using Maps API)
  User has option to enter their location. If they do so, the events will display the distance from them using Leaflet
*/

const titleText = $('#title');
const resultsSection = $('#results');
const filterOptions = $('#filter-options');
const radiusInput = $('#radius-input');
const keywordInput = $('#keyword-input');
const searchButton = $('#event-search-button');
const startDateInput = $('#start-date');
const endDateInput = $('#end-date');
const bookingBtn = $('#complete-booking');
const location = localStorage.getItem('arrivalcityname');
const [latitude, longitude] = await getLatLong(location);
let selectedEvent;
// stores different options for building a query string
const options = {};

options.startDateTime = localStorage.getItem('departureDate');
options.endDateTime = localStorage.getItem('arrivalDate');
options.geoPoint = Geohash.encode(latitude, longitude, 8);

// Default radius to search for from accommodation location. Can be modified by user in radiusInput
options.radius = 30;
// search string to be passed to the API. Built each time a search is to be completed based on user entered data.
let url = buildUrl(options);
// data from API query
let resultData;

$(titleText).text(`Showing events within ${options.radius}km of ${toTitleCase(location)}`);
$(resultsSection).on('click', '.event-card', handleSelectedEvent);
$('#continue').on('click', completeBooking);

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

async function getLatLong(location) {
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=7d23a37898f652dad9213e544cd70c75`);
  const data = await response.json();
  return [data[0].lat, data[0].lon];
}

function getEvents(url) {
  console.log(url);
  fetch(url)
    .then((response) => {
      // if fetch request successful, return response in JSON format
      if (response.ok) {
        return response.json();
      }
    })
    // save response data for future use
    .then((data) => {
      // if there are no search results, throw an error
      if (!data._embedded) {
        resultData = null;
        throw new Error();
      }
      resultData = data._embedded.events;

      determineEventTypes();
      displayResults(resultData);
    })
    .catch((reason) => {
      if (!resultData) {
        $(resultsSection).html('There were no results matching your request');
        return;
      }
      console.log('There was an error in processing the request: ' + reason);
    });
}

// clears the current resultData section and displays the currently filtered options
function displayResults(resultData) {
  $(titleText).text(`Showing events within ${options.radius}km of ${toTitleCase(location)}`);
  $(resultsSection).html('');
  // replace the event results header after clearing all html
  $(resultsSection).append($('<p class="has-text-weight-bold">Event Results</p>'));

  const iterations = resultData.length > 10 ? 10 : resultData.length;

  for (let i = 0; i < iterations; i++) {
    const eventCard = $(`<div class="event-card" id=event${i + 1}></div>`);
    const eventName = resultData[i].name;
    const startDate = resultData[i].dates.start.localDate;
    const startTime = resultData[i].dates.start.localTime;
    const priceRangeMin = resultData[i].priceRanges ? '$' + resultData[i].priceRanges[0].min.toFixed(2) : 'See venue page for ticket prices';
    const genre = resultData[i].classifications[0].genre?.name ? resultData[i].classifications[0].genre.name : 'Miscellaneous';
    const eventUrl = resultData[i].url;

    const eventHeaderEl = $('<p></p>').text(eventName).addClass('header');
    const dateTimeEl = $('<p></p>').addClass('date-time');
    const startDateEl = $('<span></span>')
      .text('Date: ' + startDate)
      .addClass('start-event');
    const startTimeEl = $('<span></span>')
      .text('Time: ' + startTime)
      .addClass('end-event');
    $(dateTimeEl).append(startDateEl, startTimeEl);

    const priceRangeEl = $('<p></p>')
      .text('Tickets from: ' + priceRangeMin)
      .addClass('price-range');

    const genreEl = $('<p></p>')
      .text('Event Type: ' + genre)
      .addClass('genre');
    const eventUrlEl = $('<a></a>').attr('href', eventUrl).attr('target', '_blank').text('Link to event booking').addClass('link');

    $(eventCard).append(eventHeaderEl, dateTimeEl, priceRangeEl, genreEl, eventUrlEl);
    $(resultsSection).append(eventCard);
  }
}

// Adds functionality to the filter button to filter displayed results by the user selected event type
$(filterOptions).on('change', function (event) {
  event.preventDefault();
  const eventType = $(filterOptions).val();
  const filteredOptions = resultData.filter((event) => {
    if (eventType === 'all') {
      return true;
    }
    return event.classifications[0].segment.name === eventType;
  });

  displayResults(filteredOptions);
});

// iterates over result set and determines unique event types before adding them to the filter options dropdown list.
function determineEventTypes() {
  // clear previous event types
  $(filterOptions).html('');
  const eventTypes = [];
  for (let i = 0; i < resultData.length; i++) {
    let eventType = resultData[i].classifications[0].segment.name;
    if (eventType !== 'Undefined' && !eventTypes.includes(eventType)) {
      eventTypes.push(eventType);
    }
  }
  const allOption = $('<option></option>').val('all').text('All');
  $(filterOptions).append(allOption);
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
    options.radius = $(radiusInput).val();
  }

  if ($(keywordInput).val()) {
    options.keyword = $(keywordInput).val();
  }

  if ($(startDateInput).val()) {
    options.startDateTime = $(startDateInput).val();
  }

  if ($(endDateInput).val()) {
    options.endDateTime = $(endDateInput).val();
  }

  const queryString = buildUrl(options);
  getEvents(queryString);
  determineEventTypes();
});

// converts data stored in local storage to title case rather than all uppercase
function toTitleCase(inputString) {
  inputString = inputString.toLowerCase();
  const stringArr = inputString.split(' ');
  return stringArr
    .map((word) => {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
}

function handleSelectedEvent(event) {
  if ($(selectedEvent).attr('id') === $(event.target).parent('div').attr('id')) {
    console.log($(event.target).parent('div'));
    $(selectedEvent).removeClass('selected');
    selectedEvent === null;
    changeConfirmButtonText(false);
    localStorage.removeItem('eventData');
  } else {
    $(selectedEvent).removeClass('selected');
    selectedEvent = $(event.target).parent('div');
    $(selectedEvent).addClass('selected');
    changeConfirmButtonText(true);
    setSelectedEvent();
  }
}

function setSelectedEvent() {
  const eventName = $(selectedEvent).find('.header').text();
  let eventPrice = $(selectedEvent).find('.price-range').text();
  eventPrice = eventPrice.split(' ')[2];
  if (eventPrice.startsWith('See')) {
    eventPrice = null;
  }
  const eventDate = $(selectedEvent).find('.start-event').text();
  const eventTime = $(selectedEvent).find('.end-event').text();
  const eventData = { eventName: eventName, eventPrice: eventPrice, eventDate: eventDate, eventTime: eventTime };
  if (eventPrice) {
    eventData.eventPrice = eventPrice;
  }
  localStorage.setItem('eventData', JSON.stringify(eventData));
}

function changeConfirmButtonText(flightSelected) {
  const button = $('#continue');
  if (flightSelected) {
    $(button).text('Finalise booking');
  } else {
    $(button).text('Skip event selection');
  }
}

function completeBooking(event) {
  window.location.href = './final-results.html';
}

getEvents(url);
