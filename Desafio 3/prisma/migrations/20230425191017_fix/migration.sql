/*
  Warnings:

  - You are about to drop the column `org_id` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `org_id` on the `pets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_org_id_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_org_id_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "org_id",
ADD COLUMN     "orgId" TEXT;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "org_id",
ADD COLUMN     "orgId" TEXT;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
