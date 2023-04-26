import { InMemoryPetsRepository } from '@/repositories/in-memory/pets/in-memory-pets-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { ListUseCase } from '@/use-cases/pets/list';

let petsRepository: InMemoryPetsRepository;
let sut: ListUseCase;

describe('List Use Case', () => {
    beforeEach(() => {
        petsRepository= new InMemoryPetsRepository();
        sut = new ListUseCase(petsRepository);
    });

    it('Should be able to list', async () => {
        await petsRepository.create({
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

        const pets = await sut.execute({ city: 'Ferraz de Vasconcelos' });

        expect(pets).toHaveLength(2);
    });
});