import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User, Offer, Trade } from '../graphql.schema';
// import { CatsGuard } from './cats.guard';
import { CatsService } from './cats.service';
// import { CreateCatDto } from './dto/create-cat.dto';
import { CurrentUser } from './current-user.decorator';
import { GqlAuthGuard } from './auth.guard';

const pubSub = new PubSub();

@Resolver('Cat')
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Mutation()
  async register(@Args('registerUser') data: User) {
    return this.catsService.register(data);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  public async createOffer(
    @CurrentUser() user: User,
    @Args('createOffer') { offerData }: Offer,
  ) {
    return this.catsService.createOffer({ offerData }, user);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  public async createTrade(
    @CurrentUser() user: User,
    @Args('createTrade') { offerId, tradeData }: any,
  ) {
    const offerObject = this.catsService.createTrade(offerId, tradeData, user);
    // console.log(offerObject.offer.user);
    pubSub.publish('tradeCreated', { tradeCreated: offerObject });
    return offerObject;
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  public async getOffers() {
    return this.catsService.getOffers();
  }

  @Mutation()
  async login(@Args('loginUser') data: User) {
    return this.catsService.login(data);
  }

  @Subscription(() => Trade, {
    filter: ({ tradeCreated }, variables) => {
      return tradeCreated.offer.user.id === variables.id;
    },
  })
  tradeCreated() {
    return pubSub.asyncIterator('tradeCreated');
  }

  // @Query()
  // @UseGuards(CatsGuard)
  // async getCats() {
  //   return this.catsService.findAll();
  // }

  // @Query('cat')
  // async findOneById(
  //   @Args('id', ParseIntPipe)
  //   id: number,
  // ): Promise<Cat> {
  //   return this.catsService.findOneById(id);
  // }

  // @Mutation('createCat')
  // async create(@Args('createCatInput') args: CreateCatDto): Promise<Cat> {
  //   const createdCat = await this.catsService.create(args);
  //   pubSub.publish('catCreated', { catCreated: createdCat });
  //   return createdCat;
  // }

  // @Subscription(() => Cat, {
  //   filter: ({ catCreated }, variables) => {
  //     return catCreated.id === parseInt(variables.id);
  //   },
  // })
  // catCreated() {
  //   return pubSub.asyncIterator('catCreated');
  // }
}
