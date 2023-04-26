import { InMemoryPetsRepository } from '@/repositories/in-memory/pets/in-memory-pets-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { DetailsUseCase } from '@/use-cases/pets/details';

let petsRepository: InMemoryPetsRepository;
let sut: DetailsUseCase;

describe('Details Use Case', () => {
    beforeEach(() => {
        petsRepository= new InMemoryPetsRepository();
        sut = new DetailsUseCase(petsRepository);
    });

    it('Should be able to list', async () => {
        await petsRepository.create({
            id: 'teste-01',
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

        const { pet } = await sut.execute({ id: 'teste-01' });

        expect(pet.id).toEqual(expect.any(String));
    });
});