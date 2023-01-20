

// This is testAPI
let requestUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2023-05-02&adults=1&nonStop=false&max=250"

fetch(requestUrl,{
    method: 'GET', 
    headers: {accept: "application/vnd.amadeus+json"}, 
    headers: {Authorization: "Bearer 6rvCivQIzbTb5OOZ5pFuju5X18kv"}
})
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log('Fetch Response \n-------------');
  console.log(data);
});

// this will be changed to production API when I get used to it more
// works well 
// will be tested wheather how long it lasts because of access token