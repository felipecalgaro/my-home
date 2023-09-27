import { PrismaHomeRepository } from "@/database/repositories/PrismaHomeRepository";
import { Home } from "@/entities/Home";
import prisma from "@/lib/prisma";

type GetHomesServiceResponse = Promise<Home[]>;

export async function getHomesService(): GetHomesServiceResponse {
  const prismaHomeRepository = new PrismaHomeRepository(prisma);

  const homes = await prismaHomeRepository.getHomes();

  return homes;
}
