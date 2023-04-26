import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Register (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to register', async () => {
        const response = await request(app.server).post('/orgs').send({
            name: 'Teste org insomnia',
	        email: 'teste@orginsomnia.com.br',
	        password: '123456',
	        whatsApp: '11999999999',
        });

        expect(response.statusCode).toEqual(201);
    });
});