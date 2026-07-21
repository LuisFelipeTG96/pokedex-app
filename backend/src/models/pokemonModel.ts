import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';

export async function getAllPokemon(filters?: { type?: string; generation?: number }) {
    return prisma.pokemon.findMany({
        where: {
            ...(filters?.type && { types: { has: filters.type } }),
            ...(filters?.generation && { generation: filters.generation }),
        },
        orderBy: {
            pokedexNumber: 'asc',
        },
    });
}

export async function getPokemonById(id: number) {
    return prisma.pokemon.findUnique({
        where: { id },
    });
}

export async function createPokemon(transformedData: Prisma.PokemonCreateInput) {
    return prisma.pokemon.create({
        data: transformedData,
    });
}