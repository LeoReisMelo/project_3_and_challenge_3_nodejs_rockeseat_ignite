import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/address/register';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export async function addressRoutes(app: FastifyInstance){
    app.addHook('onRequest', verifyJWT);
    // Register a address
    app.post('/address', { onRequest: [verifyUserRole('ADMIN')] }, register);
}
