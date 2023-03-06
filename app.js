
import {getTime, getLatlong, getWeatherData, renderTodayWeather, updateInfo, checkDay, getRenderImg, refreshWeatherHandle} from './utils.js';

document.getElementById('btn-today').disabled = true;

// bring back the main 3 functions from utils.js 

updateInfo(); /*move to the event listener */
renderTodayWeather();           /*for convenience, later delete*/
getRenderImg();


// console.log(checkDay());



document.addEventListener('click', (event)=> {
    if (event.target.id === 'btn-today') {
        document.getElementById('btn-today').disabled = true;
        document.getElementById('btn-week').disabled = false;
        renderTodayWeather();
        getRenderImg();
        
        //original place for updateInfo()
    }

    if (event.target.id === 'btn-week') {
        document.getElementById('main-cont').innerHTML = `<h1>Coming soon!</h1>`
        document.getElementById('btn-today').disabled = false;
        document.getElementById('btn-week').disabled = true;
    }

    if (event.target.id === 'refresh-btn') getRenderImg();
     
    
    if(event.target.id === 'weather-refresh') refreshWeatherHandle();
    
});




(function animateCircle(){
    let mouseOver = false;

    document.addEventListener('mouseover', (event)=> {
        if(event.target.id === 'weather-refresh') {
            mouseOver = true;

            const refreshWeatherBtn = document.getElementById('weather-refresh');
            
            refreshWeatherBtn.textContent = '↻';
            
            const refreshAnimation1 = setInterval(()=> {
                if (mouseOver === false) clearInterval(refreshAnimation1)
                refreshWeatherBtn.textContent = '⟳';
            }, 500)
        
            const refreshAnimation2 = setInterval(()=> {
                if (mouseOver === false) clearInterval(refreshAnimation2)
                refreshWeatherBtn.textContent = '↻';
            }, 1000)
        }

        

    });

    document.addEventListener('mouseout', (event)=> {
        if(event.target.id === 'weather-refresh') mouseOver = false
    })
})()










