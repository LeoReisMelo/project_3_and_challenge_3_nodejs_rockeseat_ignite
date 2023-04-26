import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { RegisterUseCase } from '@/use-cases/pets/register';

export function makeRegisterUseCase() {
    const petsRepository = new PrismaPetsRepository();
    const registerUseCase = new RegisterUseCase(petsRepository);

    return registerUseCase;
}