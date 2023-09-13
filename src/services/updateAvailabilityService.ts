import { PrismaHomeRepository } from "@/database/repositories/PrismaHomeRepository";
import { prisma } from "@/lib/prisma";

interface UpdateAvailabilityRequest {
  availableFrom: Date;
  availableUntil: Date;
  id: string;
}

type UpdateAvailabilityResponse = Promise<void>;

export async function updateAvailabilityService(
  request: UpdateAvailabilityRequest
): UpdateAvailabilityResponse {
  const { id, availableFrom, availableUntil } = request;
  const prismaHomeRepository = new PrismaHomeRepository(prisma);

  await prismaHomeRepository.updateAvailability(
    id,
    availableFrom,
    availableUntil
  );
}
