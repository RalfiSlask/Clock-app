const quote_container = document.querySelector(".quote-container");
const more_container = document.querySelector(".more-container");
const button_moreless = document.querySelector(".icon");
const button_text = document.querySelector(".moreless");
const time_container = document.querySelector(".time-container");
const local = document.querySelector(".location");
const clock_panel = document.querySelector(".clock-panel");
const greeting = document.querySelector(".greeting");
const greeting_logo = document.querySelector(".greeting-logo");
const image = document.querySelector(".image");



let buttonclicked = false;

// adding a clicking event to the button

button_moreless.onclick = () => {
    quote_container.classList.toggle("hidden");
    more_container.classList.toggle("hidden");
    if(buttonclicked == false) {
        button_moreless.classList.add("less");
        button_moreless.classList.remove("more");
        button_text.innerHTML = "LESS";
        button_moreless.innerHTML = `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" class="arrow"><g fill="none" fill-rule="evenodd"><circle fill="#303030" cx="20" cy="20" r="20"/><path stroke="#FFF" stroke-width="2" d="M14 23l6-6 6 6"/></g></svg>`
        buttonclicked = true;
       
    } else if(buttonclicked == true){
        button_moreless.classList.remove("less");
        button_moreless.classList.add("more");
        button_text.innerHTML = "MORE";
        button_moreless.innerHTML = `<svg width="14" height="9" xmlns="http://www.w3.org/2000/svg" class="arrow"><path stroke="#FFF" stroke-width="2" fill="none" d="m1 1 6 6 6-6"/></svg>`
        buttonclicked = false;
       
    }
}

// async function for getting the random quotes

const getQuoteAPI = async () => {
    try {
        const url = "https://api.quotable.io";
        const endpoint = "/random"; // for random quote
        const apiUrl = `${url}${endpoint}`;
        const response = await fetch(apiUrl);
        const jsonResponse = await response.json();
        const author = jsonResponse.author;
        const quote = jsonResponse.content;

        // adding html and variables from the quote API into the quote container in the top left corner
        quote_container.innerHTML = 
        `<div class="quote-panel">
            <p class="quote">"${quote}"</p>
            <div class="refresh-quote">
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" class="refresh"><path d="M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z" fill="#FFF" fill-rule="nonzero" opacity=".5"/></svg>
            </div>
        </div>
        <div class="quote-name">${author}</div>`
    //  getting a new quote when clicking refresh
        let refresh = document.querySelector(".refresh-quote");
        refresh.onclick = () => {
            getQuoteAPI();
        }
    } catch(error) {
        console.log(error);
    }
}

getQuoteAPI();

const getTime = async () => {
    try {
        const url = "http://worldtimeapi.org/api/ip"
        const response = await fetch(url);
        const jsonResponse = await response.json();

        // creating variables from API
        const abbreviation = jsonResponse.abbreviation;
        const daow = jsonResponse.day_of_week;
        const daoy = jsonResponse.day_of_year;
        const timezone = jsonResponse.timezone;
        const timezones = timezone.split("/")
        const continent = timezones[0];
        const city = timezones[1];
        const datetime = jsonResponse.datetime;

        // slicing the datetime data at specific indexes to only get the current time
        const time = datetime.slice(11, 16); 

        // converting time variable to a number for use in later conditionals
        const timenumber = Number(time.replace(":", "."))

        // getting weeknumber from currentDate
        currentDate = new Date();
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        const days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));
        const weekNumber = Math.ceil(days / 7);

        // changing the greeting logo depending on these times: 
        // sun icon 5am - 6pm
        // moon icon 6pm - 5am
        if(timenumber < 5) {
            greeting_logo.innerHTML = `<svg width="23" height="24" xmlns="http://www.w3.org/2000/svg" class="moon"><path d="M22.157 17.366a.802.802 0 00-.891-.248 8.463 8.463 0 01-2.866.482c-4.853 0-8.8-3.949-8.8-8.8a8.773 8.773 0 013.856-7.274.801.801 0 00-.334-1.454A7.766 7.766 0 0012 0C5.382 0 0 5.382 0 12s5.382 12 12 12c4.2 0 8.02-2.134 10.218-5.709a.805.805 0 00-.061-.925z" fill="#FFF" fill-rule="nonzero"/></svg>`
        } else if(timenumber <= 18) {
            greeting_logo.innerHTML = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="sun"><path d="M11.78 19.417c.594 0 1.083.449 1.146 1.026l.006.125v1.842a1.152 1.152 0 01-2.296.125l-.007-.125v-1.842c0-.636.516-1.151 1.152-1.151zM6.382 17.18a1.15 1.15 0 01.09 1.527l-.09.1-1.302 1.303a1.152 1.152 0 01-1.718-1.528l.09-.1 1.302-1.302a1.15 1.15 0 011.628 0zm12.427 0l1.303 1.303a1.15 1.15 0 11-1.628 1.627L17.18 18.81a1.15 1.15 0 111.628-1.628zM11.781 5.879a5.908 5.908 0 015.901 5.902 5.908 5.908 0 01-5.901 5.902 5.908 5.908 0 01-5.902-5.902 5.908 5.908 0 015.902-5.902zm10.63 4.75a1.151 1.151 0 110 2.303h-1.843a1.151 1.151 0 110-2.303h1.842zm-19.418 0a1.151 1.151 0 01.126 2.296l-.125.007H1.15a1.151 1.151 0 01-.125-2.296l.125-.007h1.842zm1.985-7.268l.1.09 1.303 1.302a1.151 1.151 0 01-1.528 1.718l-.1-.09L3.45 5.08A1.15 1.15 0 014.978 3.36zm15.133.09c.45.449.45 1.178 0 1.628L18.808 6.38a1.151 1.151 0 11-1.628-1.628l1.303-1.303c.449-.449 1.178-.449 1.628 0zM11.781 0c.636 0 1.151.515 1.151 1.151v1.843a1.152 1.152 0 01-2.303 0V1.15C10.63.515 11.145 0 11.781 0z" fill="#FFF" fill-rule="nonzero"/></svg>`
        }

        // changing the greeting depending on these times: 
        // - "Good morning" between 5am and 12pm
        // - "Good afternoon" between 12pm and 6pm
        // - "Good evening" between 6pm and 5am
        let greet = "";
        if(timenumber < 12) {
            greet = "GOOD MORNING"
        } else if(timenumber < 18) {
            greet = "GOOD AFTERNOON";
        } else if(timenumber < 24) {
            greet = "GOOD EVENING";
        }

        // changing background image depending on if it is evening or not
        if(greet == "GOOD EVENING") {
            image.style.backgroundImage = "url(./assets/desktop/bg-image-nighttime.jpg)"
        } else {
            image.style.backgroundImage = "url(./assets/desktop/bg-image-daytime.jpg)"
        }

        // adding HTML and the variables for the greeting and time
        clock_panel.innerHTML = `<div class="time">${time}</div>
        <p class="time-zone">${abbreviation}</p>`
        greeting.innerHTML = `${greet}, ITS CURRENTLY`

        // for the container that opens up when we press more button
        more_container.innerHTML = 
        `<div class="more-panel">
        <div class="left-container">
            <div class="panel panel--currtime">
            <div class="heading">CURRENT TIMEZONE</div>
            <div class="text curr-timezone">${continent}/${city}</div>
            </div>
            <div class="panel panel--doty">
            <div class="heading">DAY OF THE YEAR</div>
            <div class="text doty">${daoy}</div>
            </div>
        </div>
        <div class="line"></div>
        <div class="right-container">
            <div class="panel panel--dotw">
            <div class="heading">DAY OF THE WEEK</div>
            <div class="text dotw">${daow}</div>
            </div>
            <div class="panel panel--weeknumb">
            <div class="heading">WEEK NUMBER</div>
            <div class="text weeknumb">${weekNumber}</div>
            </div>
        </div>
    </div>`
    } catch(error) {
        console.log(error);
    }
}

getTime();

/* setInterval(getTime, 1000); */

const getCountryCity = async () => {
    try {
        const apiKey = "dbZcjQmiWzM0ZmdwgFkR35vOuEV1vfK3ajIz3HZz";
        const url = "https://api.ipbase.com/v2/info?apikey=";
        const urlToFetch = `${url}${apiKey}`
        const response = await fetch(urlToFetch);
        const jsonResponse = await response.json();

        // country and city data from the API
        const country = jsonResponse.data.location.country.alpha2;
        const city = jsonResponse.data.location.city.name;

        // appending this data to the text under 
        local.innerHTML = `IN ${city}, ${country}`
        console.log(city)
    } catch (error) {
        console.log(error);
    }
}

getCountryCity();