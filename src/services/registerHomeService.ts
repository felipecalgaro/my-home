import { PrismaHomeRepository } from "@/database/repositories/PrismaHomeRepository";
import { Home } from "@/entities/Home";
import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";

interface RegisterHomeServiceRequest {
  location: [string, string];
  price: number;
  image_url: string;
  ownerEmail: string;
}

type RegisterHomeServiceResponse = Promise<void>;

export async function registerHomeService(
  request: RegisterHomeServiceRequest
): RegisterHomeServiceResponse {
  const prismaHomeRepository = new PrismaHomeRepository(prisma);
  const home = new Home({
    image_url: request.image_url,
    location: request.location,
    ownerEmail: request.ownerEmail,
    price: request.price,
    registeredAt: new Date(),
    reservations: [],
    rating: {
      amount: 0,
      average: 0,
      id: randomUUID(),
    },
  });

  await prismaHomeRepository.registerHome(home);
}
