import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeRegisterUseCase } from '@/use-cases/factories/orgs/make-register-use-case';

export async function register  (request:FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        whatsApp: z.string(),
    });
    const {
        name,
        email,
        password,
        whatsApp,
    } = registerBodySchema.parse(request.body);

    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
        name,
        email,
        password,
        whatsApp,
    });

    return reply.status(201).send();
}