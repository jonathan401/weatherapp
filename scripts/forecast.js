const key = '936999ca2a95457eafd162318211212';

const getCityInfo = async (city) => {
    const base = 'http://api.weatherapi.com/v1/';
    const method = 'current.json';
    const query = `?key=${key}&q=${city}&aqi=no`;
    const response = await fetch(base + method + query);
    if(response.status !== 200){
        throw new Error('an error occurred while processing your request');
    }
    const data = await response.json();
    return data;
};

