const searchInput = document.getElementById('search'); // les id HTML
const results = document.getElementById('results'); // les id HTML

let countries;
let searchTerm = ''; // variable pour l'imput qui va chercher les pays

// API REQUEST
const fetchCountries = async () => {
	countries = await fetch(
		'https://restcountries.eu/rest/v2/all?fields=name;population;flag')
		.then(res =>res.json());
	//console.log(countries); // prouve que l'API a bien chargée les données
};


//fetchCountries(); // on va créer une fonction qui va utiliser cette fonction.

const showCountries = async() => {
	await fetchCountries();

	results.innerHTML = (

		countries
			.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()
			))
			.map(country => (
				// pour écrire du HTML dans JS
				`
					<li class="country-item">
						<img class="country-flag" src="${country.flag}" />
						<h3 class="country-name">${country.name}</h3>
						<div class="country-info">
							<h2 class="country-population">${numberWithSpace(country.population)}</h2>
							<h5 class="country-population-text">Habitants</h5>
						</div>
					</li>		
				`
			)).join('')//pour eviter les virgules
	);
};

showCountries();

// INPUT SETUP

searchInput.addEventListener('input', (e) => {
	searchTerm = e.target.value;
	showCountries(); // a chaque lettre saisie une recherche est relancée
});

function numberWithSpace(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); //séparateur des milliers
}