import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/pets/register';
import { list } from '@/http/controllers/pets/list';
import { details } from '../controllers/pets/details';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export async function petsRoutes(app: FastifyInstance){
    // List pets by city
    app.get('/pets', list);
    // Get pet details
    app.get('/pets/:id', details);

    // Register a pet
    app.post('/pets', { onRequest: [verifyJWT, verifyUserRole('ADMIN')]} ,register);
}
