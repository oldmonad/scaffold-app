import {
  Injectable,
  ConflictException,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Cat } from "../graphql.schema";
import Data from "./data.repository";

@Injectable()
export class CatsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly data: Data,
  ) {}

  private readonly cats: Cat[] = [{ id: 1, name: "Cat", age: 5 }];

  create(cat: Cat): Cat {
    cat.id = this.cats.length + 1;
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOneById(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
  }

  public register(data: any): any {
    const existingUser = this.data.getUser(data.email);

    if (existingUser) {
      throw new ConflictException({
        message: "Email already exist",
        status: HttpStatus.CONFLICT,
      });
    }

    const user = this.data.registerUser(data);

    return {
      user,
      token: this.jwtService.sign({ ...user }),
    };
  }

  public getUsers() {
    return this.data.getUsers();
  }

  public getOffers() {
    return this.data.getOffers();
  }

  public createOffer(data: any, user: any) {
    return { offer: this.data.createOffer(data, user) };
  }

  public createTrade(offerId: any, data: any, user: any): any {
    return { offer: this.data.createTrade(offerId, { data }, user) };
  }

  public login({ email }: any): any {
    let user = this.data.getUser(email);

    if (!user) throw new BadRequestException("Invalid user");

    return {
      user,
      token: this.jwtService.sign({ ...user }),
    };
  }
}
