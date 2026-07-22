export interface PokemonData {
    id: number;
    name: string;
    pokedexDescription: string;
    pokedexNumber: number;
    spriteUrl: string;
    homeUrl: string;
    types: string[];
    generation: number;
    evolutionLine: string[];
}