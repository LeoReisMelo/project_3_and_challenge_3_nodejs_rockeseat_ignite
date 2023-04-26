import { Prisma, Org } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { OrgsRepository } from '@/repositories/contracts/orgs-repository';

export class InMemoryOrgsRepository implements OrgsRepository {
    public items: Org[] = [];
    async create(data: Prisma.OrgCreateInput){
        const org = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            whatsApp: data.whatsApp,
        };

        this.items.push(org);

        return org;
    }

    async findByEmail(email: string) {
        const org = this.items.find(item => item.email === email);

        if (!org) return null;

        return org;
    }

    async findByWhatsApp(whatsApp: string) {
        const org = this.items.find(item => item.whatsApp === whatsApp);

        if (!org) return null;

        return org;
    }
}