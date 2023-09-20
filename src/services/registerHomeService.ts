import { PrismaHomeRepository } from "@/database/repositories/PrismaHomeRepository";
import { Home } from "@/entities/Home";
import prisma from "@/lib/prisma";

interface RegisterHomeServiceRequest {
  location: [string, string];
  price: number;
  image_url?: string;
  ownerEmail: string;
}

type RegisterHomeServiceResponse = Promise<Home>;

export async function registerHomeService(
  request: RegisterHomeServiceRequest
): RegisterHomeServiceResponse {
  const prismaHomeRepository = new PrismaHomeRepository(prisma);
  const home = new Home({
    availableFrom: null,
    availableUntil: null,
    image_url: request.image_url ?? "https://fakeurl.com.br",
    location: request.location,
    ownerEmail: request.ownerEmail,
    price: request.price,
    registeredAt: new Date(),
  });

  await prismaHomeRepository.registerHome(home);
  return home;
}
