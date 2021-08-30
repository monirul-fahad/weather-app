// global variables 
const inputField = document.getElementById('searchField');
const displayWether = document.getElementById('display-weater');

const searchResult = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputField.value+'&appid=b456d7e405795f9e5fab94eee95c707b')
    .then(res => res.json())
    .then(data => displayResult(data))
}

const displayResult = (data) => {
    if (data.cod === '404' || data.cod === '400') {
        const error = document.getElementById('error');
        displayWether.textContent = ''
        error.innerText = 'Please enter a valid city name.'
        inputField.value = ''
        setTimeout(function () {
          error.innerText = ''
        }, 3000)
      } 
      else {
console.log(data)
        displayWether.textContent = ''
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="text-center text-white">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <h2> ${data.name}, ${data.sys.country} </h2>
        <h4> Temperature: ${Math.round((data.main.temp) - 273.15)}<span>°C</span> </h4>
        <h4>Feels like: ${Math.round((data.main.feels_like) - 273.15)}<span>°C</span>  </h4>
        <h4>${data.weather[0].main}</h4>
       
        </div>
        `;
        displayWether.appendChild(div)
        inputField.value = ''
      }
}