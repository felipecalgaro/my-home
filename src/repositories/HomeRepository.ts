import { Home } from "@/entities/Home";
import { Reservation } from "@prisma/client";

export interface IHomeRepository {
  getHomes(): Promise<Home[]>;
  registerHome(home: Home): Promise<void>;
  getHomeById(id: string): Promise<Home | null>;
  bookReservation(newReservation: Reservation, homeId: string): Promise<void>;
  unregisterHome(id: string): Promise<void>;
  rateHome(
    ratingId: string,
    newAverageRating: number,
    newQuantity: number
  ): Promise<void>;
}
