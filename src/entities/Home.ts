import { randomUUID } from "crypto";

export type Location = [string, string];

export type Reservation = {
  from: Date;
  until: Date;
};

export type Rating = {
  id: string;
  average: number;
  amount: number;
};

interface HomeProps {
  location: Location;
  reservations: Reservation[];
  price: number;
  image_url: string;
  ownerEmail: string;
  registeredAt: Date;
  rating: Rating;
  description: string
}

export class Home {
  private _id: string;
  constructor(private props: HomeProps, id?: string) {
    if (id) {
      this._id = id;
    } else {
      this._id = randomUUID();
    }
  }

  get id() {
    return this._id;
  }

  get location() {
    return this.props.location;
  }

  get rating() {
    return this.props.rating;
  }

  get reservations() {
    return this.props.reservations;
  }

  get isAvailable() {
    const getDateAtMidnight = (date: Date) =>
      new Date(date.setHours(0, 0, 0, 0));

    const currentDay = getDateAtMidnight(new Date());

    // returns false if currentDay is within the reservation interval
    const checkAvailability = (
      reservationStartDate: Date,
      reservationEndDate: Date
    ) =>
      getDateAtMidnight(reservationStartDate) <= currentDay &&
      getDateAtMidnight(reservationEndDate) >= currentDay;

    const isItAvailableToday = !this.props.reservations?.find((reservation) =>
      checkAvailability(reservation.from, reservation.until)
    );

    return isItAvailableToday;
  }

  get price() {
    return this.props.price;
  }

  get image_url() {
    return this.props.image_url;
  }

  get ownerEmail() {
    return this.props.ownerEmail;
  }

  get registeredAt() {
    return this.props.registeredAt;
  }

  get description() {
    return this.props.description
  }
}
