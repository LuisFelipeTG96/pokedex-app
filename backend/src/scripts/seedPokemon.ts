import { getOrFetchPokemonData } from '../services/pokemonService';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function seedPokemonData() {
    for (let pokemonId = 1; pokemonId <= 151; pokemonId++) {
        try {
            await getOrFetchPokemonData(pokemonId);
            console.log(`Successfully seeded Pokémon ID ${pokemonId}`);
        } catch (error) {
            console.error(`Error seeding Pokémon ID ${pokemonId}:`, error);
        }
        await delay(300);
    }
}

seedPokemonData();