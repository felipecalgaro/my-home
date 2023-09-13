import { PrismaHomeRepository } from "@/database/repositories/PrismaHomeRepository";
import { Home } from "@/entities/Home";
import { prisma } from "@/lib/prisma";

interface GetHomesServiceRequest {
  availableFrom: Date;
  availableUntil: Date;
}

type GetHomesServiceResponse = Promise<Home[]>;

export async function getHomesByAvailabilityService(
  request: GetHomesServiceRequest
): GetHomesServiceResponse {
  const { availableFrom, availableUntil } = request;

  const prismaHomeRepository = new PrismaHomeRepository(prisma);

  const homes = await prismaHomeRepository.getHomesByAvailability(
    availableFrom,
    availableUntil
  );

  return homes;
}
