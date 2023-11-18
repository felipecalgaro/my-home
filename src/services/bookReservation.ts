import { PrismaHomeRepository } from "@/database/repositories/PrismaHomeRepository";
import { Reservation } from "@/entities/Home";
import prisma from "@/lib/prisma";

interface BookReservationRequest {
  reservation: Reservation;
  id: string;
}

type BookReservationResponse = Promise<void>;

export async function bookReservationService(
  request: BookReservationRequest
): BookReservationResponse {
  const { id, reservation } = request;
  const prismaHomeRepository = new PrismaHomeRepository(prisma);

  await prismaHomeRepository.bookReservation(reservation, id);
}
