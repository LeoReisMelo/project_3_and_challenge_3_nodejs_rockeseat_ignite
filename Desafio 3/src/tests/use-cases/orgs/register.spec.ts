import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from '@/use-cases/orgs/register';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs/in-memory-orgs-repository';
import { compare } from 'bcryptjs';
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error';

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
    beforeEach(() => {
        orgsRepository= new InMemoryOrgsRepository();
        sut = new RegisterUseCase(orgsRepository);
    });

    it('Should be able to register', async () => {
        const{ org } = await sut.execute({
            name: "Teste Org",
	        email: "teste@org.com.br",
	        password: '123456',
	        whatsApp: "11999999999",
        });

        expect(org.id).toEqual(expect.any(String));
    });

    it('Should hash org password upon registration', async () => {
        const{ org } = await sut.execute({
            name: "Teste Org",
	        email: "teste@org.com.br",
	        password: '123456',
	        whatsApp: "11999999999",
        });
        const isPasswordCorrectlyHashed = await compare('123456', org.password_hash);

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('Should not be able to register with same email twice', async () => {
        const email = 'teste@teste.com.br';

        await sut.execute({
            name: "Teste Org",
	        email,
	        password: '123456',
	        whatsApp: "11999999999",
        });

        await expect(() => sut.execute({
            name: "Teste Org 2",
	        email,
	        password: '123456',
	        whatsApp: "11999999999",
        })).rejects.toBeInstanceOf(OrgAlreadyExistsError);
    });
});