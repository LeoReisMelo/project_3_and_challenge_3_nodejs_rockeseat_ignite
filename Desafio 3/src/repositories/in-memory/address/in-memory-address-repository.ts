import { Prisma, Address } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { AddressRepository } from '@/repositories/contracts/address-repository';

export class InMemoryAddressRepository implements AddressRepository {
    public items: Address[] = [];
    async create(data: Prisma.AddressUncheckedCreateInput){
        const address = {
            id: randomUUID(),
            cep: data.cep,
            street: data.street,
            state: data.state,
            complement: data.complement,
            number: data.number,
            city: data.city,
            orgId: data.orgId
        };

        this.items.push(address);

        return address;
    }

    async findByCepAndNumber(cep: string, number: number) {
        const address = this.items.find(item => item.cep === cep && item.number === number);

        if (!address) return null;

        return address;
    }
}