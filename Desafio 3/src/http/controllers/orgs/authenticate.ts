import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/orgs/make-authenticate-use-case';

export async function authenticate  (request:FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });
    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase();

        const { org } = await authenticateUseCase.execute({ email, password });

        const token = await reply.jwtSign({
            role: org.role,
        }, { sign: {
            sub: org.id
        }
        });
        const refreshToken = await reply.jwtSign({
            role: org.role
        }, { sign: {
            sub: org.id,
            expiresIn: '7d'
        }
        });

        return reply.setCookie('refreshToken', refreshToken, {
            path: '/',
            // secure: true,
            sameSite: true,
            httpOnly: true,
        }).status(200).send({ token });

    } catch(err) {
        console.log(err);
        if (err instanceof InvalidCredentialsError) return reply.status(400).send({ message: err.message });

        throw err;
    }
}