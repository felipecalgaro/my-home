import { Home } from "@/entities/Home";

export interface IHomeRepository {
  getHomesByAvailability(
    availableFrom: Date,
    availableUntil: Date
  ): Promise<Home[]>;
  registerHome(home: Home): Promise<Home>; // mudar p void dps
  getHomeById(id: string): Promise<Home>;
  updateAvailability(
    id: string,
    availableFrom: Date,
    availableUntil: Date
  ): Promise<void>;
  unregisterHome(id: string): Promise<void>;
}
