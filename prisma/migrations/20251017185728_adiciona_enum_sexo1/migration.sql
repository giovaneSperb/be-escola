/*
  Warnings:

  - The `sexo` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `telefone_mae` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "sexo",
ADD COLUMN     "sexo" "Sexo",
DROP COLUMN "telefone_mae",
ADD COLUMN     "telefone_mae" TEXT;
