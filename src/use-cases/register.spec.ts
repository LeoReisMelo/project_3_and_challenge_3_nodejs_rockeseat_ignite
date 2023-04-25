import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { compare } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { RegisterUseCase } from './register';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository= new InMemoryUsersRepository();
        sut = new RegisterUseCase(usersRepository);
    });

    it('Should be able to register', async () => {
        const{ user } = await sut.execute({
            name: 'Teste',
            email:'teste@teste.com.br',
            password: '123456'
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('Should hash user password upon registration', async () => {
        const{ user } = await sut.execute({
            name: 'Teste',
            email:'teste@teste.com.br',
            password: '123456'
        });
        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('Should not be able to register with same email twice', async () => {
        const email = 'teste@teste.com.br';

        await sut.execute({
            name: 'Teste',
            email,
            password: '123456'
        });

        await expect(() => sut.execute({
            name: 'Teste',
            email,
            password: '123456'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});