var results = document.getElementById('results')
var tokenType = ''


async function tokenFunction() {
    let response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token',{
        headers: {
            "Content-Type":" application/x-www-form-urlencoded"
        },
        method: 'POST',
        body: "grant_type=client_credentials&client_id=BrtG02hEbIco7uiyR3DRJAvGMMtMHVbe&client_secret=piDWDBPQ5cjMQOdm"     
    })
        console.log(response.status)
        response = await response.json()
        console.log(response)
        var token = response.access_token
        console.log(token)
        tokenType = ('Bearer ' + token)
        console.log(tokenType)
        cityCoordinates('ADL')
    
}

async function cityCoordinates(city){
    console.log(city)
    var hotelData = 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=' + city
    console.log(hotelData)

    let response = await fetch(hotelData,{
        headers: {Authorization: tokenType} 
    })
    
    console.log(response.ok)
    if(!response.ok){
        console.log(response)
        return
    }

    response = await response.json()
    console.log(response)
    console.log(response.data.length)
    if(response.data.length < 50){
    var iLength = response.data.length
    }else{
        iLength = 50
    }

    for(i=0; i < iLength; i++){
        var hotelName = response.data[i].name
        console.log(hotelName)
        var listI = document.createElement('li')
        listI.innerHTML = hotelName
        results.appendChild(listI)
    }

    
}

tokenFunction()