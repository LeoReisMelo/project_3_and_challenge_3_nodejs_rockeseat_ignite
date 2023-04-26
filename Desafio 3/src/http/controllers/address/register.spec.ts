import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

describe('Register (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to register', async () => {
        const { token } = await createAndAuthenticateOrg(app, true);

        const org = await prisma.org.create({
            data: {
                name: 'Teste org insomnia',
	            email: 'teste@orginsomnia.com.br',
	            password_hash: await hash('123456', 6),
	            whatsApp: '11999999999'
            }
        });


        const response = await request(app.server).post('/address').set('Authorization', `Bearer ${token}`).send({
            cep: '08433041',
            street: 'Rua Santo Amaro',
            number: 99,
            city: 'Ferraz de Vasconcelos',
            state: 'São Paulo',
            orgId: org.id
        });

        expect(response.statusCode).toEqual(201);
    });
});