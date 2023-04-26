import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeRegisterUseCase } from '@/use-cases/factories/address/make-register-use-case';

export async function register  (request:FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        cep: z.string(),
        street: z.string(),
        number: z.number(),
        city: z.string(),
        state: z.string(),
        complement: z.string().optional(),
        orgId: z.string(),
    });
    const {
        cep,
        street,
        number,
        city,
        state,
        complement,
        orgId,
    } = registerBodySchema.parse(request.body);

    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
        cep,
        street,
        number,
        city,
        state,
        complement,
        orgId,
    });

    return reply.status(201).send();
}