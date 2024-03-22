// Obtener lista de Pokémon
async function getPokemonList() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error al obtener la lista de Pokémon:', error);
    }
  }
  
  
  function filterPokemonByName(pokemonList, searchTerm) {
    return pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  
  
  async function renderPokemonList() {
    const pokemonListContainer = document.getElementById('pokemonList');
    const searchInput = document.getElementById('searchInput');
    const pokemons = await getPokemonList();
  
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.trim();
      const filteredPokemons = filterPokemonByName(pokemons, searchTerm);
      displayPokemonCards(filteredPokemons);
    });
  
    displayPokemonCards(pokemons);
  }
  
  
async function displayPokemonCards(pokemons) {
    const pokemonListContainer = document.getElementById('pokemonList');
    pokemonListContainer.innerHTML = '';
  
    for (const pokemon of pokemons) {
      const card = document.createElement('div');
      card.classList.add('card');
  
      const pokemonName = document.createElement('h2');
      pokemonName.classList.add("jumping-heading");
      pokemonName.textContent = pokemon.name;
  
      const pokemonImg = document.createElement('img');
      pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`;
      pokemonImg.alt = pokemon.name;
  
      const types = await getPokemonTypes(pokemon.url);
      const pokemonType = document.createElement('p');
      pokemonType.textContent = `Tipo: ${types.map(type => mapTypeToSpanish(type)).join(', ')}`;
  
      card.appendChild(pokemonImg);
      card.appendChild(pokemonName);
      card.appendChild(pokemonType);
  
      card.addEventListener('click', () => {
        showPokemonDetails(pokemon.url);
      });
  
      pokemonListContainer.appendChild(card);
    }
  }
  

  function mapTypeToSpanish(type) {
    const typeMap = {
      normal: 'Normal',
      fighting: 'Lucha',
      flying: 'Volador',
      poison: 'Veneno',
      ground: 'Tierra',
      rock: 'Roca',
      bug: 'Bicho',
      ghost: 'Fantasma',
      steel: 'Acero',
      fire: 'Fuego',
      water: 'Agua',
      grass: 'Planta',
      electric: 'Eléctrico',
      psychic: 'Psíquico',
      ice: 'Hielo',
      dragon: 'Dragón',
      dark: 'Siniestro',
      fairy: 'Hada'
    };
  
    return typeMap[type] || type;
  }
  
  
  
  async function getPokemonTypes(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const types = data.types.map(type => type.type.name);
      return types;
    } catch (error) {
      console.error('Error al obtener los tipos del Pokémon:', error);
      return [];
    }
  }
  
  
  
  function getPokemonId(url) {
    const id = url.split('/').filter(part => part.trim() !== '').pop();
    return id;
  }
  
  
  
async function showPokemonDetails(url) {
    try {
      const response = await fetch(url);
      const pokemon = await response.json();
  
      const modal = document.getElementById('modal');
      modal.innerHTML = '';
  
      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');
  
      const closeBtn = document.createElement('button');
      closeBtn.classList.add('close');
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
  
      const pokemonName = document.createElement('h2');
      pokemonName.textContent = pokemon.name;
  
      const pokemonImg = document.createElement('img');
      pokemonImg.src = pokemon.sprites.front_default;
  
      const pokemonHeight = document.createElement('p');
      pokemonHeight.textContent = `Altura: ${pokemon.height}`;
  
      const pokemonWeight = document.createElement('p');
      pokemonWeight.textContent = `Peso: ${pokemon.weight}`;
  
      const pokemonId = document.createElement('p');
      pokemonId.textContent = `ID: ${pokemon.id}`;
  
      const pokemonMoves = document.createElement('p');
      pokemonMoves.textContent = `Movimientos: ${pokemon.moves.map(move => move.move.name).join(', ')}`;
  
      modalContent.appendChild(closeBtn);
      modalContent.appendChild(pokemonName);
      modalContent.appendChild(pokemonImg);
      modalContent.appendChild(pokemonHeight);
      modalContent.appendChild(pokemonWeight);
      modalContent.appendChild(pokemonId);
      modalContent.appendChild(pokemonMoves);
      modal.appendChild(modalContent);
  
      modal.style.display = 'block';
    } catch (error) {
      console.error('Error al obtener los detalles del Pokémon:', error);
    }
  }
  
  
  
  
  renderPokemonList();
  