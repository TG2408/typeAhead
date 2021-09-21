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
      oldlist = `<li>${found.city}, ${found.state}</li>`;
  });
  suggestions.innerHTML = oldlist;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);