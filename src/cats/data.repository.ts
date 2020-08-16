import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common';
import { User, Offer } from '../graphql.schema';

export default class Data {
  private readonly offers: Offer[] = [
    // {
    //   id: 'c12bb5e0-8d09-49fd-bb59-caba42641444',
    //   offerData: 'List of offers',
    //   trade: {},
    //   user: {},
    // },
  ];
  // private readonly trades: Trade[] = [{ id: 1, tradeData: 'List of trades' }];
  private readonly users: User[] = [
    { id: '0a4cc750-13e3-4c72-af89-07693ab873b7', email: 'mailer@mail.com' },
  ];

  registerUser(data: any): any {
    const newUser = {
      id: uuidv4(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  getUser(email: string) {
    return this.users.find(user => user.email === email);
  }

  getUsers() {
    return this.users;
  }

  createOffer(offer: any, user: any) {
    const newOffer = {
      id: uuidv4(),
      ...offer,
      trade: {},
      user: { ...user },
    };
    this.offers.push(newOffer);
    return newOffer;
  }

  getOffer(offerId: any): Offer {
    return this.offers.find(offer => offer.id === offerId);
  }

  getOffers() {
    return this.offers;
  }

  createTrade(offerId: any, { data }: any, user: any) {
    const trade = {
      id: uuidv4(),
      user: { ...user },
      tradeData: data,
    };

    const offer = this.offers.find(offer => {
      return offer.id === offerId;
    });

    if (offer.user.id === user.id)
      throw new BadRequestException("You can't create a trade on your offer");

    const index = this.offers.indexOf(offer);
    this.offers[index].trade = trade;
    return this.offers[index];
  }
}
