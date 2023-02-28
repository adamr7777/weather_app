
function getTime() {
    const date = new Date;
    const hours = date.getHours() < 10? `0${date.getHours()}`: date.getHours();
    const minutes = date.getMinutes() < 10? `0${date.getMinutes()}`: date.getMinutes();
    const seconds = date.getSeconds() < 10? `0${date.getSeconds()}`: date.getSeconds();
    return `${hours}:${minutes}:${seconds}`
}

async function getLatlong() {
    const position = await new Promise((resolve, reject)=> {
        navigator.geolocation.getCurrentPosition(resolve,reject)
    });
    return [position.coords.latitude, position.coords.longitude]
}


async function getWeatherData() {
    const location = await getLatlong();
   
    const response = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&units=metric`);
    const data = await response.json();         /*catch error */

    const iconString = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    return [Math.round(data.main.temp), iconString, data.name];
}


async function renderTodayWeather() {
    const time = getTime();
    const weatherData = await getWeatherData();
    
    const mainHtml = new Array(2).fill('0')     /*----why all this trouble though */
        .map((item, index)=> index === 0? `<p id='time'>${time}</p>`:
        `<div class='loc-weather'><p class='loc-text'>${weatherData[2]}</p>
        <div class='weather-cont'><img id='weather-img' class='weather-img' src='${weatherData[1]}'/><p id='weather-text'>${weatherData[0]}</p></div></div>`).join('');

        document.getElementById('main-cont').innerHTML = mainHtml;
}




async function updateInfo() {
    const weatherData = await getWeatherData(); 
    
    const updateTime = setInterval(()=> {
        document.getElementById('time')
            .textContent = getTime(); 
    }, 1000)  

    const updateWeather = setInterval(()=> {
        document.getElementById('weather-text')
            .textContent = weatherData[0];  
       
        document.getElementById('weather-img')
            .src = weatherData[1];
        console.log('working');
            
    }, 90000) /*15min 90000 */
} 







document.addEventListener('click', (event)=> {
    if (event.target.id === 'btn-today') {
        renderTodayWeather();
        
        //original place for updateInfo()
    }
})

updateInfo(); /*move to the event listener */
renderTodayWeather();           /*for convenience, later delete*/