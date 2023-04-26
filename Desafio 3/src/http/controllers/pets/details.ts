import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeDetailsUseCase } from '@/use-cases/factories/pets/make-details-use-case';

export async function details  (request:FastifyRequest, reply: FastifyReply) {
    const detailsParamsSchema = z.object({
        id: z.string(),
    });
    const {
        id,
    } = detailsParamsSchema.parse(request.params);

    const detailsUseCase = makeDetailsUseCase();

    const pet = await detailsUseCase.execute({
        id
    });

    return reply.status(200).send(pet);
}