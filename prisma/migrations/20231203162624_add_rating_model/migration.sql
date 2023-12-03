/*
  Warnings:

  - A unique constraint covering the columns `[ratingId]` on the table `Home` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ratingId` to the `Home` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Home" ADD COLUMN     "ratingId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "average" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Home_ratingId_key" ON "Home"("ratingId");

-- AddForeignKey
ALTER TABLE "Home" ADD CONSTRAINT "Home_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
