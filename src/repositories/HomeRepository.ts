import { Home } from "@/entities/Home";

export interface IHomeRepository {
  getHomes(): Promise<Home[]>;
  registerHome(home: Home): Promise<void>;
  getHomeById(id: string): Promise<Home | null>;
  updateAvailability(
    id: string,
    availableFrom: Date,
    availableUntil: Date
  ): Promise<void>;
  unregisterHome(id: string): Promise<void>;
}
