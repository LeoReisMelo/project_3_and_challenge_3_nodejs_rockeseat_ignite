import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository';
import { RegisterUseCase } from '@/use-cases/address/register';

export function makeRegisterUseCase() {
    const addressRepository = new PrismaAddressRepository();
    const registerUseCase = new RegisterUseCase(addressRepository);

    return registerUseCase;
}