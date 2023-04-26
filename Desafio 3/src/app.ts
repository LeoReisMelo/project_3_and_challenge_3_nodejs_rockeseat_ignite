import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from '@/env';
import { petsRoutes } from '@/http/routes/petsRoutes';
import { addressRoutes } from '@/http/routes/addressRoutes';
import { orgsRoutes } from '@/http/routes/orgsRoutes';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '10m',
    }
});
app.register(fastifyCookie);

// Routes
app.register(petsRoutes);
app.register(addressRoutes);
app.register(orgsRoutes);

app.setErrorHandler((err, _, reply) => {
    if (err instanceof ZodError) {
        return reply.status(400).send({message: 'Validation error', issues: err.format() });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(err);
    } else {
        //TODO: Here we should log to an external tool like DataDog/Sentry
    }

    return reply.status(500).send({ message: 'Internal Server Error' });
});