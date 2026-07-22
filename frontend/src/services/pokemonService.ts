import axios from 'axios';

export async function getAllPokemon() {
    const response = await axios.get('http://localhost:3000/api/pokemon');
    return response.data;
}