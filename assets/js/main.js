const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick='openPokemonModal(${ JSON.stringify(pokemon) })'>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemonToDetail(pokemon){
    return `
        <div class="pokemon-detail ${pokemon.type}">
        <div class="detail">
            
            <span class="close-pokemon-modal" onclick="closePokemonModal()"><b>&larr;</b></span>
            <span class="hearts"><b>&hearts;</b></span>
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
             
            </div>
            
            <img class:"pokemon-photo" src="${pokemon.photo}" alt="${pokemon.name}">

            <div class="pokemon-about">
                <ul>
                    <h3>About</h3>
                    <li>Height:   <strong>${ pokemon.height }</strong></li>
                    <li>Species Name:   <strong>${ pokemon.speciesName }</strong></li>
                    <li>Abilities:   <strong>${ pokemon.abilities.join(', ') }</strong></li>
                </ul>
            </div>
        </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})