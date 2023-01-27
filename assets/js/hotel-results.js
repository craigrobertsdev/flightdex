var results = document.getElementById('results')
var tokenType = ''

var cityCode = localStorage.getItem('arrivalcitycode')
var arrive = localStorage.getItem('departureDate')
var depart = localStorage.getItem('arrivalDate')
//var peopleNo = localStorage.getItem('ADD')

//remove before final!!!!!!!!!!!!!!!!!!!!!!!!
var peopleNo = 1

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
        cityCoordinates(cityCode)
    
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
        iLength = 5
    }



    for(i=0; i < iLength; i++){
        var hotelName = response.data[i].name
        //console.log(hotelName)

        var hotelIdTag = response.data[i].hotelId
        //console.log(hotelIdTag)

        var hotelInfo = 'https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=' + hotelIdTag + '&adults=' + peopleNo //+ '&checkInDate=' + arrive + '&checkOutDate=' + depart + '&currency=AUD&bestRateOnly=true'
        //console.log(hotelInfo)

        let responseTwo = await fetch(hotelInfo,{
            headers: {Authorization: tokenType} 
        })
        
        console.log(responseTwo.ok)
        //if(!responseTwo.ok){
        //    console.log(responseTwo)
        //    return
        //}
        responseTwo = await responseTwo.json()
        console.log(responseTwo)

        


        var listD = document.createElement('div')
        var listP = document.createElement('p') 
        listP.innerHTML = hotelName
        listD.appendChild(listP)
        results.appendChild(listD)
    }

    
}

tokenFunction()