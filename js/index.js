
const searchinput = document.getElementById("search")


if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(pos){
    const lat =(pos.coords.latitude);
    const long =(pos.coords.longitude);
    console.log(lat);
    console.log(long);
    getWeatherData(`${lat} , ${long}`)
  })
}


async function getWeatherData(query){
  let res = await fetch (`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=39f55303fe474fea961211329242006`)

let data =await res.json()
console.log(data);
displayTodayWeather(data)
displayTomerrow(data)
displayAfter(data)

}

searchinput.addEventListener("input" , function(){
  const query = searchinput.value;
  getWeatherData(query)

 
})

function displayTodayWeather(data){
 console.log(data);

 
const todayDate = data.current.last_updated
 let date = new Date(todayDate);


 const todayWeekDay =date.toLocaleString('en-us' , {weekday : 'long'});
 const todayDay = date.getDate();
 const todayMonth = date.toLocaleString("en-us" , {month : "long"})
 const todayDegree = data.current.temp_c 
 const cityName = data.location.name;
 const todayCondition = data.current.condition.text
const humidity = data.current.humidity

 cityToday.innerHTML =  cityName
 todayWeekDayHtml.innerHTML = todayWeekDay 
 dateToday.innerHTML = `${todayDay} , ${todayMonth }`
 tempToday.innerHTML = todayDegree
 todaycond.innerHTML = todayCondition 
 imgToday.setAttribute ('src' , data.current.condition.icon)
 humidityToday.innerHTML = humidity
 windspeedToday.innerHTML = data.current.wind_kph
 compassToday.innerHTML = data.current.wind_dir

}

function displayTomerrow({forecast}){
  console.log(forecast);

  tomorrowDay.innerHTML = new Date ( forecast.forecastday[1].date).toLocaleString('en-us' , {weekday : 'long'})
  iconTomorrow.setAttribute('src' , forecast.forecastday[1].day.condition.icon ) 

  maxtemp.innerHTML = forecast.forecastday[1].day.maxtemp_c
  mintemp.innerHTML = forecast.forecastday[1].day.mintemp_c  
  console.log();
}

function displayAfter({forecast}){
  

  afterTomerrow.innerHTML = new Date ( forecast.forecastday[2].date).toLocaleString('en-us' , {weekday : 'long'})
  iconAfter.setAttribute('src' , forecast.forecastday[2].day.condition.icon ) 

  aftermaxtemp.innerHTML = forecast.forecastday[2].day.maxtemp_c
  aftermintemp.innerHTML = forecast.forecastday[2].day.mintemp_c  
 
}
