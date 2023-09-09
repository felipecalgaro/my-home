-- CreateTable
CREATE TABLE "Home" (
    "id" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT[],
    "availability" TIMESTAMP(3)[],
    "price" DOUBLE PRECISION NOT NULL,
    "image_url" TEXT NOT NULL,
    "ownerEmail" TEXT NOT NULL,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("id")
);
