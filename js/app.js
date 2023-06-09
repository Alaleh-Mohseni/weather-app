//  ApiKey
const apiKey = "c4eb5a798ab04fe0925104554230101";
//  header
const london = document.querySelector("nav ul li:nth-child(1)");
const doha = document.querySelector("nav ul li:nth-child(2)");
const toronto = document.querySelector("nav ul li:nth-child(3)");
const paris = document.querySelector("nav ul li:nth-child(4)");
// geolocation
const liveBox = document.querySelector("#liveLocation");
const textError = document.getElementById("location");
const temperature = document.getElementById("temperature");
const current = document.getElementById("current");
//  search city
const search = document.querySelector(".searchBox button");
const city = document.querySelector(".searchBox input");
const liveLoc = document.querySelector("#liveLocation");
const defaultBox = document.querySelector("#default");
const dayBox = document.querySelector("#dayBox");
const dailyForecast = document.querySelector("#dailyForecast");
const currentBox = document.querySelector("#currentWeather");
const hourlyWeather = document.querySelector("#hourlyWeather");


loadNavApi();
getWeather();
search.addEventListener("click", searchCity);


// Navigation Api
function loadNavApi() {
    // London
    const londonApi = fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`)
        .then
        ((response) => response.json())
        .then
        ((data) => {
            london.innerHTML = `
        <span><img src="${data.current.condition.icon}" width="30px" height="30px"></span>
        <span>${data.current.temp_f}°</span>
        <span style="font-size: 14px; padding-left: 5px">${data.location.name},${data.location.country}</span>`;
        })
        .catch
        ((e) => console.log(e))
    console.log(londonApi);

    // Doha
    const dohaApi = fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=doha`)
        .then
        ((response) => response.json())
        .then
        ((data) => {
            doha.innerHTML = `
        <span><img src="${data.current.condition.icon}" width="30px" height="30px"></span>
        <span>${data.current.temp_f}°</span>
        <span style="font-size: 14px; padding-left: 5px">${data.location.name},${data.location.country}</span>`;
        })
        .catch
        ((e) => console.log(e))
    console.log(dohaApi);

    // Toronto
    const torontoApi = fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Toronto`)
        .then
        ((response) => response.json())
        .then
        ((data) => {
            toronto.innerHTML = `
        <span><img src="${data.current.condition.icon}" width="30px" height="30px"></span>
        <span>${data.current.temp_f}°</span>
        <span style="font-size: 14px; padding-left: 5px">${data.location.name},${data.location.country}</span>`;
        })
        .catch
        ((e) => console.log(e))
    console.log(torontoApi);

    // Paris
    const parisApi = fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=paris`)
        .then
        ((response) => response.json())
        .then
        ((data) => {
            paris.innerHTML = `
        <span><img src="${data.current.condition.icon}" width="30px" height="30px"></span>
        <span>${data.current.temp_f}°</span>
        <span style="font-size: 14px; padding-left: 5px">${data.location.name},${data.location.country}</span>`;
        })
        .catch
        ((e) => console.log(e))
    console.log(parisApi);
}

// geolocation
function getWeather() {
    const api = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=`;

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `${api}${latitude},${longitude}&days=1&aqi=no&alerts=yes`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const nameCity = data.location.name;
                const country = data.location.country;
                const localTime = data.location.localtime;
                // CURRENT
                const currentTempf = data.current.temp_f;
                const currentDescription = data.current.condition.text;
                const currentIcon = data.current.condition.icon;
                const currentWind = data.current.wind_mph;
                const currenUv = data.current.uv;
                const currentHumidity = data.current.humidity;
                const currentPressure = data.current.pressure_in;
                const currentVisibility = data.current.vis_miles;
                const currentFeelslike = data.current.feelslike_f;
                // FORECAST
                const todayMintemp = data.forecast.forecastday[0].day.mintemp_f;
                const todayMaxtemp = data.forecast.forecastday[0].day.maxtemp_f;
                const todaySunrise = data.forecast.forecastday[0].astro.sunrise;
                const todaySunset = data.forecast.forecastday[0].astro.sunset;
                const todayMoonphase = data.forecast.forecastday[0].astro.moon_phase;
                const todayRain = data.forecast.forecastday[0].day.daily_will_it_rain;
                const todayNight = data.forecast.forecastday[0].hour[0].temp_f;
                const day = data.forecast.forecastday[0].hour[12].temp_f;

                temperature.innerHTML = `
                        <div class="col-xl-12 pt-2">
                            <div class="col-xl-12 col-sm-12 text-white">
                                <h1 class="d-inline fs-3">${nameCity}, ${nameCity}, ${country} </h1>
                                <span class="fw-semibold">  ${localTime}</span>
                            </div>
                            <div class="col-xl-12 col-sm-12 p-3 d-flex justify-content-between align-items-center">
                                <div class="col-xl-9 col-sm-12 text-white fw-semibold px-2">
                                    <p style="font-size: 85px;">${currentTempf}°<span style="font-size: 50px">F</span></p>
                                    <p class="fs-3">${currentDescription}</p>
                                    <p class="fs-4">Day ${day}° • Night ${todayNight}°</p>
                                </div>
                                <div class="col-xl-3 col-sm-12">
                                   <a href="https://www.weatherapi.com/" title="Free Weather API">
                                       <img src='${currentIcon}' alt="Weather data by WeatherAPI.com" border="0" width="150px" height="150px">
                                   </a>
                                </div>
                            </div>
                        </div>`;

                current.innerHTML = `<div class="container-fluid row">
                <div class="col-xl-12 col-sm-12 mb-4 fs-6">
                    <h2>Weather Today in ${nameCity}, ${nameCity}, ${country}</h2>
                </div>
                <div class="row col-xl-12 col-sm-12">
                    <div class="col-xl-8 col-sm-12 px-5 pt-3">
                        <span class="fw-semibold d-block" style="font-size: 3.5rem;">${currentFeelslike}°<span style="font-size: 30px">F</span></span>
                        <span class="fw-light d-block">Feels like</span>
                    </div>
                    <div class="col-xl-4 col-sm-12 row">
                        <div class="col-xl-12 col-sm-0" style="padding-left: 85px;">
                            <img src="images/cropped-favicon.png" alt="" width="100px" height="100px">
                        </div>
                        <div class="col-xl-6 col-sm-6 d-flex py-3">
                            <i class="fa fa-arrow-up px-2 mt-1" style="color: #ffcb30;"></i>
                            <p>${todaySunrise}</p>
                        </div>
                        <div class="col-xl-6 col-sm-6 d-flex py-3">
                            <i class="fa fa-arrow-down px-2 mt-1" style="color: #ffcb30;"></i>
                            <p>${todaySunset}</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-12 col-sm-12 row pt-5">
                    <div class="col-xl-6 col-md-12">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="row text-primary">
                                        <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon----1PZ-8 text-primary"
                                            set="current-conditions" name="temp" theme="dark"
                                            data-testid="Icon" viewBox="0 0 24 24">
                                            <title>Temperature</title>
                                            <path
                                                d="M10.333 15.48v.321c.971.357 1.667 1.322 1.667 2.456 0 1.438-1.12 2.604-2.5 2.604S7 19.695 7 18.257c0-1.134.696-2.099 1.667-2.456v-.322a2.084 2.084 0 0 1-1.25-1.91V5.583a2.083 2.083 0 1 1 4.166 0v7.986c0 .855-.514 1.589-1.25 1.91zM15.8 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z">
                                            </path>
                                        </svg>
                                    </th>
                                    <td colspan="2">High / Low</td>
                                    <td class="ps-5">${todayMaxtemp}°/${todayMintemp}°</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                            set="current-conditions" name="humidity" theme="dark"
                                            data-testid="Icon" viewBox="0 0 24 24">
                                            <title>Humidity</title>
                                            <path fill-rule="evenodd"
                                                d="M11.743 17.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M11.855 4c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772A1.08 1.08 0 0 1 11.855 4">
                                            </path>
                                        </svg>
                                    </th>
                                    <td colspan="2">Humidity</td>
                                    <td class="ps-5">${currentHumidity}%</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                            set="current-conditions" name="pressure" theme="dark"
                                            data-testid="Icon" viewBox="0 0 24 24">
                                            <title>Pressure</title>
                                            <path
                                                d="M8.462 18.293l-.29-.002c-.6-.004-1.043-.007-1.259-.007-1.119 0-1.182-1.015-.34-1.734l.196-.164.508-.425 1.543-1.292c1.014-.846 1.74-1.45 2.073-1.723.735-.601 1.305-.596 2.033.022.387.329.959.805 2.207 1.841a377.936 377.936 0 0 1 2.18 1.816c.796.67.742 1.66-.295 1.66h-2.382v1.77c0 .83-.393 1.223-1.258 1.223h-2.994c-.809 0-1.258-.42-1.258-1.207v-1.773l-.664-.005zm0-12.807l-.29.002c-.6.004-1.043.006-1.259.006-1.119 0-1.182 1.016-.34 1.734l.196.164.508.426 1.543 1.29a348.68 348.68 0 0 0 2.073 1.724c.735.601 1.305.596 2.033-.022.387-.328.959-.805 2.207-1.84a377.937 377.937 0 0 0 2.18-1.817c.796-.67.742-1.659-.295-1.659h-2.382v-1.77c0-.832-.393-1.224-1.258-1.224h-2.994c-.809 0-1.258.42-1.258 1.207V5.48l-.664.005z">
                                            </path>
                                        </svg>
                                    </th>
                                    <td colspan="2">Pressure</td>
                                    <td class="ps-4">
                                        <i class="fa fa-arrow-up px-2 mt-1"></i>
                                        <span>${currentPressure} in</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                            set="current-conditions" name="visibility" theme="dark"
                                            data-testid="Icon" width="20" height="20"
                                            viewBox="0 0 1024 1024" id="visi">
                                            <title>Visibility</title>
                                            <path
                                                d="M491.856 879.808c-60.48-5.056-110.848-25.184-171.328-55.424-120.96-55.424-216.704-146.112-292.256-256.96-25.248-40.352-30.24-80.64 0-126.016 80.608-115.872 186.464-211.68 317.472-272.096 110.816-50.4 226.752-50.4 337.664 0 136 60.48 241.824 156.224 317.44 282.208 15.104 25.216 25.12 65.504 10.048 85.728-105.792 191.424-256.992 367.84-519.04 342.56zm292.256-377.92c0-151.168-120.96-272.064-272.096-272.064-146.144 0-272.128 126.016-272.128 272.064 0 151.232 120.96 277.216 272.128 277.216 151.104-.032 272.096-125.984 272.096-277.216z">
                                            </path>
                                            <path
                                                d="M789.808 500.416c0 156.896-125.472 287.52-282.336 282.336-156.864 0-282.336-130.656-282.336-287.488 0-146.4 130.656-277.12 282.336-277.12 156.896-.032 287.584 125.376 282.336 282.272zM512.752 348.832c-83.68 0-151.584 67.968-151.584 151.584 0 88.864 67.968 156.896 151.584 156.896 83.648 0 156.832-73.216 156.832-156.896-5.184-83.648-73.152-151.584-156.832-151.584z">
                                            </path>
                                        </svg>
                                    </th>
                                    <td colspan="2">Visibility</td>
                                    <td class="ps-5">${currentVisibility} mi</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-xl-6 col-md-12">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                            set="current-conditions" name="wind" theme="dark"
                                            data-testid="Icon" viewBox="0 0 24 24">
                                            <title>Wind</title>
                                            <path
                                                d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742"
                                                stroke-width="2" stroke="currentColor"
                                                stroke-linecap="round" fill="none">
                                            </path>
                                        </svg>
                                    </th>
                                    <td colspan="2">Wind</td>
                                    <td class="ps-5">${currentWind} mph</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                       <i class="fa fa-cloud-showers-heavy" style="font-size: 25px"></i>
                                    </th>
                                    <td colspan="2">Rain</td>
                                    <td class="ps-5">${todayRain}</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                            set="current-conditions" name="uv" theme="dark"
                                            data-testid="Icon" viewBox="0 0 24 24">
                                            <title>UV Level</title>
                                            <path
                                                d="M7.4 5.598a.784.784 0 0 1 .25-.92c.335-.256.824-.197 1.02.062.066.063.066.063.08.085l2.406 3.152-.626.238a3.983 3.983 0 0 0-1.097.633l-.522.424L7.4 5.598zm4.539 2.358c-.21 0-.418.017-.625.05l-.664.106.09-.666.438-3.266c.013-.072.013-.072.012-.057a.783.783 0 0 1 .666-.616.78.78 0 0 1 .872.639l.006.038.507 3.933-.662-.108a3.957 3.957 0 0 0-.64-.053zm-7.781 3.19l.026-.004 3.934-.507-.108.662a3.98 3.98 0 0 0-.003 1.266l.105.664-.665-.09-3.265-.439a.784.784 0 0 1-.676-.679c-.054-.42.238-.809.63-.869l.022-.004zm11.504-.617a3.98 3.98 0 0 0-.632-1.097l-.425-.522.623-.256 3.056-1.256a.787.787 0 0 1 .916.253c.256.337.199.817-.104 1.063l-.045.037-3.151 2.405-.238-.627zm-1.205-1.672a3.984 3.984 0 0 0-1.095-.637l-.626-.24.41-.532 2.008-2.602c.059-.07.059-.07.046-.052a.78.78 0 0 1 1.306.227c.076.185.079.39.02.54l-.021.06-1.528 3.662-.52-.426zM4.595 7.793c.162-.387.611-.58.971-.441.017.004.017.004.055.02L9.283 8.9l-.425.52a3.985 3.985 0 0 0-.636 1.094l-.24.627-3.144-2.425a.784.784 0 0 1-.243-.924zm14.443 7.367c.054.045.054.045.044.04a.784.784 0 0 1 .199.884c-.163.386-.61.58-.964.443-.024-.006-.024-.006-.062-.022l-3.662-1.529.426-.52a3.98 3.98 0 0 0 .636-1.094l.241-.626 3.142 2.424zm1.332-3.303c.053.422-.239.809-.63.87l-.035.006-3.945.508.108-.662a3.999 3.999 0 0 0 .003-1.266l-.105-.663.665.09 3.272.44c.068.012.068.012.052.01a.784.784 0 0 1 .615.667zm-3.894 6.421c.024.068.024.068.017.053a.786.786 0 0 1-.27.87c-.332.25-.816.194-1.047-.091-.022-.023-.022-.023-.05-.058l-2.406-3.154.626-.237a3.977 3.977 0 0 0 1.097-.632l.523-.425 1.51 3.674zm-8.26-4.932c.151.397.365.767.633 1.097l.424.522-.622.256-3.054 1.255a.787.787 0 0 1-.92-.25.781.781 0 0 1-.154-.58c.027-.199.127-.379.227-.452.045-.046.045-.046.075-.069l3.153-2.406.238.627zm3.723 2.572c.209 0 .417-.016.625-.049l.662-.103-.089.664-.438 3.26-.012.062a.785.785 0 0 1-.666.618c-.048.005-.048.005-.101.006-.386 0-.714-.28-.764-.612-.01-.043-.01-.043-.014-.072l-.507-3.934.662.108c.213.035.427.052.642.052zM7.366 18.27l.006-.015L8.9 14.592l.52.426a3.99 3.99 0 0 0 1.094.636l.626.241-.41.531-2.012 2.609-.04.046a.788.788 0 0 1-.886.2.787.787 0 0 1-.428-1.011z">
                                            </path>
                                            <path
                                                d="M11.911 14.322a2.411 2.411 0 1 0 0-4.822 2.411 2.411 0 0 0 0 4.822zm0 2a4.411 4.411 0 1 1 0-8.822 4.411 4.411 0 0 1 0 8.822z">
                                            </path>
                                        </svg>
                                    </th>
                                    <td colspan="2">UV Index</td>
                                    <td class="ps-5">${currenUv} of 10</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                            set="current-conditions" name="moonphase" theme="dark"
                                            data-testid="Icon" viewBox="0 0 24 24">
                                            <title>Moon Phase</title>
                                            <path fill="none"
                                                d="M12.099 20.19a8.095 8.095 0 1 0 0-16.19 8.095 8.095 0 0 0 0 16.19z"
                                                stroke="currentColor" stroke-width="1.5"></path>
                                            <path
                                                d="M12.079 4.518c3.4.673 4.065 5.797 4.066 7.577 0 1.78-.665 6.759-4.066 7.542-4.462 0-8.079-3.07-8.079-7.542 0-4.47 3.617-7.577 8.079-7.577z">
                                            </path>
                                        </svg>
                                    </th>
                                    <td colspan="2">Moon Phase</td>
                                    <td class="ps-5">${todayMoonphase}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                    </div>`;    
            });
    }

    function error() {
        textError.innerHTML = "Unable to retrieve your location";
    }
}


// search city
function searchCity() {
    liveLoc.style.display = 'none';
    defaultBox.style.display = 'block';
    inputVal = city.value;
    city.value = '';
    city.focus();
    const api = fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputVal}&day=1&aqi=no&alerts=yes`)
        .then
        ((response) => response.json())
        .then
        ((data) => {
            const name = data.location.name;
            const country = data.location.country;
            const localTime = data.location.localtime;
            // CURRENT
            const currentTempf = data.current.temp_f;
            const currentDescription = data.current.condition.text;
            const currentIcon = data.current.condition.icon;
            const currentWind = data.current.wind_mph;
            const currenUv = data.current.uv;
            const currentHumidity = data.current.humidity;
            const currentPressure = data.current.pressure_in;
            const currentVisibility = data.current.vis_miles;
            const currentFeelslike = data.current.feelslike_f;
            // FORECAST
            const todayMintemp = data.forecast.forecastday[0].day.mintemp_f;
            const todayMaxtemp = data.forecast.forecastday[0].day.maxtemp_f;
            const todaySunrise = data.forecast.forecastday[0].astro.sunrise;
            const todaySunset = data.forecast.forecastday[0].astro.sunset;
            const todayMoonphase = data.forecast.forecastday[0].astro.moon_phase;
            const todayRain = data.forecast.forecastday[0].day.daily_will_it_rain;
            const forecast = data.forecast.forecastday;
            const todayNight = data.forecast.forecastday[0].hour[0].temp_f;
            const day = data.forecast.forecastday[0].hour[12].temp_f;

            dayBox.innerHTML = `
            <div class="c-12 pt-2" data-="">
                <div class="col-12 text-white">
                    <h1 class="d-inline fs-3">${name}, ${name}, ${country} </h1>
                    <span class="fw-bold">  ${localTime}</span>
                </div>
                <div class="col-12 p-3 d-flex justify-content-between align-items-center">
                    <div class="col-9 text-white fw-semibold px-2">
                       <p style="font-size: 85px;">${currentTempf}°<span style="font-size: 50px">F</span></p>
                       <p class="fs-3">${currentDescription}</p>
                       <p class="fs-4">Day ${day}° • Night ${todayNight}°</p>
                   </div>
                   <div class="col-3">
                       <a href="https://www.weatherapi.com/" title="Free Weather API">
                           <img src='${currentIcon}' alt="Weather data by WeatherAPI.com" border="0" width="150px" height="150px">
                       </a>
                   </div>
                </div>
            </div>`;

            currentBox.innerHTML = `<div class="container-fluid row">
            <div class="col-xl-12 mb-4 fs-6">
                <h2>Weather Today in ${name}, ${name}, ${country}</h2>
            </div>
            <div class="row col-xl-12">
                <div class="col-8 px-5 pt-3">
                    <span class="fw-semibold d-block" style="font-size: 3.5rem;">${currentFeelslike}°<span style="font-size: 30px">F</span></span>
                    <span class="fw-light d-block">Feels like</span>
                </div>
                <div class="col-4 row">
                    <div class="col-12" style="padding-left: 85px;">
                        <img src="images/cropped-favicon.png" alt="" width="100px" height="100px">
                    </div>
                    <div class="col-6 d-flex py-3">
                        <i class="fa fa-arrow-up px-2 mt-1" style="color: #ffcb30;"></i>
                        <p>${todaySunrise}</p>
                    </div>
                    <div class="col-6 d-flex py-3">
                        <i class="fa fa-arrow-down px-2 mt-1" style="color: #ffcb30;"></i>
                        <p>${todaySunset}</p>
                    </div>
                </div>
            </div>
            <div class="col-xl-12 row pt-5">
                <div class="col-xl-6 col-md-12">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th scope="row text-primary">
                                    <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon----1PZ-8 text-primary"
                                        set="current-conditions" name="temp" theme="dark"
                                        data-testid="Icon" viewBox="0 0 24 24">
                                        <title>Temperature</title>
                                        <path
                                            d="M10.333 15.48v.321c.971.357 1.667 1.322 1.667 2.456 0 1.438-1.12 2.604-2.5 2.604S7 19.695 7 18.257c0-1.134.696-2.099 1.667-2.456v-.322a2.084 2.084 0 0 1-1.25-1.91V5.583a2.083 2.083 0 1 1 4.166 0v7.986c0 .855-.514 1.589-1.25 1.91zM15.8 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z">
                                        </path>
                                    </svg>
                                </th>
                                <td colspan="2">High / Low</td>
                                <td class="ps-5">${todayMaxtemp}°/${todayMintemp}°</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                        set="current-conditions" name="humidity" theme="dark"
                                        data-testid="Icon" viewBox="0 0 24 24">
                                        <title>Humidity</title>
                                        <path fill-rule="evenodd"
                                            d="M11.743 17.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M11.855 4c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772A1.08 1.08 0 0 1 11.855 4">
                                        </path>
                                    </svg>
                                </th>
                                <td colspan="2">Humidity</td>
                                <td class="ps-5">${currentHumidity}%</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                        set="current-conditions" name="pressure" theme="dark"
                                        data-testid="Icon" viewBox="0 0 24 24">
                                        <title>Pressure</title>
                                        <path
                                            d="M8.462 18.293l-.29-.002c-.6-.004-1.043-.007-1.259-.007-1.119 0-1.182-1.015-.34-1.734l.196-.164.508-.425 1.543-1.292c1.014-.846 1.74-1.45 2.073-1.723.735-.601 1.305-.596 2.033.022.387.329.959.805 2.207 1.841a377.936 377.936 0 0 1 2.18 1.816c.796.67.742 1.66-.295 1.66h-2.382v1.77c0 .83-.393 1.223-1.258 1.223h-2.994c-.809 0-1.258-.42-1.258-1.207v-1.773l-.664-.005zm0-12.807l-.29.002c-.6.004-1.043.006-1.259.006-1.119 0-1.182 1.016-.34 1.734l.196.164.508.426 1.543 1.29a348.68 348.68 0 0 0 2.073 1.724c.735.601 1.305.596 2.033-.022.387-.328.959-.805 2.207-1.84a377.937 377.937 0 0 0 2.18-1.817c.796-.67.742-1.659-.295-1.659h-2.382v-1.77c0-.832-.393-1.224-1.258-1.224h-2.994c-.809 0-1.258.42-1.258 1.207V5.48l-.664.005z">
                                        </path>
                                    </svg>
                                </th>
                                <td colspan="2">Pressure</td>
                                <td class="ps-4">
                                    <i class="fa fa-arrow-up px-2 mt-1"></i>
                                    <span>${currentPressure} in</span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                        set="current-conditions" name="visibility" theme="dark"
                                        data-testid="Icon" width="20" height="20"
                                        viewBox="0 0 1024 1024" id="visi">
                                        <title>Visibility</title>
                                        <path
                                            d="M491.856 879.808c-60.48-5.056-110.848-25.184-171.328-55.424-120.96-55.424-216.704-146.112-292.256-256.96-25.248-40.352-30.24-80.64 0-126.016 80.608-115.872 186.464-211.68 317.472-272.096 110.816-50.4 226.752-50.4 337.664 0 136 60.48 241.824 156.224 317.44 282.208 15.104 25.216 25.12 65.504 10.048 85.728-105.792 191.424-256.992 367.84-519.04 342.56zm292.256-377.92c0-151.168-120.96-272.064-272.096-272.064-146.144 0-272.128 126.016-272.128 272.064 0 151.232 120.96 277.216 272.128 277.216 151.104-.032 272.096-125.984 272.096-277.216z">
                                        </path>
                                        <path
                                            d="M789.808 500.416c0 156.896-125.472 287.52-282.336 282.336-156.864 0-282.336-130.656-282.336-287.488 0-146.4 130.656-277.12 282.336-277.12 156.896-.032 287.584 125.376 282.336 282.272zM512.752 348.832c-83.68 0-151.584 67.968-151.584 151.584 0 88.864 67.968 156.896 151.584 156.896 83.648 0 156.832-73.216 156.832-156.896-5.184-83.648-73.152-151.584-156.832-151.584z">
                                        </path>
                                    </svg>
                                </th>
                                <td colspan="2">Visibility</td>
                                <td class="ps-5">${currentVisibility} mi</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-xl-6 col-md-12">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                        set="current-conditions" name="wind" theme="dark"
                                        data-testid="Icon" viewBox="0 0 24 24">
                                        <title>Wind</title>
                                        <path
                                            d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742"
                                            stroke-width="2" stroke="currentColor"
                                            stroke-linecap="round" fill="none">
                                        </path>
                                    </svg>
                                </th>
                                <td colspan="2">Wind</td>
                                <td class="ps-5">${currentWind} mph</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                   <i class="fa fa-cloud-showers-heavy" style="font-size: 25px"></i>
                                </th>
                                <td colspan="2">Rain</td>
                                <td class="ps-5">${todayRain}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                        set="current-conditions" name="uv" theme="dark"
                                        data-testid="Icon" viewBox="0 0 24 24">
                                        <title>UV Level</title>
                                        <path
                                            d="M7.4 5.598a.784.784 0 0 1 .25-.92c.335-.256.824-.197 1.02.062.066.063.066.063.08.085l2.406 3.152-.626.238a3.983 3.983 0 0 0-1.097.633l-.522.424L7.4 5.598zm4.539 2.358c-.21 0-.418.017-.625.05l-.664.106.09-.666.438-3.266c.013-.072.013-.072.012-.057a.783.783 0 0 1 .666-.616.78.78 0 0 1 .872.639l.006.038.507 3.933-.662-.108a3.957 3.957 0 0 0-.64-.053zm-7.781 3.19l.026-.004 3.934-.507-.108.662a3.98 3.98 0 0 0-.003 1.266l.105.664-.665-.09-3.265-.439a.784.784 0 0 1-.676-.679c-.054-.42.238-.809.63-.869l.022-.004zm11.504-.617a3.98 3.98 0 0 0-.632-1.097l-.425-.522.623-.256 3.056-1.256a.787.787 0 0 1 .916.253c.256.337.199.817-.104 1.063l-.045.037-3.151 2.405-.238-.627zm-1.205-1.672a3.984 3.984 0 0 0-1.095-.637l-.626-.24.41-.532 2.008-2.602c.059-.07.059-.07.046-.052a.78.78 0 0 1 1.306.227c.076.185.079.39.02.54l-.021.06-1.528 3.662-.52-.426zM4.595 7.793c.162-.387.611-.58.971-.441.017.004.017.004.055.02L9.283 8.9l-.425.52a3.985 3.985 0 0 0-.636 1.094l-.24.627-3.144-2.425a.784.784 0 0 1-.243-.924zm14.443 7.367c.054.045.054.045.044.04a.784.784 0 0 1 .199.884c-.163.386-.61.58-.964.443-.024-.006-.024-.006-.062-.022l-3.662-1.529.426-.52a3.98 3.98 0 0 0 .636-1.094l.241-.626 3.142 2.424zm1.332-3.303c.053.422-.239.809-.63.87l-.035.006-3.945.508.108-.662a3.999 3.999 0 0 0 .003-1.266l-.105-.663.665.09 3.272.44c.068.012.068.012.052.01a.784.784 0 0 1 .615.667zm-3.894 6.421c.024.068.024.068.017.053a.786.786 0 0 1-.27.87c-.332.25-.816.194-1.047-.091-.022-.023-.022-.023-.05-.058l-2.406-3.154.626-.237a3.977 3.977 0 0 0 1.097-.632l.523-.425 1.51 3.674zm-8.26-4.932c.151.397.365.767.633 1.097l.424.522-.622.256-3.054 1.255a.787.787 0 0 1-.92-.25.781.781 0 0 1-.154-.58c.027-.199.127-.379.227-.452.045-.046.045-.046.075-.069l3.153-2.406.238.627zm3.723 2.572c.209 0 .417-.016.625-.049l.662-.103-.089.664-.438 3.26-.012.062a.785.785 0 0 1-.666.618c-.048.005-.048.005-.101.006-.386 0-.714-.28-.764-.612-.01-.043-.01-.043-.014-.072l-.507-3.934.662.108c.213.035.427.052.642.052zM7.366 18.27l.006-.015L8.9 14.592l.52.426a3.99 3.99 0 0 0 1.094.636l.626.241-.41.531-2.012 2.609-.04.046a.788.788 0 0 1-.886.2.787.787 0 0 1-.428-1.011z">
                                        </path>
                                        <path
                                            d="M11.911 14.322a2.411 2.411 0 1 0 0-4.822 2.411 2.411 0 0 0 0 4.822zm0 2a4.411 4.411 0 1 1 0-8.822 4.411 4.411 0 0 1 0 8.822z">
                                        </path>
                                    </svg>
                                </th>
                                <td colspan="2">UV Index</td>
                                <td class="ps-5">${currenUv} of 10</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                        set="current-conditions" name="moonphase" theme="dark"
                                        data-testid="Icon" viewBox="0 0 24 24">
                                        <title>Moon Phase</title>
                                        <path fill="none"
                                            d="M12.099 20.19a8.095 8.095 0 1 0 0-16.19 8.095 8.095 0 0 0 0 16.19z"
                                            stroke="currentColor" stroke-width="1.5"></path>
                                        <path
                                            d="M12.079 4.518c3.4.673 4.065 5.797 4.066 7.577 0 1.78-.665 6.759-4.066 7.542-4.462 0-8.079-3.07-8.079-7.542 0-4.47 3.617-7.577 8.079-7.577z">
                                        </path>
                                    </svg>
                                </th>
                                <td colspan="2">Moon Phase</td>
                                <td class="ps-5">${todayMoonphase}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
                </div>`;

            hourlyWeather.innerHTML = `
                    <div class="ps-2 border-bottom" id="hourlyHeader">
                        <h3 class="d-inline">Hourly Weather</h3>
                        <span>-${name}, ${name}, ${country}</span>
                        <p class="pt-2 mb-3">
                            As of ${localTime}
                        </p>
                    </div>
                    <div class="border-bottom" id="hourlyBox">
                           <div class="border-bottom py-3">
                               <h4>${localTime}</h4>
                           </div>
                           <ul class="list-group list-group-flush">
                           </ul>
                    </div>`;

            const hourlyBox = document.querySelector("#hourlyWeather #hourlyBox ul");

            forecast.forEach(element => {
                const hourWeather = element.hour;
                showHour(hourWeather);
            });

            function showHour(hourWeather) {
                hourWeather.forEach(item => {
                    hourlyBox.innerHTML += `
                        <li class="list-group-item d-flex justify-content-between col-12 align-items-center row py-3">
                            <div class="d-flex justify-content-between col-6">
                                <span class="col-4">${item.time}</span>
                                <span class="fw-semibold col-2">${item.temp_f}°</span>
                                <span class="col-6">
                                    <span><img src="${item.condition.icon}" width="40px" height="40px"></span>
                                    ${item.condition.text}
                                </span>
                            </div>
                            <div class="d-flex justify-content-between col-3" id="btn">
                                <span class="pe-4">
                                    <svg class="Icon--icon--2aW0V Icon--actionTheme--1kPn8 DetailsSummary--precipIcon--1Cgzh"
                                        set="heads-up" name="precip-rain-single" theme="action"
                                        data-testid="Icon" aria-label="Chance of Rain" viewBox="0 -2 5 10">
                                        <title>Rain</title>
                                        <path
                                            d="M4.7329.0217c-.1848-.059-.3855.0064-.4803.148L.2731 5.1191c-.0814.0922-.1501.1961-.196.3108-.2469.6009.1185 1.2697.8156 1.4943.6914.226 1.447-.0712 1.7-.6585L4.9662.4987l.0111-.0282c.073-.1807-.036-.379-.2444-.4488z">
                                        </path>
                                    </svg>
                                    ${item.will_it_rain}%
                                </span>
                                <span>
                                    <svg class="Icon--icon--2aW0V Icon--actionTheme--1kPn8 DetailsSummary--conditionsIcon--JfNEK"
                                        set="current-conditions" name="wind" theme="action"
                                        data-testid="Icon" aria-label="Wind" viewBox="0 0 24 24">
                                        <title>Wind</title>
                                        <path
                                            d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742"
                                            stroke-width="2" stroke="currentColor" stroke-linecap="round"
                                            fill="none">
                                        </path>
                                    </svg>
                                    ${item.wind_mph} mph
                                </span>
                                <span class="angleUp">
                                        <i class="fa fa-angle-up text-primary" style="font-size: 20px; display: none;"></i>
                                </span>
                                <span class="angleDown">
                                    <button class="border-0"
                                        style="background-color: white; font-size: 20px;" type="button">
                                        <i class="fa fa-angle-down text-primary"></i>
                                    </button>
                                </span>
                            </div>
                            <div class="col-12 hiddenBox">
                                <div class="w-full px-3 pt-3 m-auto card">
                                    <table class="table card-body">
                                        <tbody>
                                            <tr class="col-12">
                                                <td scope="row col-4 text-primary">
                                                    <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon----1PZ-8 text-primary"
                                                        set="current-conditions" name="temp" theme="dark"
                                                        data-testid="Icon" viewBox="0 0 24 24">
                                                        <title>Temperature</title>
                                                        <path
                                                            d="M10.333 15.48v.321c.971.357 1.667 1.322 1.667 2.456 0 1.438-1.12 2.604-2.5 2.604S7 19.695 7 18.257c0-1.134.696-2.099 1.667-2.456v-.322a2.084 2.084 0 0 1-1.25-1.91V5.583a2.083 2.083 0 1 1 4.166 0v7.986c0 .855-.514 1.589-1.25 1.91zM15.8 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z">
                                                        </path>
                                                    </svg>
                                                    <span>Feels Like</span>
                                                    <span class="fw-bold ps-3">${item.feelslike_f}°</span>
                                                </td>
                                                <td colspan="2" class="ps-5">
                                                    <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                                        set="current-conditions" name="wind" theme="dark"
                                                        data-testid="Icon" viewBox="0 0 24 24">
                                                        <title>Wind</title>
                                                        <path
                                                            d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742"
                                                            stroke-width="2" stroke="currentColor"
                                                            stroke-linecap="round" fill="none">
                                                        </path>
                                                    </svg>
                                                    <span>Wind</span>
                                                    <span class="fw-bold ps-3">${item.wind_dir} ${item.wind_mph} mph</span>
                                                </td>
                                                <td class="ps-5">
                                                    <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                                        set="current-conditions" name="humidity"
                                                        theme="dark" data-testid="Icon" viewBox="0 0 24 24">
                                                        <title>Humidity</title>
                                                        <path fill-rule="evenodd"
                                                            d="M11.743 17.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M11.855 4c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772A1.08 1.08 0 0 1 11.855 4">
                                                        </path>
                                                    </svg>
                                                    <span>Humidity</span>
                                                    <span class="fw-bold ps-3">${item.humidity}%</span>
                                                </td>
                                            </tr>
                                            <tr class="border-white">
                                                <td scope="row">
                                                    <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8"
                                                        set="current-conditions" name="uv" theme="dark"
                                                        data-testid="Icon" viewBox="0 0 24 24">
                                                        <title>UV Level</title>
                                                        <path
                                                            d="M7.4 5.598a.784.784 0 0 1 .25-.92c.335-.256.824-.197 1.02.062.066.063.066.063.08.085l2.406 3.152-.626.238a3.983 3.983 0 0 0-1.097.633l-.522.424L7.4 5.598zm4.539 2.358c-.21 0-.418.017-.625.05l-.664.106.09-.666.438-3.266c.013-.072.013-.072.012-.057a.783.783 0 0 1 .666-.616.78.78 0 0 1 .872.639l.006.038.507 3.933-.662-.108a3.957 3.957 0 0 0-.64-.053zm-7.781 3.19l.026-.004 3.934-.507-.108.662a3.98 3.98 0 0 0-.003 1.266l.105.664-.665-.09-3.265-.439a.784.784 0 0 1-.676-.679c-.054-.42.238-.809.63-.869l.022-.004zm11.504-.617a3.98 3.98 0 0 0-.632-1.097l-.425-.522.623-.256 3.056-1.256a.787.787 0 0 1 .916.253c.256.337.199.817-.104 1.063l-.045.037-3.151 2.405-.238-.627zm-1.205-1.672a3.984 3.984 0 0 0-1.095-.637l-.626-.24.41-.532 2.008-2.602c.059-.07.059-.07.046-.052a.78.78 0 0 1 1.306.227c.076.185.079.39.02.54l-.021.06-1.528 3.662-.52-.426zM4.595 7.793c.162-.387.611-.58.971-.441.017.004.017.004.055.02L9.283 8.9l-.425.52a3.985 3.985 0 0 0-.636 1.094l-.24.627-3.144-2.425a.784.784 0 0 1-.243-.924zm14.443 7.367c.054.045.054.045.044.04a.784.784 0 0 1 .199.884c-.163.386-.61.58-.964.443-.024-.006-.024-.006-.062-.022l-3.662-1.529.426-.52a3.98 3.98 0 0 0 .636-1.094l.241-.626 3.142 2.424zm1.332-3.303c.053.422-.239.809-.63.87l-.035.006-3.945.508.108-.662a3.999 3.999 0 0 0 .003-1.266l-.105-.663.665.09 3.272.44c.068.012.068.012.052.01a.784.784 0 0 1 .615.667zm-3.894 6.421c.024.068.024.068.017.053a.786.786 0 0 1-.27.87c-.332.25-.816.194-1.047-.091-.022-.023-.022-.023-.05-.058l-2.406-3.154.626-.237a3.977 3.977 0 0 0 1.097-.632l.523-.425 1.51 3.674zm-8.26-4.932c.151.397.365.767.633 1.097l.424.522-.622.256-3.054 1.255a.787.787 0 0 1-.92-.25.781.781 0 0 1-.154-.58c.027-.199.127-.379.227-.452.045-.046.045-.046.075-.069l3.153-2.406.238.627zm3.723 2.572c.209 0 .417-.016.625-.049l.662-.103-.089.664-.438 3.26-.012.062a.785.785 0 0 1-.666.618c-.048.005-.048.005-.101.006-.386 0-.714-.28-.764-.612-.01-.043-.01-.043-.014-.072l-.507-3.934.662.108c.213.035.427.052.642.052zM7.366 18.27l.006-.015L8.9 14.592l.52.426a3.99 3.99 0 0 0 1.094.636l.626.241-.41.531-2.012 2.609-.04.046a.788.788 0 0 1-.886.2.787.787 0 0 1-.428-1.011z">
                                                        </path>
                                                        <path
                                                            d="M11.911 14.322a2.411 2.411 0 1 0 0-4.822 2.411 2.411 0 0 0 0 4.822zm0 2a4.411 4.411 0 1 1 0-8.822 4.411 4.411 0 0 1 0 8.822z">
                                                        </path>
                                                    </svg>
                                                    <span colspan="2">UV Index</span>
                                                    <span class="ps-3 fw-bold">${item.uv} of 10</span>
                                                </td>
                                                <td colspan="2" class="ps-5">
                                                    <svg class="Icon--icon--2aW0V Icon--actionTheme--1kPn8 DetailsTable--icon--24dnM"
                                                        theme="action" set="heads-up" name="cloud"
                                                        data-testid="Icon" viewBox="0 0 24 24">
                                                        <title>Cloud</title>
                                                        <path
                                                            d="M21.786 11.898a3.322 3.322 0 0 0-4.04-2.357l-.356.095a4.911 4.911 0 0 0-9.599.546l-.129-.034a2.804 2.804 0 0 0-3.486 3.032l-1.203.323a1.312 1.312 0 0 0 .42 2.576h15.103s.626-.029.94-.113a3.322 3.322 0 0 0 2.35-4.068">
                                                        </path>
                                                    </svg>
                                                    <span>Cloud Cover</span>
                                                    <span class="fw-bold ps-3">${item.cloud}%</span>
                                                </td>
                                                <td class="ps-5">
                                                <svg class="WeatherDetailsListItem--icon--1En_X Icon--icon--2aW0V Icon--darkTheme--1PZ-8" set="current-conditions" name="dewpoint" theme="dark" data-testid="Icon" viewBox="0 0 24 24">
                                                <title>Dew Point</title>
                                                <path d="M17 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path><path fill-rule="evenodd" d="M9.743 18.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M9.855 5c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772C9.245 5.14 9.54 5 9.855 5"></path>
                                                </svg>
                                                    <span>Dew Point</span>
                                                    <span class="fw-bold ps-3">${item.dewpoint_f}°</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </li>`;
                })
            }

            // collapse
            const btnDown = document.querySelectorAll("#hourlyWeather .angleDown button");

            btnDown.forEach(item => {
                item.addEventListener("click", e => {
                    if (item.parentElement.parentElement.nextElementSibling.style.maxHeight === "") {
                        item.parentElement.parentElement.nextElementSibling.style.maxHeight = '150px';
                        item.parentElement.parentElement.nextElementSibling.style.paddingTop = '25px';
                        item.firstElementChild.style.display = 'none';
                        item.parentElement.previousElementSibling.firstElementChild.style.display = 'block';
                    } else {
                        item.parentElement.parentElement.nextElementSibling.style.maxHeight = '0px';
                        item.parentElement.parentElement.nextElementSibling.style.paddingTop = '0px';
                        item.firstElementChild.style.display = 'block';
                        item.parentElement.previousElementSibling.firstElementChild.style.display = 'none';
                    }
                })
            })
        })
        .catch
        (err => alert('You entered Wrong city name'))
    console.log(api);

    const fiveDaysApi = fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputVal}&days=5&aqi=no&alerts=yes`)
        .then
        ((response) => response.json())
        .then
        ((data) => {
            console.log(data);
            const name = data.location.name;
            const country = data.location.country;
            const forecast = data.forecast.forecastday;

            dailyForecast.innerHTML = `<div class="container-fluid row">
                <div class="col-12 mb-4 fs-6">
                    <h3>Daily Forecast for ${name}, ${name}, ${country}</h3>
                </div>
                <div class="col-12 d-flex justify-content-evenly pt-3 mb-2" id="future">
                </div>
                </div>`;

            const future = document.querySelector("#dailyForecast #future");
            forecast.forEach(element => {
                future.innerHTML += `
                    <div class="col-2 d-flex flex-column justify-content-center align-items-center forecastBox">
                    <h4>${element.date}</h4>
                    <span class="fs-1 text-primary">${element.day.maxtemp_f}°</span>
                    <span class="text-primary">${element.day.mintemp_f}°</span>
                    <span><img src="${element.day.condition.icon}" width="50px" height="50px"></span>
                    <span>${element.day.daily_chance_of_rain}%</span>
                    </div>`
            });
        })
        .catch
        (err => alert('You entered Wrong city name'))
    console.log(fiveDaysApi);
}