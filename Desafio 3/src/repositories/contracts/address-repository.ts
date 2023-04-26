import { Address, Prisma } from '@prisma/client';

export interface AddressRepository {
    create(data: Prisma.AddressUncheckedCreateInput): Promise<Address | any>
    findByCepAndNumber(cep: string, number: number): Promise<Address | null>
}