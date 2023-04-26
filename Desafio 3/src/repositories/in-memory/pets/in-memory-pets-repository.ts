import { Prisma, Pet } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { PetsRepository } from '@/repositories/contracts/pets-repository';

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = [];
    async create(data: Prisma.PetUncheckedCreateInput){
        const pet = {
            id: data.id ? data.id : randomUUID(),
            name: data.name,
            description: data.description,
            age: data.age,
            bearing: data.bearing,
            energyLevel: data.energyLevel,
            independenceLevel: data.independenceLevel,
            habitat: data.habitat,
            images: data.images,
            requirementsForAdoption: data.requirementsForAdoption,
            orgId: data.orgId
        };

        this.items.push(pet);

        return pet;
    }

    async list(city: string){
        const orgs = [
            {
                id: 'org-01',
                name: 'Teste 01',
                email: 'teste@01.com.br',
                password_hash: '123456',
                whatsApp: '11999999999',
                address: [
                    {
                        id: 'address-01',
                        cep: '09876012',
                        street: 'Rua Teste',
                        number: 123,
                        city: 'Ferraz de Vasconcelos',
                        state: 'São Paulo',
                        orgId: 'org-01'
                    }
                ],
                pets: this.items
            },
            {
                id: 'org-02',
                name: 'Teste 02',
                email: 'teste@02.com.br',
                password_hash: '123456',
                whatsApp: '11999999999',
                address: [
                    {
                        id: 'address-02',
                        cep: '09876015',
                        street: 'Rua Teste 2',
                        number: 1234,
                        city: 'Ferraz de Vasconcelos',
                        state: 'São Paulo',
                        orgId: 'org-02'
                    }
                ],
                pets: this.items
            }
        ];

        const pets = orgs.map(org => {
            if (org.address.map(a => a.city === city)) {
                return org.pets;
            }
        });

        return pets;
    }

    async details(id: string) {
        const pet = this.items.find(item => item.id === id);

        return { pet };
    }
}