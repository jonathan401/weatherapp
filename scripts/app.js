const form = document.querySelector('.change-location');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('.card-img img');
const icon = document.querySelector('.card-icon img');

// displayError function
const displayError = errMessage => {
    card.innerHTML = `${errMessage}`;
};

// updateUi function to update the dom when the data arrives
const updateUI = (data) => {
    const { current, location} = data;
    details.innerHTML = `
        <h2>${location.name}</h2>
        <h2>${location.country}</h2>
        <p>${current.condition.text}</p>
        <p>${current.temp_c}&deg;c</p>
    `;

    // setting the icon image
    const iconSrc = `${current.condition.icon}`;
    card-icon.setAttribute('src', iconSrc);

// setting the image of the card to the time of the request
    let timeSrc = current.is_day ? 'images/day.svg' : 'images/night.svg';
    time.setAttribute('src', timeSrc); 

    if(card.classList.contains('hide')){
        card.classList.remove('hide');
    }
    console.log(data);

};

form.addEventListener('submit', e => {
    e.preventDefault();
    const cityName = form.city.value.trim();
    form.reset();
    if(!cityName.length){
        displayError('You must enter a city name!');
    } else {
        getCityInfo(cityName)
        .then(data => updateUI(data))
        .catch(err => displayError(err.message));
    }
    // calling the getCityInfo function that will take the city name and fetch the data for that city
    
});