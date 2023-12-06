import { PrismaHomeRepository } from "@/database/repositories/PrismaHomeRepository";
import prisma from "@/lib/prisma";

interface RateHomeServiceRequest {
  ratingId: string;
  newRating: number;
  currentAverageRating: number;
  quantityOfRatings: number;
}

type RateHomeServiceResponse = Promise<void>;

export async function rateHomeService(
  request: RateHomeServiceRequest
): RateHomeServiceResponse {
  const prismaHomeRepository = new PrismaHomeRepository(prisma);

  const newAverageRating = Number(
    (
      (request.quantityOfRatings * request.currentAverageRating +
        request.newRating) /
      (request.quantityOfRatings + 1)
    ).toFixed(2)
  );

  await prismaHomeRepository.rateHome(
    request.ratingId,
    newAverageRating,
    request.quantityOfRatings + 1
  );
}
