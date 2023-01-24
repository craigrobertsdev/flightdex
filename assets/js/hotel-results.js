var amadeus = ''

async function tokenFunction() {
    let response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token',{
        headers: {
            "Content-Type":" application/x-www-form-urlencoded"
        },
        method: 'POST',
        body: "grant_type=client_credentials&client_id=BrtG02hEbIco7uiyR3DRJAvGMMtMHVbe&client_secret=piDWDBPQ5cjMQOdm"     
    })
    
        console.log(response.status)
        console.log(response)
    
        cityCoordinates('ADL')
    
}

//https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR


async function cityCoordinates(city){
    console.log(city)
    var hotelData = 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=' + city
    console.log(hotelData)


    let response = await fetch(hotelData)
    
    console.log(response.ok)
    if(!response.ok){
        console.log(response)
        return
    }

    response = await response.json()
    console.log(response)
}

tokenFunction()