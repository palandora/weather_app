
const currentDateAndTime = document.querySelector('.header .currentDate');
const currentLocation = document.querySelector('.header .location span');
const menu = document.querySelector('.header .menu');
const menuItems = document.getElementsByClassName("menu_item");

const currentTemp = document.getElementById("degrees");
const currentSky = document.getElementById("sky");

const titleHumidity = document.querySelector("#humidity .title");
const titleWind = document.querySelector("#wind .title");
const titleGusts = document.querySelector("#gusts .title");
const titleWindDir = document.querySelector("#wind_direction .title");
const svgWindDir = document.querySelector("#wind_direction svg");
let gotClicked = false;

setCurrentTime();
getData("Vienna");

const setHtmlContents = (data) => {
    currentTemp.textContent = data.main.temp;
    currentSky.textContent = data.weather[0].description;
    titleHumidity.textContent = data.main.humidity;
    titleWind.textContent = data.wind.speed;
    titleGusts.textContent = data.wind.gust;
    titleWindDir.textContent = data.wind.deg;  
    svgWindDir.style.transform = `rotate(${data.wind.deg}deg)`;
}

async function getData(cityName){
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=31eac4b79a1e9d6a5b146af42f1b6a80&units=metric`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    setHtmlContents(data);   
}



function setCurrentTime (){
    let currentDate = new Date();
    currentDateAndTime.textContent = currentDate.toLocaleString();
}

const showMenu = () => {
    if(!gotClicked){
        menu.style.display = "block";
        gotClicked = true;
    }else{
        menu.style.display = "none";
        gotClicked = false;
    } 
}


const setCity = () =>{
    for(let i=0 ; i< menuItems.length; i++){
        menuItems[i].addEventListener("click", function(){
            currentLocation.textContent = menuItems[i].innerHTML;
            switch (menuItems[i].id){
                case "Barcelona": 
                    getData("Barcelona");
                    break;
                case "Stockholm":
                    getData("Stockholm");
                    break;
                case "Berlin":
                    getData("Berlin");
                    break;
                case "Vienna":
                    getData("Vienna");
                    break;
            }
            gotClicked = true;
            showMenu();
        });
    }
}


currentLocation.addEventListener("click",showMenu);
setCity();
setInterval(setCurrentTime, 1000);




