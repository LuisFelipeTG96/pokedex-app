import { Router } from 'express';
import pokemonRoutes from './pokemonRoutes';

const router = Router();

router.use('/pokemon', pokemonRoutes);

export default router;