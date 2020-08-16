
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class UpdateProfileInput {
    firstName?: string;
}

export class CreateOfferinput {
    offerData?: string;
}

export class CreateTradeinput {
    offerId?: string;
    tradeData?: string;
}

export class RegisterUserInput {
    email?: string;
}

export class CreateCatInput {
    name?: string;
    age?: number;
}

export abstract class IQuery {
    abstract getCats(): Cat[] | Promise<Cat[]>;

    abstract cat(id: string): Cat | Promise<Cat>;

    abstract getOffers(): Offer[] | Promise<Offer[]>;
}

export class UserRO {
    user: User;
    token: string;
}

export class OfferRO {
    offer?: Offer;
}

export abstract class IMutation {
    abstract createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat>;

    abstract register(registerUser?: RegisterUserInput): UserRO | Promise<UserRO>;

    abstract createOffer(createOffer?: CreateOfferinput): OfferRO | Promise<OfferRO>;

    abstract createTrade(createTrade?: CreateTradeinput): OfferRO | Promise<OfferRO>;

    abstract login(loginUser?: RegisterUserInput): UserRO | Promise<UserRO>;
}

export abstract class ISubscription {
    abstract catCreated(id: string): Cat | Promise<Cat>;

    abstract tradeCreated(id?: string): OfferRO | Promise<OfferRO>;
}

export class Cat {
    id?: number;
    name?: string;
    age?: number;
}

export class Offer {
    id?: string;
    offerData?: string;
    trade?: Trade;
    user?: User;
}

export class Trade {
    id?: string;
    tradeData?: string;
    user?: User;
}

export class User {
    id?: string;
    email?: string;
}
