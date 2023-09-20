import { PrismaHomeRepository } from "@/database/repositories/PrismaHomeRepository";
import prisma from "@/lib/prisma";

interface UnregisterHomeRequest {
  id: string;
}

type UnregisterHomeResponse = Promise<void>;

export async function unregisterHomeService(
  request: UnregisterHomeRequest
): UnregisterHomeResponse {
  const { id } = request;
  const prismaHomeRepository = new PrismaHomeRepository(prisma);

  await prismaHomeRepository.unregisterHome(id);
}
