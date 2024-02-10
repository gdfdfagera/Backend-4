const axios = require('axios');

const ITEMS_PER_PAGE = 10;

const getPokemons = async (userRequest) => {
    try {
        const page = userRequest.query.page || 1;
        const offset = (page - 1) * ITEMS_PER_PAGE;
    
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`);
        const pokemonList = response.data.results;
    
        const pokemonDataArray = [];
    
        for (const pokemon of pokemonList) {
          const pokemonInfo = await axios.get(pokemon.url);
          const pokemonData = pokemonInfo.data;
    
          pokemonDataArray.push({
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            height: pokemonData.height,
            weight: pokemonData.weight,
            abilities: pokemonData.abilities.map((ability) => ability.ability.name),
          });
        }
    
        return {pokemonDataArray, page};
      } catch (error) {
        console.error('Error fetching Pokemon information:', error.message);
        return;
      }
};

const getSpecialPokemon = async (userRequest) => {
  try {
      const pokemonName = userRequest.body.name;

      if (!pokemonName) {
          throw new Error('Pokemon name is missing in the request.');
      }

      const pokemonInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const pokemonData = pokemonInfo.data;

      const pokemon = {
          name: pokemonData.name,
          image: pokemonData.sprites.front_default,
          height: pokemonData.height,
          weight: pokemonData.weight,
          abilities: pokemonData.abilities.map((ability) => ability.ability.name),
      };
      
      return { pokemon };
  } catch (error) {
      console.error('Error fetching Pokemon:', error.message);
      return { error: error.message };
  }
};

const getNumberFact = async (userRequest) => {
  const number = userRequest.body.number;
  try {
    const response = await axios.get(`http://numbersapi.com/${number}`);
    const trivia = response.data;

    return trivia;
  } catch (error) {
    console.error('Error fetching fact information');
    return;
  }
};



module.exports = { 
  getPokemons,
  getNumberFact,
  getSpecialPokemon
};