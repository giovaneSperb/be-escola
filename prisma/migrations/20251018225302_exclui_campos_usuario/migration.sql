/*
  Warnings:

  - You are about to drop the column `cor` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `cpf_mae` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `cpf_pai` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `data_nascimento` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `email_mae` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `email_pai` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `email_responsavel_financeiro` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `fone_responsavel_financeiro` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `naturalidade` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nome_mae` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nome_pai` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nome_responsavel_financeiro` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nome_responsavel_pedagogico` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `rg` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `sexo` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `telefone_mae` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `telefone_pai` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "cor",
DROP COLUMN "cpf_mae",
DROP COLUMN "cpf_pai",
DROP COLUMN "data_nascimento",
DROP COLUMN "email_mae",
DROP COLUMN "email_pai",
DROP COLUMN "email_responsavel_financeiro",
DROP COLUMN "fone_responsavel_financeiro",
DROP COLUMN "foto",
DROP COLUMN "naturalidade",
DROP COLUMN "nome_mae",
DROP COLUMN "nome_pai",
DROP COLUMN "nome_responsavel_financeiro",
DROP COLUMN "nome_responsavel_pedagogico",
DROP COLUMN "rg",
DROP COLUMN "sexo",
DROP COLUMN "telefone_mae",
DROP COLUMN "telefone_pai";

-- CreateTable
CREATE TABLE "pessoa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cor" "Cor",
    "cpf" TEXT,
    "cpf_mae" TEXT,
    "cpf_pai" TEXT,
    "data_nascimento" TIMESTAMP(3),
    "email_mae" TEXT,
    "email_pai" TEXT,
    "email_responsavel_financeiro" TEXT,
    "fone_responsavel_financeiro" TEXT,
    "foto" TEXT,
    "id_tipo_usuario" INTEGER,
    "naturalidade" TEXT,
    "nome_mae" TEXT,
    "nome_pai" TEXT,
    "nome_responsavel_financeiro" TEXT,
    "nome_responsavel_pedagogico" TEXT,
    "rg" TEXT,
    "sexo" "Sexo",
    "telefone_mae" TEXT,
    "telefone_pai" TEXT,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_email_key" ON "pessoa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_cpf_key" ON "pessoa"("cpf");
