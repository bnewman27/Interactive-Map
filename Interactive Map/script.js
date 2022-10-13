// map object
const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

	// build leaflet map
	buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 11,
		});
		// add openstreetmap tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
		}).addTo(this.map)
		// create and add geolocation marker
		const marker = L.marker(this.coordinates)
		marker
		.addTo(this.map)
		.bindPopup('<p1><b>You are here</b><br></p1>')
		.openPopup()
	},

	// add business markers
}

// get coordinates via geolocation api
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

// get foursquare businesses
async function getFoursquare(business) {
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'fsq3MPtP15t593+pK5SlCTo4eD+RrP4B3xfYZnM/P6uHYo8='
    }
  };
      let lat = myCoorinates[0]
      let long = myCoorinates[1]
      let limit = 5
  fetch('https://api.foursquare.com/v3/places/search?query=place%20type&ll=%28latitude%2C%20longitufe&limit=5', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
    return businesses
}
// process foursquare array
function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}


// event handlers
// window load
window.onload = async () => {
	const coords = await getCoords()
	console.log(coords)
	myMap.coordinates = coords
	myMap.buildMap()
}

// business submit button
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	console.log(business)
})