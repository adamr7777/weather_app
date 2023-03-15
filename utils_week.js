
export {refreshForecastHourlyHandle, refreshForecastWeeklyHandle, renderWeek};
import {getLatlong} from './utils_today.js'
import {cookieArray} from './fortune_cookie_data.js'


function getQuote() {
    // const now = new Date();
    // const nowDate = parseInt(`this is date:${now.getMonth()}${now.getDate()}`)
    // let array = [];
    
    // array.push({quote: data[0].quote, date: nowDate})
    
//    0 - 29
    let cookie;

    if (localStorage.getItem('reducedCookieArray')) {
        let reducedCookieArray = JSON.parse(localStorage.getItem('reducedCookieArray'));
       
        if (reducedCookieArray.length === 0) {
            reducedCookieArray = JSON.parse(localStorage.getItem('originalCookieArray'))
            const randomNum = Math.floor(Math.random() * reducedCookieArray.length);
            cookie = reducedCookieArray.splice(randomNum, 1)[0];
            localStorage.setItem('reducedCookieArray', JSON.stringify(reducedCookieArray));
        }
        else {
            const randomNum = Math.floor(Math.random() * reducedCookieArray.length);
            cookie = reducedCookieArray.splice(randomNum, 1)[0];
            localStorage.setItem('reducedCookieArray', JSON.stringify(reducedCookieArray));
        }
        
        
    }

    else {
        localStorage.setItem('originalCookieArray', JSON.stringify(cookieArray));
        const randomNum = Math.floor(Math.random() * cookieArray.length);
        cookie = cookieArray.splice(randomNum, 1)[0];
        localStorage.setItem('reducedCookieArray', JSON.stringify(cookieArray));
    }

    
    // console.log(cookie);
    // let array1 = [];
    // const array2 = [1, 2, 3];
    // array1 = array2;
    // console.log(array1);

    
    
    
    
 
    
    return cookie;
}



async function getWeatherForecastData() {
    const location = getLatlong();   /*for the safe version remove await */
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location[0]}&lon=${location[1]}&appid=df933d2878900bdaa697768d49d7372e&units=metric`)
    const data = await response.json();
    // const nightForecast = data.list.filter((item)=> {
    //     const time = item.dt_txt.slice(-8);
    //     switch(time) {
    //         case '00:00:00':
    //             return
    //     }
          
    // })
    const nightForecast = data.list.filter((item)=> {
        const time = item.dt_txt.slice(-8);
        return time === '00:00:00';
         
          
    })

    const dayForecast = data.list.filter((item)=> {
        const time = item.dt_txt.slice(-8);
        return time === '12:00:00';
    })

    // console.log('fourDaysForecastArray:');
    // console.log(nightForecast);

    // const x = array.filter((num)=> {
    //     if (num === 5) 
    // })
    
    // const o = data.list.map((item)=> {
    //     return item.dt_txt;
    // })
    
    // console.log(o);
    // console.log(`night forecast:`);
    // console.log(nightForecast);
    // console.log(`day forecast:`);
    // console.log(dayForecast);
    // console.log(data.list[0]);

    let fourDaysForecastArray = [];
    for(let night of nightForecast) {
        for(let day of dayForecast) {
            if (night.dt_txt.slice(0, 10) === day.dt_txt.slice(0, 10)) {
                const dayIcon = day.weather[0].icon;
                const nightIcon = night.weather[0].icon;
                const now = new Date();
                const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const tomorrowDate = now.getDate() + 1;
                // const tomorrowDay = weekDays[now.getDay() + 1];
                // console.log(tomorrowDate);
                let index = tomorrowDate === parseInt(day.dt_txt.slice(8, 10))? 'Tomorrow': 
                    tomorrowDate === parseInt(day.dt_txt.slice(8, 10)) - 1? now.getDay() + 2:
                    tomorrowDate === parseInt(day.dt_txt.slice(8, 10)) - 2? now.getDay() + 3:
                    now.getDay() + 4;
                
                

                
                // if (num === 7) num = 0;
                // if (num === 8) num = 1;
                // if (num === 9) num = 2;
                if (index > 6) index = index -7
                
                let dayOfWeek = weekDays[index];
                if (index=== 'Tomorrow') dayOfWeek = 'Tomorrow';

                fourDaysForecastArray.push({
                    dayTemp: day.main.temp, 
                    nightTemp: night.main.temp, 
                    dayIcon: dayIcon, 
                    nightIcon: nightIcon, 
                    dayDate: day.dt_txt, 
                    weekDay: dayOfWeek,
                    nightDate: night.dt_txt,
                    humidity: day.main.humidity
                });
            }
        }
    }
    
    // console.log(fourDaysForecastArray);
    if (fourDaysForecastArray.length > 4) fourDaysForecastArray.pop();
    // console.log(fourDaysForecastArray);
    return {every3Hour: data.list.slice(0,3), fourDays: fourDaysForecastArray};
}



async function getForecastHourlyHtml() {
    const weatherForecastObject = await getWeatherForecastData();
    // console.log(weatherForecastObject);
    return weatherForecastObject.every3Hour.map((item)=> {
        return `
            <div class='hourly-forecast-div'>
                <h4>${item.dt_txt.slice(10, -3)}</h4>
                <img src='http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png'/>
                <h4>${Math.round(item.main.temp)}°</h4>
                <h4>💧${item.main.humidity}%</h4>
            </div>`
    }).join('');
}


async function getForecastWeeklyHtml() {
    const weatherForeCastObject = await getWeatherForecastData();
    console.log(weatherForeCastObject.fourDays);                 /*important, check the date at all times */
    return weatherForeCastObject.fourDays.map((item)=> {
        return `
            <div class='day-div'>
                <h4>${item.weekDay}</h4>
                <h4>💧${item.humidity}%</h4>
                <div>
                    <img src='http://openweathermap.org/img/wn/${item.dayIcon}@2x.png'/>
                    <img src='http://openweathermap.org/img/wn/${item.nightIcon}@2x.png'/>
                </div>
                <div class='temp-div'>
                    <h4>${Math.round(item.dayTemp)}° /</h4>
                    <h4 class='night-temp'>${Math.round(item.nightTemp)}°</h4>
                </div>
            </div>`
    }).join('');
}

async function refreshForecastHourlyHandle() {
    document.getElementById('forecast-h-div')
        .classList.add('blink');
    const removeBlink = setTimeout(()=> {
        document.getElementById('forecast-h-div')
            .classList.remove('blink');
    }, 500)
    await renderWeek();
}


async function refreshForecastWeeklyHandle() {
    document.getElementById('forecast-d-div')
        .classList.add('blink');
    const removeBlink = setTimeout(()=> {
        document.getElementById('forecast-d-div')
            .classList.remove('blink');
    }, 500)
    await renderWeek();
}


async function renderWeek() {
    const quoteText = getQuote();
    // console.log(quoteText);
    const forecastHourlyHtml = await getForecastHourlyHtml();
    const forecastWeeklyHtml = await getForecastWeeklyHtml();
    // const ForecastWeeklyHtml
    document.getElementById('big-div')
        .innerHTML = `
        <div class='week-main-div' id='week-main-div'>
            <div class='quote-div' id='quote-div'>
                <p class='discription'>Here's a fortune cookie for today:</p>
                <h4 class='quote'>${quoteText}</h4>
            </div>
            <div class='forecast-h-div' id='forecast-h-div'>
                ${forecastHourlyHtml}
                <button class='weather-refresh' id='forecast-h-refresh'>⟳</button>
            </div>
            <div class='forecast-d-div' id='forecast-d-div'>
                ${forecastWeeklyHtml} 
                <button class='weather-refresh' id='forecast-d-refresh'>⟳</button>
            </div>
        </div>`
}

