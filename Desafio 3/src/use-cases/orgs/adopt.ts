import { OrgsRepository } from '@/repositories/contracts/orgs-repository';
import { InvalidWhatsAppNumberError } from '../errors/invalid-whatsapp-number-error';

interface AdoptUseCaseRequest {
    whatsApp: string;
}
interface AdotpUseCaseResponse {
    link: string
}

export class AdoptUseCase {
    constructor(private orgsRepository: OrgsRepository) {}

    async execute({ whatsApp }: AdoptUseCaseRequest): Promise<AdotpUseCaseResponse> {
        const org = await this.orgsRepository.findByWhatsApp(whatsApp);

        if (!org) {
            throw new InvalidWhatsAppNumberError();
        }

        return {
            link: `https://wa.me/55${whatsApp}`
        };
    }
}