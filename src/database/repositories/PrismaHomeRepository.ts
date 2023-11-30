import { Home, Reservation } from "@/entities/Home";
import { IHomeRepository } from "@/repositories/HomeRepository";
import { PrismaClient } from "@prisma/client";
import HomeMapper from "../mappers/HomeMapper";

export class PrismaHomeRepository implements IHomeRepository {
  constructor(private prisma: PrismaClient) {}

  async getHomes(): Promise<Home[]> {
    const homes = await this.prisma.home.findMany({
      include: {
        reservations: true,
      },
    });

    return homes.map(HomeMapper.toDomain);
  }

  async registerHome(home: Home): Promise<void> {
    const { image_url, ownerEmail, price, location } =
      HomeMapper.toDatabase(home);

    await this.prisma.home.create({
      data: {
        image_url,
        ownerEmail,
        price,
        location,
      },
    });
  }

  async getHomeById(id: string): Promise<Home | null> {
    const home = await this.prisma.home.findUnique({
      where: {
        id,
      },
      include: {
        reservations: true,
      },
    });

    if (!home) {
      return null;
    }

    return HomeMapper.toDomain(home);
  }

  async bookReservation(
    newReservation: Reservation,
    homeId: string
  ): Promise<void> {
    await this.prisma.reservation.create({
      data: {
        from: newReservation.from,
        until: newReservation.until,
        homeId: homeId,
      },
    });
  }

  async unregisterHome(id: string): Promise<void> {
    await this.prisma.home.delete({
      where: {
        id,
      },
    });
  }
}
