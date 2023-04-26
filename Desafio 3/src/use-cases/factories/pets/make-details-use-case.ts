import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { DetailsUseCase } from '@/use-cases/pets/details';

export function makeDetailsUseCase() {
    const petsRepository = new PrismaPetsRepository();
    const detailsUseCase = new DetailsUseCase(petsRepository);

    return detailsUseCase;
}