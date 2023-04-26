import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org';

describe('Details (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to view pet details', async () => {
        const { token } = await createAndAuthenticateOrg(app, true);

        const org = await prisma.org.create({
            data: {
                name: 'Teste org insomnia',
	            email: 'teste@orginsomnia.com.br',
	            password_hash: await hash('123456', 6),
	            whatsApp: '11999999999'
            }
        });
        const pet = await prisma.pet.create({
            data: {
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
            }
        });

        const response = await request(app.server).get(`/pets/${pet.id}`).send();



        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(expect.objectContaining({ id: expect.any(String) }));
    });
});