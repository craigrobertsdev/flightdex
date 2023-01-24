// Initialize all input of type date
var calendars = bulmaCalendar.attach('[type="date"]', {
  isRange: true
});

// Loop on each calendar initialized
for(var i = 0; i < calendars.length; i++) {
	// Add listener to select event
	calendars[i].on('select', date => {
		console.log(date.data.value());
		localStorage.setItem("date",date.data.value())
    console.log(date.data.startDate)
	});
}

// To access to bulmaCalendar instance of an element
var element = document.querySelector('#my-element');
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', function(datepicker) {
		console.log(datepicker.data.value());
	});
}