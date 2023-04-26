import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Adopt Token (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to adopt', async () => {
        await request(app.server).post('/orgs').send({
            name: 'Teste org insomnia',
	        email: 'teste@orginsomnia.com.br',
	        password: '123456',
	        whatsApp: '11999999999',
        });

        const whatsApp = '11999999999';

        const response = await request(app.server).post(`/orgs/adopt/${whatsApp}`).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            link: expect.any(String)
        });
    });
});