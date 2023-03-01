
import {getTime, getLatlong, getWeatherData, renderTodayWeather, updateInfo, checkDay, getRenderImg} from './utils.js';

document.getElementById('btn-today').disabled = true;

// bring back the main 3 functions from utils.js 




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

    
})



updateInfo(); /*move to the event listener */
renderTodayWeather();           /*for convenience, later delete*/
getRenderImg();