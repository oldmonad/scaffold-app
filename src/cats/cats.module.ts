import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';
import { JwtStrategy } from './jwt.strategy';
import Data from './data.repository';

@Module({
  imports: [
    Data,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [CatsService, CatsResolver, Data, JwtStrategy],
})
export class CatsModule {}
