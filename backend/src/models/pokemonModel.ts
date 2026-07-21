import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';

export async function getAllPokemon() {
    return prisma.pokemon.findMany({
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