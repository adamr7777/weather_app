
export {getTime, getLatlong, getWeatherData, renderTodayWeather, updateInfo, checkDay, getRenderImg, 
    refreshWeatherHandle, todayHandle};


function getTime() {
    const date = new Date;
    const hours = date.getHours() < 10? `0${date.getHours()}`: date.getHours();
    const minutes = date.getMinutes() < 10? `0${date.getMinutes()}`: date.getMinutes();
    const seconds = date.getSeconds() < 10? `0${date.getSeconds()}`: date.getSeconds();
    return {
        time: `${hours}:${minutes}:${seconds}`,
        hours: hours
    }
        
}

function checkDay() {
    const hours = getTime().hours;
    // console.log(hours);
    return hours >= 6 && hours < 12? 'morning': hours >= 12 && hours < 18? 'day': hours >= 18 && hours < 23? 'evening': 'night';
}



/*async*/ function getLatlong() {     
    // const position = await new Promise((resolve, reject)=> {                /*comment all out, remove async  */
    //     navigator.geolocation.getCurrentPosition(resolve,reject)
    // });
    // return [position.coords.latitude, position.coords.longitude];       
    return [51.50722, -0.1275]                   /*for the safe version */
}



async function getWeatherData() {
    const location = /*await*/ getLatlong();  /*fro the safe version remove await */
   
    const response = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&units=metric`);
    const data = await response.json();         /*catch error */
    // console.log(data)
    // console.log(data.weather[0].description);
    const iconString = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    // console.log(data);
    return [Math.round(data.main.temp), iconString, data.name, data.weather[0].description];
}


async function renderTodayWeather() {
    const timeData = getTime();
    const weatherData = await getWeatherData();
    
    const mainHtml = new Array(2).fill('0')     /*----why all this trouble though */
        .map((item, index)=> index === 0? 
        `<h1 id='time' class='time'>${timeData.time}</h1>`:
        `<div class='loc-weather' id='loc-weather'>
            <h2 class='loc-text'>${weatherData[2]}</h2>
            <div class='weather-cont'>
            <img id='weather-img' class='weather-img' src='${weatherData[1]}'/>
            <h2 id='weather-text'>${weatherData[0]}°</h2>
            <button class='weather-refresh' id='weather-refresh'>⟳</button>
        </div>
        </div>`).join('');

        document.getElementById('main-cont').innerHTML = mainHtml;
}


async function getRenderImg() {
    const api = 'https://api.unsplash.com/'  /*photos/?client_id=YOUR_ACCESS_KEY */ /*/photos/random */
    const weatherData = await getWeatherData();
    const timeOfDay = checkDay();
    const randomImg = `https://api.unsplash.com/photos/random/`         //until confirmed your acc, use scrimba api
    const key = '&client_id=XYMe11wvf2H6WeG3VzMj5QFbkZlplD0WCK2BCYPGIfI'
    const topic = `?query=${weatherData[3]},${timeOfDay},nature&orientation=portrait`
    const response = await fetch(randomImg + topic + key);
    const data = await response.json();
    
    document.getElementById('img-cont').innerHTML = `<img class='img' src='${data.urls.regular}'/>`
    document.getElementById('author-pic').textContent = `by ${data.user.first_name} ${data.user.last_name}`
};


async function refreshWeatherHandle() {
    const weatherData = await getWeatherData(); 
    document.getElementById('loc-weather')
        .classList.add('blink');
    const removeBlink = setTimeout(()=> {
        document.getElementById('loc-weather')
            .classList.remove('blink');
    }, 500)
    document.getElementById('weather-text')
        .textContent = weatherData[0]; 
    document.getElementById('weather-img')
        .src = weatherData[1];
}


function todayHandle() {
    document.getElementById('btn-today').disabled = true;
    document.getElementById('btn-week').disabled = false;
    document.getElementById('big-div').innerHTML = `
    <div class='main-cont' id='main-cont'></div>
    <div class='img-cont' id='img-cont'></div>
    <button class='refresh-btn' id='refresh-btn' >Refresh</button>
    <p class='author-pic' id='author-pic'></p>`;
}



async function updateInfo() {
    const weatherData = await getWeatherData(); 

    const updateTime = setInterval(()=> {
        if(document.getElementById('time')) {
            document.getElementById('time')
                .textContent = getTime().time;
        }
    }, 1000)  

    const updateWeather = setInterval(()=> {
        document.getElementById('weather-text')
            .textContent = weatherData[0];  
       
        document.getElementById('weather-img')
            .src = weatherData[1];
        // console.log('working');
            
    }, 900000) /*15min 90000 */

    const updateImg = setInterval(()=>{
        getRenderImg();
    }, 900000) /*15min 900000 */

    const updateForecast = setInterval(()=>{
        renderWeek();
    },3600000)      /*1h 3600000*/      /*perhaps set it to 0.5hs*/

} 




