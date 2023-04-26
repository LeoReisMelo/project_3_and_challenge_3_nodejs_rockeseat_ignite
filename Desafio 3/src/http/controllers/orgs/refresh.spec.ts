import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Refresh Token (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to refresh a token', async () => {
        await request(app.server).post('/orgs').send({
            name: 'Teste org insomnia',
	        email: 'teste@orginsomnia.com.br',
	        password: '123456',
	        whatsApp: '11999999999',
        });

        const authResponse = await request(app.server).post('/orgs/sessions').send({
            email: 'teste@orginsomnia.com.br',
            password: '123456'
        });

        const cookies = authResponse.get('Set-Cookie');

        const response = await request(app.server).patch('/orgs/refresh').set('Cookie', cookies).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String)
        });
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken='),
        ]);
    });
});