import { prisma } from '@/lib/prisma';
import { AddressRepository } from '@/repositories/contracts/address-repository';
import { Prisma } from '@prisma/client';

export class PrismaAddressRepository implements AddressRepository {
    async create(data: Prisma.AddressUncheckedCreateInput) {
        const address = await prisma.address.create({
            data
        });

        return address;
    }

    async findByCepAndNumber(cep: string, number: number) {
        const address = await prisma.address.findFirst({
            where: {
                cep,
                number
            }
        });

        return address;
    }
}