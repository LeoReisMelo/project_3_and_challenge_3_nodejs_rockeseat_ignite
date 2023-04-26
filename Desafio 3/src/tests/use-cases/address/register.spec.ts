import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from '@/use-cases/address/register';
import { InMemoryAddressRepository } from '@/repositories/in-memory/address/in-memory-address-repository';
import { DuplicateAddressError } from '@/use-cases/errors/duplicate-address-error';

let addressRepository: InMemoryAddressRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
    beforeEach(() => {
        addressRepository= new InMemoryAddressRepository();
        sut = new RegisterUseCase(addressRepository);
    });

    it('Should be able to register', async () => {
        const{ address } = await sut.execute({
            cep: '0987653',
	        street: 'Rua Teste',
	        number: 97,
	        city: 'Osasco',
	        state: 'São Paulo',
	        complement: 'Não Possui',
	        orgId: '9c0bd472-8f4a-4c58-8d4a-5be17ff4857e'
        });

        expect(address.id).toEqual(expect.any(String));
    });

    it('Should not be able to register with same cep and number twice', async () => {
        await sut.execute({
            cep: '0987653',
	        street: 'Rua Teste',
	        number: 97,
	        city: 'Osasco',
	        state: 'São Paulo',
	        complement: 'Não Possui',
	        orgId: '9c0bd472-8f4a-4c58-8d4a-5be17ff4857e'
        });

        await expect(() => sut.execute({
            cep: '0987653',
	        street: 'Rua Teste',
	        number: 97,
	        city: 'Osasco',
	        state: 'São Paulo',
	        complement: 'Não Possui',
	        orgId: '9c0bd472-8f4a-4c58-8d4a-5be17ff4857e',
        })).rejects.toBeInstanceOf(DuplicateAddressError);
    });
});