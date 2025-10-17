/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Usuario" 
ADD COLUMN     "cor" TEXT,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "cpf_mae" TEXT,
ADD COLUMN     "cpf_pai" TEXT,
ADD COLUMN     "data_nascimento" TIMESTAMP(3),
ADD COLUMN     "email_mae" TEXT,
ADD COLUMN     "email_pai" TEXT,
ADD COLUMN     "email_responsavel_financeiro" TEXT,
ADD COLUMN     "fone_responsavel_financeiro" TEXT,
ADD COLUMN     "foto" TEXT,
ADD COLUMN     "id_tipo_usuario" INTEGER,
ADD COLUMN     "naturalidade" TEXT,
ADD COLUMN     "nome_mae" TEXT,
ADD COLUMN     "nome_pai" TEXT,
ADD COLUMN     "nome_responsavel_financeiro" TEXT,
ADD COLUMN     "nome_responsavel_pedagogico" TEXT,
ADD COLUMN     "rg" TEXT,
ADD COLUMN     "sexo" TEXT,
ADD COLUMN     "telefone_mae" TEXT,
ADD COLUMN     "telefone_pai" TEXT;

-- CreateTable
CREATE TABLE "TipoUsuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "TipoUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_id_tipo_usuario_fkey" FOREIGN KEY ("id_tipo_usuario") REFERENCES "TipoUsuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
