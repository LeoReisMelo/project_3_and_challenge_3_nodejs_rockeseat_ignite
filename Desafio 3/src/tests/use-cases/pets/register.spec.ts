import { InMemoryPetsRepository } from '@/repositories/in-memory/pets/in-memory-pets-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from '@/use-cases/pets/register';

let petsRepository: InMemoryPetsRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
    beforeEach(() => {
        petsRepository= new InMemoryPetsRepository();
        sut = new RegisterUseCase(petsRepository);
    });

    it('Should be able to register', async () => {
        const{ pet } = await sut.execute({
            name: "Jubileu",
	        description: "Teste de descrição",
	        age: "CUB",
	        bearing: "SMALL",
	        energyLevel: "LOW",
	        independenceLevel: "LOW",
	        habitat: "SMALL",
	        images: ["teste", "olá"],
	        requirementsForAdoption: ["teste", "olá"],
	        orgId: "9c0bd472-8f4a-4c58-8d4a-5be17ff4857e"
        });

        expect(pet.id).toEqual(expect.any(String));
    });
});