/*
  Warnings:

  - The `cor` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Cor" AS ENUM ('BRANCA', 'PRETA', 'PARDA', 'AMARELA', 'INDIGENA', 'OUTRA');

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "cor",
ADD COLUMN     "cor" "Cor";
