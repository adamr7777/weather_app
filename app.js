
import {getTime, getLatlong, getWeatherData, renderTodayWeather, updateInfo, checkDay, getRenderImg} from './utils.js';



// bring back the main 3 functions from utils.js 




// console.log(checkDay());



document.addEventListener('click', (event)=> {
    if (event.target.id === 'btn-today') {
        renderTodayWeather();
        getRenderImg();
        
        //original place for updateInfo()
    }
})



updateInfo(); /*move to the event listener */
renderTodayWeather();           /*for convenience, later delete*/
getRenderImg();