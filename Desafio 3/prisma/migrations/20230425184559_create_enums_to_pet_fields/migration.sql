/*
  Warnings:

  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bearing` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `energyLevel` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `independenceLevel` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `habitat` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('CUB', 'LITTLE', 'ADULT');

-- CreateEnum
CREATE TYPE "PetBearing" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "PetLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PetHabitat" AS ENUM ('SMALL', 'MEDIUM', 'WIDE');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "age",
ADD COLUMN     "age" "PetAge" NOT NULL,
DROP COLUMN "bearing",
ADD COLUMN     "bearing" "PetBearing" NOT NULL,
DROP COLUMN "energyLevel",
ADD COLUMN     "energyLevel" "PetLevel" NOT NULL,
DROP COLUMN "independenceLevel",
ADD COLUMN     "independenceLevel" "PetLevel" NOT NULL,
DROP COLUMN "habitat",
ADD COLUMN     "habitat" "PetHabitat" NOT NULL;
