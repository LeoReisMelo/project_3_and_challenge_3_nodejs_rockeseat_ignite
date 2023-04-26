import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org';

describe('List (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to view a list of pets', async () => {
        const org = await prisma.org.create({
            data: {
                name: 'Teste org insomnia',
                email: 'teste@orginsomnia.com.br', 
                password_hash: await hash('123456', 6),
                whatsApp: '11999999999'
            }
        });
        await prisma.address.create({
            data: {
                cep: '08433041',
                street: 'Rua Santo Amaro',
                number: 99,
                city: 'Ferraz de Vasconcelos',
                state: 'São Paulo',
                orgId: org.id
            }
        });

        for (let i = 1; i <= 2; i++) {
            await prisma.pet.create({
                data: {
                    name: `Jubileu ${i}`,
                    description: `Teste de descrição ${i}`,
                    age: 'CUB',
                    bearing: 'SMALL',
                    energyLevel: 'LOW',
                    independenceLevel: 'LOW',
                    habitat: 'SMALL',
                    images: [`teste ${i}`, `olá ${i}`],
                    requirementsForAdoption: [`teste ${i}`, `olá ${i}`],
                    orgId: org.id
                }
            });
        }

        const response = await request(app.server).get('/pets').query({ city: 'Ferraz de Vasconcelos' }).send();

        console.log(response);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveLength(2);
    });

    it('should not be able to view a list of pets', async () => {
        const org = await prisma.org.create({
            data: {
                name: 'Teste org insomnia',
                email: 'teste@orginsomnia2.com.br',
                password_hash: await hash('123456', 6),
                whatsApp: '11999999999'
            }
        });
        await prisma.address.create({
            data: {
                cep: '08433041',
                street: 'Rua Santo Amaro',
                number: 99,
                city: 'Ferraz de Vasconcelos',
                state: 'São Paulo',
                orgId: org.id
            }
        });

        for (let i = 1; i <= 2; i++) {
            await prisma.pet.create({
                data: {
                    name: `Jubileu ${i}`,
                    description: `Teste de descrição ${i}`,
                    age: 'CUB',
                    bearing: 'SMALL',
                    energyLevel: 'LOW',
                    independenceLevel: 'LOW',
                    habitat: 'SMALL',
                    images: [`teste ${i}`, `olá ${i}`],
                    requirementsForAdoption: [`teste ${i}`, `olá ${i}`],
                    orgId: org.id
                }
            });
        }

        const response = await request(app.server).get('/pets').query({ city: 'Guaianazes' }).send();

        console.log(response);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveLength(0);
    });
});