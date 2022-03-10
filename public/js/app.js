console.log('java script loaded')


const weatherForm = document.querySelector('form')
weatherForm.addEventListener('submit', (e) => {

    e.preventDefault(); console.log('working');

    let getValue = document.getElementById('searchInput').value;
    document.getElementById('myWeather').innerHTML = 'Loading....';

    fetch(`/weather?location=${getValue}`).then(response => {
        return response.json();
    }).then(data => {

        if (data.error) {
            document.getElementById('myWeather').innerHTML = data.error;
        }
        else {
            document.getElementById('myWeather').innerHTML = `Place: ${data.features[0].place_name} <br/> latti:${data.features[0].center[0]} <br/> long:${data.features[0].center[1]} `
        }
    })
})



