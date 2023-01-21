// generate new access-token whenever app starts
const TOKENUrl = "https://api.amadeus.com/v1/security/oauth2/token"

fetch(TOKENUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'grant_type=client_credentials&client_id=FgVXIVlEeBmSHOG5GhRdPceveA3CExUw&client_secret=IGDvlEYHGKe0dUiI'
}).then(function (response) {
  return response.json();
})
  .then(function (data) {
    console.log(data);
    console.log(data.access_token);
    getDATA(data);
  });

// fetching data with the new generated access-token
function getDATA(data) {
  let accessToken = data.token_type +" " +data.access_token;
  console.log(accessToken);

  let requestUrl = "https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2023-05-02&adults=1&nonStop=false&max=250"

  fetch(requestUrl, {
    headers: {Authorization: accessToken}
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}