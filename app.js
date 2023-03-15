
import {renderTodayWeather, updateInfo, getRenderImg, refreshWeatherHandle, todayHandle} from './utils_today.js';
import {refreshForecastHourlyHandle, refreshForecastWeeklyHandle, renderWeek} from './utils_week.js';



// bring back the main 3 functions from utils.js 







// console.log(checkDay());


(function mainLoop() {
    const btnToday = document.getElementById('btn-today');
    btnToday.disabled = true;
    // let isWeekActive = false;

 
    
    document.addEventListener('click', (event)=> {
        if (event.target.id === 'btn-today') {
            todayHandle();
            renderTodayWeather();
            getRenderImg();
            
            //original place for updateInfo()
        }

        if (event.target.id === 'btn-week') {
            
            // document.getElementById('main-cont').innerHTML = `<h1>Coming soon!</h1>`
            document.getElementById('btn-today').disabled = false;
            document.getElementById('btn-week').disabled = true;
            // isWeekActive = true;
            // console.log(isWeekActive);
            document.getElementById('big-div').innerHTML = `            
            `;                                                          /*perhaps delete */
            renderWeek();
        }

      

        if (event.target.id === 'refresh-btn') getRenderImg();
        
        
        if(event.target.id === 'weather-refresh') refreshWeatherHandle();

        if (event.target.id === 'forecast-h-refresh') refreshForecastHourlyHandle();

        if (event.target.id === 'forecast-d-refresh') refreshForecastWeeklyHandle()
        
    });

    
        updateInfo(); /*move to the event listener */
        renderTodayWeather();           /*for convenience, later delete*/
        getRenderImg();
})();




(function animateCircle(){
    let mouseOver = false;

    document.addEventListener('mouseover', (event)=> {
        if(event.target.id === 'weather-refresh') {
            mouseOver = true;

            const refreshWeatherBtn = document.getElementById('weather-refresh');
            
            refreshWeatherBtn.textContent = '↻';
            
            const refreshAnimation1 = setTimeout(()=> {            /*for pc setInterval()*/
                if (mouseOver === false) clearInterval(refreshAnimation1)
                refreshWeatherBtn.textContent = '⟳';
            }, 500)
        
            const refreshAnimation2 = setTimeout(()=> {            /*for pc setInterval()*/
                if (mouseOver === false) clearInterval(refreshAnimation2)
                refreshWeatherBtn.textContent = '↻';
            }, 1000)
        }

        if(event.target.id === 'forecast-h-refresh') {
            mouseOver = true;

            const refreshWeatherBtn = document.getElementById('forecast-h-refresh');
            
            refreshWeatherBtn.textContent = '↻';
            
            const refreshAnimation1 = setTimeout(()=> {            /*for pc setInterval()*/
                if (mouseOver === false) clearInterval(refreshAnimation1)
                refreshWeatherBtn.textContent = '⟳';
            }, 500)
        
            const refreshAnimation2 = setTimeout(()=> {            /*for pc setInterval()*/
                if (mouseOver === false) clearInterval(refreshAnimation2)
                refreshWeatherBtn.textContent = '↻';
            }, 1000)
        }

        if(event.target.id === 'forecast-d-refresh') {
            mouseOver = true;

            const refreshWeatherBtn = document.getElementById('forecast-d-refresh');
            
            refreshWeatherBtn.textContent = '↻';
            
            const refreshAnimation1 = setTimeout(()=> {            /*for pc setInterval()*/
                if (mouseOver === false) clearInterval(refreshAnimation1)
                refreshWeatherBtn.textContent = '⟳';
            }, 500)
        
            const refreshAnimation2 = setTimeout(()=> {            /*for pc setInterval()*/
                if (mouseOver === false) clearInterval(refreshAnimation2)
                refreshWeatherBtn.textContent = '↻';
            }, 1000)
        }

        

    });

    document.addEventListener('mouseout', (event)=> {
        if(event.target.id === 'weather-refresh') mouseOver = false;

        if(event.target.id === 'forecast-h-refresh') mouseOver = false;

        if(event.target.id === 'forecast-d-refresh') mouseOver = false;

        
    })
})()















// getWeatherForecast();
