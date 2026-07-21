import axios from 'axios';
import { EvolutionNode, FlavorTextEntry, PokedexNumber, TypeInfo } from '../interfaces/pokemonInterfaces';
import { createPokemon, getPokemonById } from '../models/pokemonModel';

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
        const evolutionChainData = await fetchEvolutionChainData(speciesData.evolution_chain.url);
        const completeEvolutionLine = flattenEvolutionChain(evolutionChainData.chain);
        const evolutionLineAux = completeEvolutionLine.filter(name => name !== pokemonData.name.toLowerCase());

        const transformedData = {
            id: pokemonData.id,
            name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
            pokedexDescription: (speciesData.flavor_text_entries.find((entry: FlavorTextEntry) => entry.language.name === 'en')?.flavor_text || 'No description available.').replace(/[\n\r\f]/g, ' ').replace(/\s+/g, ' ').trim(),
            pokedexNumber: speciesData.pokedex_numbers.find((entry: PokedexNumber) => entry.pokedex.name === 'national')?.entry_number || pokemonData.id,
            spriteUrl: pokemonData.sprites.front_default,
            homeUrl: pokemonData.sprites.other.home.front_default,
            types: pokemonData.types.map((typeInfo: TypeInfo) => typeInfo.type.name),
            generation: Number(speciesData.generation.url.split('/').filter(Boolean).pop()),
            evolutionLine: evolutionLineAux.map(name => name.charAt(0).toUpperCase() + name.slice(1)),
        }
        
        return transformedData;

    } catch (error) {
        console.error(`Error transforming data for Pokémon ID ${pokemonId}:`, error);
        throw error;
    }
}

export async function getOrFetchPokemonData(pokemonId: number) {

    try {
        const existingPokemon = await getPokemonById(pokemonId);
        if (existingPokemon) {
            return existingPokemon;
        } else {
            const transformedData = await transformPokemonData(pokemonId);
            const newPokemon = await createPokemon(transformedData);
            return newPokemon;
        }
    } catch (error) {
        console.error(`Error getting or fetching data for Pokémon ID ${pokemonId}:`, error);
        throw error;
    }

}

export async function fetchEvolutionChainData(evolutionChainUrl: string) {
    try {
        const response = await axios.get(evolutionChainUrl);
        return response.data;
    } catch (error) {
        console.error(`Error fetching evolution chain data from ${evolutionChainUrl}:`, error);
        throw error;
    }
}

export function flattenEvolutionChain(node: EvolutionNode): string[] {
    const names: string[] = [node.species.name];

    for (const child of node.evolves_to) {
        names.push(...flattenEvolutionChain(child));
    }

    return names;
}