import { AddressRepository } from '@/repositories/contracts/address-repository';
import { Address } from '@prisma/client';
import { DuplicateAddressError } from '../errors/duplicate-address-error';

interface RegisterUseCaseRequest {
    cep: string;
    street: string;
    number: number;
    city: string;
    state: string;
    complement?: string;
    orgId: string;
}

interface RegisterUseCaseResponse {
    address: Address
}

export class RegisterUseCase{
    constructor(private addressRepository: AddressRepository){}

    async execute({
        cep,
        street,
        number,
        city,
        state,
        complement,
        orgId
    } : RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const addressWithSameCepAndNumber = await this.addressRepository.findByCepAndNumber(cep, number);

        if (addressWithSameCepAndNumber) throw new DuplicateAddressError;

        const address = await this.addressRepository.create({
            cep,
            street,
            number,
            city,
            state,
            complement,
            orgId
        });

        return { address };
    }
}
