import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/orgs/register';
import { authenticate } from '../controllers/orgs/authenticate';
import { refresh } from '../controllers/orgs/refresh';
import { adopt } from '../controllers/orgs/adopt';

export async function orgsRoutes(app: FastifyInstance){
    // Register a org
    app.post('/orgs', register);
    // Authenticate
    app.post('/orgs/sessions', authenticate);
    app.patch('/orgs/refresh', refresh);

    app.post('/orgs/adopt/:whatsApp', adopt);
}
