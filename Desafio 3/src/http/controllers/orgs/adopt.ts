import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeAdoptUseCase } from '@/use-cases/factories/orgs/make-adopt-use-case';
import { InvalidWhatsAppNumberError } from '@/use-cases/errors/invalid-whatsapp-number-error';

export async function adopt  (request:FastifyRequest, reply: FastifyReply) {
    try{
        const adoptParamsSchema = z.object({
            whatsApp: z.string(),
        });
        const {
            whatsApp,
        } = adoptParamsSchema.parse(request.params);

        const adoptCase = makeAdoptUseCase();

        const { link } = await adoptCase.execute({
            whatsApp
        });

        return reply.status(200).send({ link });
    } catch(err){
        if (err instanceof InvalidWhatsAppNumberError) return reply.status(400).send({ message: err.message });

        throw err;
    }
}