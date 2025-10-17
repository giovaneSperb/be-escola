/*
  Warnings:

  - The `telefone_mae` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F');

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "telefone_mae",
ADD COLUMN     "telefone_mae" "Sexo";
