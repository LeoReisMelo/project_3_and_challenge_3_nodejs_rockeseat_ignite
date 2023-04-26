import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeListUseCase } from '@/use-cases/factories/pets/make-list-use-case';

export async function list  (request:FastifyRequest, reply: FastifyReply) {
    const listQuerySchema = z.object({
        city: z.string(),
        age: z.enum(['CUB', 'LITTLE', 'ADULT']).optional(),
        bearing: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
        energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
        independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
        page: z.number().optional()
    });
    const {
        city,
        age,
        bearing,
        energyLevel,
        independenceLevel,
        page,
    } = listQuerySchema.parse(request.query);

    const listUseCase = makeListUseCase();

    const pets = await listUseCase.execute({
        city,
        age,
        bearing,
        energyLevel,
        independenceLevel,
        page,
    });

    return reply.status(200).send(pets);
}