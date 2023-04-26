import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateOrg(app: FastifyInstance, isAdmin = false) {
    await prisma.org.create({
        data: {
            name: 'Teste Org',
            email: 'teste@orgtest.com.br',
            password_hash: await hash('123456', 6),
            whatsApp: '11999999999',
            role: isAdmin ? 'ADMIN' : 'MEMBER'
        }
    });

    const authResponse = await request(app.server).post('/orgs/sessions').send({
        email: 'teste@orgtest.com.br',
        password: '123456'
    });

    const { token } = authResponse.body;

    return { token };
}