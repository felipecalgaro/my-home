import { Location } from "@/entities/Home";

export default function formatLocation(location: Location) {
  const [city, state] = location;

  return `${city}, ${state}`;
}
