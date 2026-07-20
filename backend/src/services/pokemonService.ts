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

export async function transformPokemonData(pokemonId: number) {

    try{
        const pokemonData = await fetchPokemonData(pokemonId);
        const speciesData = await fetchPokemonSpeciesData(pokemonId);

        const transformedData = {
            id: pokemonData.id,
            name: pokemonData.name,
            pokedexDescription: speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en')?.flavor_text || 'No description available.',
            pokedexNumber: speciesData.pokedex_numbers.find((entry: any) => entry.pokedex.name === 'national')?.entry_number || pokemonData.id,
            spriteUrl: pokemonData.sprites.front_default,
            homeUrl: pokemonData.sprites.other.home.front_default,
            types: pokemonData.types.map((typeInfo: any) => typeInfo.type.name),
            generation: Number(speciesData.generation.url.split('/').filter(Boolean).pop()),
        }
        
        return transformedData;

    } catch (error) {
        console.error(`Error transforming data for Pokémon ID ${pokemonId}:`, error);
        throw error;
    }
}