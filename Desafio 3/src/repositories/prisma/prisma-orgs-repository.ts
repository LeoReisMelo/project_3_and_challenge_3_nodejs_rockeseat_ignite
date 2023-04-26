import { prisma } from '@/lib/prisma';
import { OrgsRepository } from '@/repositories/contracts/orgs-repository';
import { Prisma } from '@prisma/client';

export class PrismaOrgsRepository implements OrgsRepository {
    async create(data: Prisma.OrgCreateInput) {
        const org = await prisma.org.create({ data });

        return org;
    }

    async findByEmail(email: string) {
        const org = await prisma.org.findUnique({ where: { email } });

        return org;
    }

    async findByWhatsApp(whatsApp: string) {
        const org = await prisma.org.findFirst({ where: { whatsApp } });

        return org;
    }
}