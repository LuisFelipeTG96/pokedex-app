import { Request, Response } from 'express';
import { getAllPokemon, getPokemonById } from '../models/pokemonModel';
import { getOrFetchPokemonData } from '../services/pokemonService';

export async function getAllPokemonController(req: Request, res: Response) {
    try {
        const { type, generation } = req.query;
        const pokemon = await getAllPokemon({
            ...(type && { type: String(type) }),
            ...(generation && { generation: Number(generation) }),
        });
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Pokémon' });
    }
}

export async function getPokemonByIdController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const pokemon = await getOrFetchPokemonData(Number(id));
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Pokémon' });
    }
}