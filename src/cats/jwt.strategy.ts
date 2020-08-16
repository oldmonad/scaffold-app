import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import dotenv from 'dotenv';
import Data from './data.repository';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private data: Data) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = this.data.getUser(payload.email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'You are not authorized to make this action',
        status: HttpStatus.UNAUTHORIZED,
      });
    }
    return user;
  }
}
