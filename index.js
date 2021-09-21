const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regexp = new RegExp(wordToMatch, 'gi');
        return place.city.match(regexp) || place.state.match(regexp);
    })
}

function displayMatches() {
  let newList = findMatches(this.value, cities);
  let oldlist = "";
  newList.forEach(found => {
      let regex = new RegExp(this.value, 'gi');
      let cityName = found.city.replace(regex, `<span class="hl">${this.value}</span> `);
      let stateName = found.state.replace(regex, `<span class="hl">${this.value}</span> `);  
      console.log(stateName);
      oldlist += 
        `<li>
            <ul>
              <li>${cityName}, ${stateName}</li>
              <li>Population - ${found.population}</li>
              <li>GDP - ${found.growth_from_2000_to_2013} </li>
            </ul>
        </li>`;
  });
  suggestions.innerHTML = oldlist;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);