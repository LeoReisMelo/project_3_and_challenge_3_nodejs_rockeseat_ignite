import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org';

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

        const response = await request(app.server).post('/pets').set('Authorization', `Bearer ${token}`).send({
            name: 'Jubileu',
	        description: 'Teste de descrição',
	        age: 'CUB',
	        bearing: 'SMALL',
	        energyLevel: 'LOW',
	        independenceLevel: 'LOW',
	        habitat: 'SMALL',
	        images: ['teste', 'olá'],
	        requirementsForAdoption: ['teste', 'olá'],
	        orgId: org.id
        });

        expect(response.statusCode).toEqual(201);
    });
});