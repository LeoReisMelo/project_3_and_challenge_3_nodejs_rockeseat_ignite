import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository';
import { AuthenticateUseCase } from '@/use-cases/orgs/authenticate';

export function makeAuthenticateUseCase() {
    const orgsRepository = new PrismaOrgsRepository();
    const authenticateUseCase = new AuthenticateUseCase(orgsRepository);

    return authenticateUseCase;
}