/*
  Warnings:

  - You are about to drop the column `availability` on the `Home` table. All the data in the column will be lost.
  - Added the required column `availableFrom` to the `Home` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableUntil` to the `Home` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Home" DROP COLUMN "availability",
ADD COLUMN     "availableFrom" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "availableUntil" TIMESTAMP(3) NOT NULL;
