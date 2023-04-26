import { PetsRepository } from '@/repositories/contracts/pets-repository';
import { Pet } from '@prisma/client';

export interface ListUseCaseRequest {
    city: string;
    age?: 'CUB' | 'LITTLE' |'ADULT';
    bearing?: 'SMALL' | 'MEDIUM' | 'BIG';
    energyLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
    independenceLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
    page?: number;
}

interface ListUseCaseResponse {
    pets: Pet[]
}

export class ListUseCase{
    constructor(private petsRepository: PetsRepository){}

    async execute({
        city,
        age,
        bearing,
        energyLevel,
        independenceLevel,
        page
    } : ListUseCaseRequest): Promise<ListUseCaseResponse> {
        const pets = await this.petsRepository.list({ city, age, bearing, energyLevel, independenceLevel, page });

        return pets;
    }
}
