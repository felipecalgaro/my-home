import { PrismaHomeRepository } from "@/database/repositories/PrismaHomeRepository";
import { Reservation } from "@/entities/Home";
import prisma from "@/lib/prisma";

interface BookReservationRequest {
  reservation: Reservation;
  homeId: string;
}

type BookReservationResponse = Promise<void>;

export async function bookReservationService(
  request: BookReservationRequest
): BookReservationResponse {
  const { homeId, reservation } = request;
  const prismaHomeRepository = new PrismaHomeRepository(prisma);

  await prismaHomeRepository.bookReservation(reservation, homeId);
}
