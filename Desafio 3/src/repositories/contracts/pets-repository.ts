import { ListUseCaseRequest } from '@/use-cases/pets/list';
import { Prisma, Pet, Org } from '@prisma/client';

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet | any>
    list({ city, age, bearing, energyLevel, independenceLevel, page }: ListUseCaseRequest): Promise<Pet[] | any>
    details(id: string): Promise<Pet | any>
}