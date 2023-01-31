var arrivalCity = localStorage.getItem('arrivalcityname')
var departureCity = localStorage.getItem('departurecityname')
var arrivalDate = localStorage.getItem('departureDate')
var departureDate = localStorage.getItem('arrivalDate')
var wayValue = localStorage.getItem('WAYvalue')
//var leavingCost = localStorage.getItem('')
//var returnCost = localStorage.getItem('')
var passenger = localStorage.getItem('PASSENAGERvalue')
var hotelName = localStorage.getItem('hotelName')
var hotelCost = localStorage.getItem('hotelCost')
//var eventName = localStorage.getItem('')
//var eventCost = localStorage.getItem('')

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
    
    leaveDateInput = document.createElement('p')
    leaveDateInput.innerHTML = (changedArrivalDate)
    document.getElementById('p2').appendChild(leaveDateInput)

    if(wayValue == 'ONEWAY'){
        const returnElement = document.getElementById('p3')
        hotelElement.remove()
        return
    }else{

    returnDateInput = document.createElement('p')
    returnDateInput.innerHTML = (changedDepartureDate)
    document.getElementById('p3').appendChild(returnDateInput)
    }
    
    bookButton = document.createElement('button')
    bookButton.innerHTML = ('Book Now!')
    document.getElementById('resultChild').appendChild(bookButton)

    homeButton = document.createElement('button')
    homeButton.innerHTML = ('Home')
    document.getElementById('resultChild').appendChild(homeButton)

    homeButton.addEventListener('click', button);

    hotelFunction()
}

function hotelFunction(){
    console.log(hotelName)
    if(hotelName == null){
        const hotelElement = document.getElementById('p4')
        hotelElement.remove()
        return
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
    eventFunction()
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
//}

function button(){
    localStorage.clear()
    location.assign('./index.html')
}

inputData()