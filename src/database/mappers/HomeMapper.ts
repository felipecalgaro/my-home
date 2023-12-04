import { Home, Location, Reservation } from "@/entities/Home";
import { Mapper } from "./Mapper";
import { Rating } from "@/entities/Home";

interface DatabaseHome {
  id: string;
  registeredAt: Date;
  location: string[];
  reservations: (Reservation & { homeId: string })[];
  price: number;
  image_url: string;
  ownerEmail: string;
  rating: Rating & { id: string };
}

const HomeMapper: Mapper<DatabaseHome, Home> = {
  toDomain(home: DatabaseHome) {
    return new Home(
      {
        reservations: home.reservations,
        location: home.location as Location,
        ownerEmail: home.ownerEmail,
        price: home.price,
        image_url: home.image_url,
        registeredAt: home.registeredAt,
        rating: home.rating,
      },
      home.id
    );
  },

  toDatabase(home: Home): DatabaseHome {
    return {
      reservations:
        home.reservations?.map((reservation) => {
          return {
            from: reservation.from,
            homeId: home.id,
            until: reservation.until,
          };
        }) ?? [],
      id: home.id,
      image_url: home.image_url,
      location: home.location,
      ownerEmail: home.ownerEmail,
      price: home.price,
      registeredAt: home.registeredAt,
      rating: home.rating,
    };
  },
};

export default HomeMapper;
