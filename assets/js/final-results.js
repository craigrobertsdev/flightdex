var arrivalCity = localStorage.getItem('arrivalcityname')
var departureCity = localStorage.getItem('departurecityname')
var arrivalDate = localStorage.getItem('departureDate')
var departureDate = localStorage.getItem('arrivalDate')
var leaveDepart = localStorage.getItem('ONEWAYdeparttime')
var leaveArrive = localStorage.getItem('ONEWAYarrivaltime')
var returnDepart = localStorage.getItem('RETURNdeparttime')
var returnArrive = localStorage.getItem('RETURNarrivaltime')
var leaveCost = localStorage.getItem('ONEWAYcost')
var returnCost = localStorage.getItem('RETURNcost')
var wayValue = localStorage.getItem('WAYvalue')
var passenger = localStorage.getItem('PASSENAGERvalue')
var hotelName = localStorage.getItem('hotelName')
var hotelCost = localStorage.getItem('hotelCost')
var hotelTotalCost = ''
var flightTotalCost = ''
//var eventName = localStorage.getItem('')
//var eventCost = localStorage.getItem('')

arrivalCityChange = arrivalCity.toLowerCase()
arrivalCity = (arrivalCityChange[0].toUpperCase() + arrivalCityChange.substring(1))

departureCityChange = departureCity.toLowerCase()
departureCity = (departureCityChange[0].toUpperCase() + departureCityChange.substring(1))


function inputData(){
    CityInput = document.createElement('p')
    CityInput.innerHTML = (departureCity + '  to  ' + arrivalCity)
    document.getElementById('p1').appendChild(CityInput)

    var dateChangeA = arrivalDate.split('-')
    //console.log(dateChangeA)
    var changedArrivalDate = (dateChangeA[2] + '-' +dateChangeA[1] + '-' + dateChangeA[0])
    //console.log(changedArrivalDate)

    var dateChangeD = departureDate.split('-')
    //console.log(dateChangeD)
    var changedDepartureDate = (dateChangeD[2] + '-' +dateChangeD[1] + '-' + dateChangeD[0])
    //console.log(changedDepartureDate)

    leaveDepartTime = leaveDepart.split(' - ')
    leaveDepartTime = (leaveDepartTime[1])

    leaveArriveTime = leaveArrive.split(' - ')
    leaveArriveTime = (leaveArriveTime[1])
    
    leaveDateInput = document.createElement('p')
    leaveDateInput.innerHTML = (changedArrivalDate + ' At ' + leaveDepartTime + '<br>And Arrive at ' + leaveArriveTime)
    document.getElementById('p2').appendChild(leaveDateInput)

    leaveCostValue = leaveCost.split(' ')
    leaveTotalCost = Number(leaveCostValue[0])
    flightTotalCost = leaveTotalCost

    leaveCost = document.createElement('p')
    leaveCost.innerHTML = ('Total cost of flight to ' + arrivalCity + ' = $' + leaveTotalCost)
    document.getElementById('p6').appendChild(leaveCost)


    if(wayValue == 'ONEWAY'){
        const returnElement = document.getElementById('p3')
        returnElement.remove()
    }else{
        returnDepartTime = returnDepart.split(' - ')
        returnDepartTime = (returnDepartTime[1])

        returnArriveTime = returnArrive.split(' - ')
        returnArriveTime = (returnArriveTime[1])


        returnDateInput = document.createElement('p')
        returnDateInput.innerHTML = (changedDepartureDate + ' At ' + returnDepartTime + '<br>And Arrive at ' + returnArriveTime)
        document.getElementById('p3').appendChild(returnDateInput)

        returnCostValue = returnCost.split(' ')
        returnTotalCost = Number(returnCostValue[0])
        //console.log(returnTotalCost)
        flightTotalCost = (returnTotalCost + leaveTotalCost)
        flightTotalCost = flightTotalCost.toFixed(2)
        //console.log(flightTotalCost)
    
        returnCost = document.createElement('p')
        returnCost.innerHTML = ('Total cost of flight to ' + departureCity + ' = $' + returnTotalCost)
        document.getElementById('p6').appendChild(returnCost)

        fTotalCost = document.createElement('p')
        fTotalCost.innerHTML = ('Total cost of flights = $' + flightTotalCost)
        document.getElementById('p6').appendChild(fTotalCost)
    }

    hotelFunction()

    bookButton = document.createElement('button')
    bookButton.innerHTML = ('Book Now!')
    document.getElementById('resultChild').appendChild(bookButton)

    homeButton = document.createElement('button')
    homeButton.innerHTML = ('Home')
    document.getElementById('resultChild').appendChild(homeButton)

    homeButton.addEventListener('click', button);
}

function hotelFunction(){
    //console.log(hotelName)
    if(hotelName == null){
        const hotelElement = document.getElementById('p4')
        hotelElement.remove()
    }else{

        hotel = document.createElement('p')
        hotel.innerHTML = (hotelName)
        document.getElementById('p4').appendChild(hotel)

        hotelCostValue = hotelCost.split(' ')
        hotelTotalCost = Number(hotelCostValue[0])

        hotelCost = document.createElement('p')
        hotelCost.innerHTML = ('Total cost of Hotel = $' + hotelTotalCost)
        document.getElementById('p6').appendChild(hotelCost)
    }
    //eventFunction()
    finalTotal()
}

//function eventFunction(){
//    if( == null){
//        const eventElement = document.getElementById('p5')
//        eventElement.remove()
//        return
//    }else{
//
//        hotel = document.createElement('p')
//        hotel.innerHTML = (hotelName)
//        document.getElementById('p4').appendChild(hotel)
//
//        //events!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
//        hotelCostValue = hotelCost.split(' ')
//        hotelTotalCost = Number(hotelCostValue[0])
//
//        hotelCost = document.createElement('p')
//        hotelCost.innerHTML = ('Total cost of Hotel = $' + hotelTotalCost)
//        document.getElementById('p6').appendChild(hotelCost)
//    }
//  finalTotal()
//}

function finalTotal(){
    if( hotelTotalCost == null){
        hotelTotal = 0
    }else{
        hotelTotal = hotelTotalCost
    }

    //if(eventTotalCost == null){
    //    eventTotal = 0
    //}else{
    //    eventTotal = eventTotalCost
    //}

    //console.log(flightTotalCost)
    //console.log(hotelTotalCost)
    //console.log(eventTotalCost)

    var totalCost = +hotelTotalCost + +flightTotalCost
    //console.log(totalCost)

    finalTotalCost = document.createElement('p')
    finalTotalCost.innerHTML = ('Total cost = $' + totalCost)
    document.getElementById('p7').appendChild(finalTotalCost)
}

function button(){
    localStorage.clear()
    location.assign('./index.html')
}

inputData()