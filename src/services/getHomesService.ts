import { PrismaHomeRepository } from "@/database/repositories/PrismaHomeRepository";
import { Home } from "@/entities/Home";
import prisma from "@/lib/prisma";

interface GetHomesServiceRequest {
  skip: number;
  take: number;
}

type GetHomesServiceResponse = Promise<Home[]>;

export async function getHomesService(
  request: GetHomesServiceRequest
): GetHomesServiceResponse {
  const prismaHomeRepository = new PrismaHomeRepository(prisma);

  const homes = await prismaHomeRepository.getHomes(request.skip, request.take);

  return homes;
}
