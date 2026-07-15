import prisma from '../config/prisma';

export async function getAllPokemon() {
    return prisma.pokemon.findMany();
}

export async function getPokemonById(id: number) {
    return prisma.pokemon.findUnique({
        where: { id },
    });
}
