"use server";

import { PrismaHomeRepository } from "@/database/repositories/PrismaHomeRepository";
import { Home } from "@/entities/Home";
import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

interface RegisterHomeServiceRequest {
  location: [string, string];
  price: number;
  image_url: string;
  ownerEmail: string;
  description: string;
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
    description: request.description,
  });

  await prismaHomeRepository.registerHome(home);

  revalidatePath("/homes");
}
