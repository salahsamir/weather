var search = document.getElementById("search");
let row = document.getElementById("row");
var list = [];

/////////main function/////
function getdata(country) {
  var xml = new XMLHttpRequest();

  xml.open(
    "GET",
    `http://api.weatherapi.com/v1/forecast.json?key=b73aee4d88ec4d97b7c12221212804&q=${country}&days=7`
  );

  xml.send();
  xml.addEventListener("readystatechange", function () {
    if (xml.readyState == 4 && xml.status == 200) {
      list = JSON.parse(xml.response);
      display();
    }
  });
}
////for input search
getdata("lond");
search.addEventListener("input", function () {
  getdata(search.value);
});


function display() {
  
  let months = [
    "January",
    "Febraury",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemper",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let x = new Date();
  let day_number = x.getDate();

  let day = x.getDay();

  let day_1 = day + 1;//tomorrow
  let day_2 = day + 2;

  if (day == 6) {
    day_1 = 0;
    day_2 = 1;
  }

  if (day == 5) {
    day_2 = 0;
  }

  var box = `
 
<div class="col-4 text-center p-2 d-flex justify-content-between ">
<p>${days[day]}</p>
<p>${day_number} ${months[x.getMonth()]}</p>


</div>
<div class="col-4  p-2 text-center center-col">
<p>
${days[day_1]}</p>
</div>
<div class="col-4 text-center p-2">
 <p>${days[day_2]}</p>
</div>
<div class="col-4 col center-col ">
  <h3 class="pt-2">${list.location.name}</h3>



<h1 class="py-2 "><span>${list.current.temp_c}</span><sup>O</sup>C</h1>
  <img src="https:${list.current.condition.icon}" style=" width:25%;">



  <p class="text-primary  fs-5 px-3">${list.current.condition.text}</p>
  <div class="img d-flex justify-content-around">
     <div class="icon d-flex my-1  text-center">
      <img src="weather/icon-umberella.png" alt="">

      <p>${list.current.cloud}%</p>
     </div>
     <div class="icon d-flex my-1  text-center">
      <img src="weather/icon-wind.png" alt="">


      <p>${list.current.wind_kph}km/h</p>
     </div>
     <div class="icon d-flex my-1  text-center">
      <img src="weather/icon-compass.png" alt="">

      <p>${list.current.wind_dir}</p>
     </div>
    
  </div>

</div>


<div class="col-4 c  text-center d-flex align-items-center justify-content-center  ">
<div class="">

<img src="https:${list.forecast.forecastday[1].day.condition.icon}">
  <h2 class="py-2">${
    list.forecast.forecastday[1].day.maxtemp_c
  }<sup>o</sup>c</h2>
  <p class="py-2">${list.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
  <p  class="text-primary fs-5">${
    list.forecast.forecastday[1].day.condition.text
  }</p>
</div>
</div>



<div class="col-4  text-center d-flex align-items-center justify-content-center center-col">
  <div class="">
<img src="https:${list.forecast.forecastday[2].day.condition.icon}">
  
  <h2 class="py-2">${
    list.forecast.forecastday[2].day.maxtemp_c
  }<sup>o</sup>c</h2>
  <p class="py-2">${list.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
  <p  class="text-primary fs-5">${
    list.forecast.forecastday[2].day.condition.text
  }</p>
   
  </div>
</div>
  
  
  `;
  row.innerHTML = box;
}
