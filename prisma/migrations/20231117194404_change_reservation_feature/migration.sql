/*
  Warnings:

  - You are about to drop the column `availableFrom` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `availableUntil` on the `Home` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Home" DROP COLUMN "availableFrom",
DROP COLUMN "availableUntil";

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "homeId" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "until" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
