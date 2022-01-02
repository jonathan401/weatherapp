const form = document.querySelector('.change-location');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const loader = document.querySelector('.card .preload');
const time = document.querySelector('.card-img img');
const icon = document.querySelector('.card-icon img');

// displayError function
const displayError = errMessage => {
    card.innerHTML = `${errMessage}`;
};

// updateUi function to update the dom when the data arrives
const updateUI = (data) => {
    const { current, location} = data;
    // setting the icon image
    const iconSrc = `${current.condition.icon}`;
    icon.setAttribute('src', iconSrc);

// setting the image of the card to the time of the request
    let timeSrc = current.is_day ? 'images/day.svg' : 'images/night.svg';
    time.setAttribute('src', timeSrc); 
    details.innerHTML = `
        <h2>${location.name}</h2>
        <h2>${location.country}</h2>
        <p>${current.condition.text}</p>
        <p>${current.temp_c}&deg;c</p>
    `;
    
    loader.classList.add('hide');
    /* after the data has been gotten from the api, the loader is given a class of 'hide' which gives the 
    element a display of none.*/    
    if(card.classList.contains('hide')){
        card.classList.remove('hide');
    }
}

// handling the user input
form.addEventListener('submit', e => {
    e.preventDefault();
    const cityName = form.city.value.trim();
    form.reset();
    loader.classList.remove('hide');
    /* immediately the user has submitted the form, then the loader is shown to make the user wait 
    for the request to be processed this is done by removing the class that hides the preloader*/
    if(!cityName.length){
        displayError('You must enter a city name!');
    } else {
        getCityInfo(cityName)
        .then(data => updateUI(data))
        .catch(err => displayError(err.message));
    }
    // calling the getCityInfo function that will take the city name and fetch the data for that city
    
});