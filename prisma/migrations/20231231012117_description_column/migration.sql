/*
  Warnings:

  - Added the required column `description` to the `Home` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Home" ADD COLUMN     "description" TEXT NOT NULL;
