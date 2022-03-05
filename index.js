const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

const spriteDisplayed = document.getElementById("pokemon-sprite");
const nameDisplayed = document.getElementById("pokemon-name");
const indexDisplayed = document.getElementById("pokemon-index");
const typeDisplayed = document.getElementById("pokemon-type");
const abilityDisplayed = document.getElementById("pokemon-ability");
const movesDisplayed = document.getElementById("pokemon-moves");
const heightDisplayed = document.getElementById("pokemon-height");
const weightDisplayed = document.getElementById("pokemon-weight");
const baseDisplayed = document.getElementById("pokemon-base");

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

fetchPokemon(apiUrl, 212);

async function fetchPokemon(url, pokemon) {
    let urlSearch = url + pokemon;
    const response = await fetch(urlSearch);

    if (!response.ok) {
        alert('This pokemon name or index does not exist. Try another one.');
        return;
    }

    const responseJson = await response.json();

    console.log(responseJson);

    nameDisplayed.innerText = responseJson.name;
    heightDisplayed.innerText = responseJson.height;
    weightDisplayed.innerText = responseJson.weight;
    baseDisplayed.innerText = responseJson.base_experience;
    indexDisplayed.innerText = responseJson.id;

    let typesLength = responseJson.types.length;
    let abilityLength = responseJson.abilities.length;
    let movesLength = responseJson.moves.length;
    let abilityString = '';
    let movesList = '';

    if (typesLength > 1) {
        typeDisplayed.innerText = responseJson.types[0].type.name + ', ' + responseJson.types[1].type.name;
    } else {
        typeDisplayed.innerText = responseJson.types[0].type.name;
    }

    if (abilityLength > 1) {
        for (let i = 0; i < abilityLength; i++) {
            if (i !== abilityLength - 1) {
                abilityString += responseJson.abilities[i].ability.name + ', ';
            } else {
                abilityString += responseJson.abilities[i].ability.name;
            }
        }
        abilityDisplayed.innerText = abilityString;
    } else {
        abilityDisplayed = abilityDisplayed += responseJson.abilities[0].ability.name;
    }

    for (i = 0; i < movesLength; i++) {
        movesList += "<li>" + responseJson.moves[i].move.name + "</li>";
    }
    movesDisplayed.innerHTML = movesList;

    spriteDisplayed.src = responseJson.sprites.front_default;

}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchPokemon(apiUrl, searchInput.value.toLowerCase());
    searchInput.value = '';
});