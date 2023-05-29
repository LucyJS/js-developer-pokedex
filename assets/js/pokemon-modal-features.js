function pokemonModal(){
    openPokemonModal();    
}

function openPokemonModal(pokemon){
    const modal = document.getElementById('pokemonModal');
    modal.style.top = "0%";

    const detailHtml = convertPokemonToDetail(pokemon);
    const modalContent = modal.querySelector('#modal-content');
    modalContent.innerHTML = detailHtml;
}

function closePokemonModal(){
    document.getElementById('pokemonModal').style.top = "-100%";    
}   