import { OrgsRepository } from '@/repositories/contracts/orgs-repository';
import { Org } from '@prisma/client';
import { hash } from 'bcryptjs';
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error';

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
    whatsApp: string;
}

interface RegisterUseCaseResponse {
    org: Org
}

export class RegisterUseCase{
    constructor(private orgsRepository: OrgsRepository){}

    async execute({
        name,
        email,
        password,
        whatsApp,
    } : RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6);
        const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

        if (orgWithSameEmail) throw new OrgAlreadyExistsError;

        const org = await this.orgsRepository.create({
            name,
            email,
            password_hash,
            whatsApp,
        });

        return { org };
    }
}
