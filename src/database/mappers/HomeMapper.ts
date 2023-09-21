import { Home, Location } from "@/entities/Home";
import { Mapper } from "./Mapper";

interface DatabaseHome {
  id: string;
  registeredAt: Date;
  location: string[];
  availableFrom: Date | null;
  availableUntil: Date | null;
  price: number;
  image_url: string;
  ownerEmail: string;
}

const HomeMapper: Mapper<DatabaseHome, Home> = {
  toDomain(home: DatabaseHome) {
    return new Home(
      {
        availableFrom: home.availableFrom,
        availableUntil: home.availableUntil,
        location: home.location as Location,
        ownerEmail: home.ownerEmail,
        price: home.price,
        image_url: home.image_url,
        registeredAt: home.registeredAt,
      },
      home.id
    );
  },

  toDatabase(home: Home): DatabaseHome {
    return {
      availableFrom: home.availableFrom,
      availableUntil: home.availableUntil,
      id: home.id,
      image_url: home.image_url,
      location: home.location,
      ownerEmail: home.ownerEmail,
      price: home.price,
      registeredAt: home.registeredAt,
    };
  },
};

export default HomeMapper;
