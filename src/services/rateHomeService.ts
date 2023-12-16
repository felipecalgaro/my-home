import { PrismaHomeRepository } from "@/database/repositories/PrismaHomeRepository";
import prisma from "@/lib/prisma";

interface RateHomeServiceRequest {
  ratingId: string;
  newRating: number;
  currentAverageRating: number;
  amountOfRatings: number;
}

type RateHomeServiceResponse = Promise<void>;

export async function rateHomeService(
  request: RateHomeServiceRequest
): RateHomeServiceResponse {
  const prismaHomeRepository = new PrismaHomeRepository(prisma);

  const newAverageRating = Number(
    (
      (request.amountOfRatings * request.currentAverageRating +
        request.newRating) /
      (request.amountOfRatings + 1)
    ).toFixed(2)
  );

  await prismaHomeRepository.rateHome(
    request.ratingId,
    newAverageRating,
    request.amountOfRatings + 1
  );
}
