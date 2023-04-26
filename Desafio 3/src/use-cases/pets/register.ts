import { PetsRepository } from '@/repositories/contracts/pets-repository';
import { Pet } from '@prisma/client';

interface RegisterUseCaseRequest {
    name: string;
    description?: string;
    age: 'CUB' | 'LITTLE' | 'ADULT';
    bearing: 'SMALL' | 'MEDIUM' | 'BIG';
    energyLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    independenceLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    habitat: 'SMALL' | 'MEDIUM' | 'WIDE';
    images?: string[];
    requirementsForAdoption?: string[];
    orgId: string;
}

interface RegisterUseCaseResponse {
    pet: Pet
}

export class RegisterUseCase{
    constructor(private petsRepository: PetsRepository){}

    async execute({
        name,
        description,
        age,
        bearing,
        energyLevel,
        independenceLevel,
        habitat,
        images,
        requirementsForAdoption,
        orgId
    } : RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const pet = await this.petsRepository.create({
            name,
            description,
            age,
            bearing,
            energyLevel,
            independenceLevel,
            habitat,
            images,
            requirementsForAdoption,
            orgId
        });

        return { pet };
    }
}
