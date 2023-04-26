import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeRegisterUseCase } from '@/use-cases/factories/pets/make-register-use-case';

export async function register  (request:FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        description: z.string().optional(),
        age: z.enum(['CUB', 'LITTLE', 'ADULT']),
        bearing: z.enum(['SMALL', 'MEDIUM', 'BIG']),
        energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
        independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
        habitat: z.enum(['SMALL', 'MEDIUM', 'WIDE']),
        images: z.string().array().optional(),
        requirementsForAdoption: z.string().array().optional(),
        orgId: z.string(),
    });
    const {
        name,
        description,
        age,
        bearing,
        energyLevel,
        independenceLevel,
        habitat,
        images,
        requirementsForAdoption,
        orgId
    } = registerBodySchema.parse(request.body);

    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
        name,
        description,
        age,
        bearing,
        energyLevel,
        independenceLevel,
        habitat,
        images,
        requirementsForAdoption,
        orgId
    });

    return reply.status(201).send();
}