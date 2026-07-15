import { Router } from 'express';
import { getAllPokemonController, getPokemonByIdController } from '../controllers/pokemonController';

const router = Router();

router.get('/', getAllPokemonController);
router.get('/:id', getPokemonByIdController);

export default router;