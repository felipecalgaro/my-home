import { PrismaHomeRepository } from "@/database/repositories/PrismaHomeRepository";
import { Home } from "@/entities/Home";
import prisma from "@/lib/prisma";

interface GetHomeByIdRequest {
  id: string;
}

type GetHomeByIdResponse = Promise<Home>;

export async function getHomeByIdService(
  request: GetHomeByIdRequest
): GetHomeByIdResponse {
  const { id } = request;
  const prismaHomeRepository = new PrismaHomeRepository(prisma);

  const home = await prismaHomeRepository.getHomeById(id);

  if (!home) {
    throw new Error("Error while fetching a home.");
  }

  return home;
}
