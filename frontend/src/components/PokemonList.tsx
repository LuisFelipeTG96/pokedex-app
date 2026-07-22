import { useState, useEffect } from 'react';
import { getAllPokemon } from '../services/pokemonService';
import type { PokemonData } from '../types/pokemonTypes';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  
    useEffect(() => {
        getAllPokemon()
            .then(pokemonData => setPokemonList(pokemonData))
            .catch(error => console.error('Error fetching Pokémon data:', error));
    }, []);

    return (
        <ul>
            {pokemonList.map(pokemon => (
                <li key={pokemon.id}>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.spriteUrl} alt={pokemon.name} />
                    <img src={pokemon.homeUrl} alt={pokemon.name} />
                    <p>{pokemon.pokedexDescription}</p>
                    <p>Types: {pokemon.types.join(', ')}</p>
                    <p>Generation: {pokemon.generation}</p>
                    <p>Pokedex Number: {pokemon.pokedexNumber}</p>
                    <p>Evolution Line: {pokemon.evolutionLine.join(' → ')}</p>
                </li>
            ))}
        </ul>
    );
}

export default PokemonList;