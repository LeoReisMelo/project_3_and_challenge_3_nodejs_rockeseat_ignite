import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to authenticate', async () => {
        await request(app.server).post('/orgs').send({
            name: 'Teste org insomnia',
	        email: 'teste@orginsomnia.com.br',
	        password: '123456',
	        whatsApp: '11999999999',
        });

        const response = await request(app.server).post('/orgs/sessions').send({
            email: 'teste@orginsomnia.com.br',
            password: '123456'
        });

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String)
        });
    });
});