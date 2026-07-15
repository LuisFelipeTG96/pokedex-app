import axios from 'axios';

export async function fetchPokemonData(pokemonId: number) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for Pokémon ID ${pokemonId}:`, error);
        throw error;
    }
}

export async function fetchPokemonSpeciesData(pokemonId: number) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching species data for Pokémon ID ${pokemonId}:`, error);
        throw error;
    }
}