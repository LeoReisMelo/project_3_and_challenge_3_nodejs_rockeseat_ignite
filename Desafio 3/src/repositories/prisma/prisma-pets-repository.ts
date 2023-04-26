import { prisma } from '@/lib/prisma';
import { Org, Prisma } from '@prisma/client';
import { PetsRepository } from '@/repositories/contracts/pets-repository';
import { ListUseCaseRequest } from '@/use-cases/pets/list';

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetCreateInput) {
        const pet = await prisma.pet.create({
            data
        });

        return pet;
    }

    async list({ city, age, bearing, energyLevel, independenceLevel, page = 1 }: ListUseCaseRequest) {
        const pets = await prisma.pet.findMany({
            where: {
                Org: {
                    address: {
                        some: {
                            city
                        }
                    }
                },
                age,
                bearing,
                energyLevel,
                independenceLevel
            },
            take: 20,
            skip: (page - 1) * 20
        });

        return pets;
    }

    async details(id: string) {
        const pet = await prisma.pet.findFirst({
            where: { id }
        });

        return pet;
    }
}