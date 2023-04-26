import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { ListUseCase } from '@/use-cases/pets/list';

export function makeListUseCase() {
    const petsRepository = new PrismaPetsRepository();
    const listUseCase = new ListUseCase(petsRepository);

    return listUseCase;
}