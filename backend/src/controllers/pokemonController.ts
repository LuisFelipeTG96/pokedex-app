import { Request, Response } from 'express';
import { getAllPokemon, getPokemonById } from '../models/pokemonModel';
import { getOrFetchPokemonData } from '../services/pokemonService';

export async function getAllPokemonController(req: Request, res: Response) {
    try {
        const pokemon = await getAllPokemon();
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Pokémon' });
    }
}

export async function getPokemonByIdController(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const pokemon = await getOrFetchPokemonData(Number(id));
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Pokémon' });
    }
}