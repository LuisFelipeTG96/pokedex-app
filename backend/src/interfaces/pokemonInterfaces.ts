export interface FlavorTextEntry {
    flavor_text: string;
    language: {
        name: string;
    };
}

export interface PokedexNumber {
    entry_number: number;
    pokedex: {
        name: string;
    };
}

export interface TypeInfo {
    type: {
        name: string;
    };
}