import { PetsRepository } from '@/repositories/contracts/pets-repository';
import { Pet } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DetailsUseCaseRequest {
    id: string;
}

interface DetailsUseCaseResponse {
    pet: Pet
}

export class DetailsUseCase{
    constructor(private petsRepository: PetsRepository){}

    async execute({
        id
    } : DetailsUseCaseRequest): Promise<DetailsUseCaseResponse> {
        const pet = await this.petsRepository.details(id);

        if (!pet) throw new ResourceNotFoundError();

        return pet;
    }
}
