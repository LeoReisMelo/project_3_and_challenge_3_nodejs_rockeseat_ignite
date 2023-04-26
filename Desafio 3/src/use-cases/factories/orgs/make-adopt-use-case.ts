import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository';
import { AdoptUseCase } from '@/use-cases/orgs/adopt';

export function makeAdoptUseCase() {
    const orgsRepository = new PrismaOrgsRepository();
    const adoptUseCase = new AdoptUseCase(orgsRepository);

    return adoptUseCase;
}