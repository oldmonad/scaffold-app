import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CatsModule } from './cats/cats.module';
import { join } from 'path';

@Module({
  imports: [
    CatsModule,
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   definitions: {
    //     path: join(process.cwd(), `${process.env.GRAPHQL_FILE}`),
    //   },
    //   installSubscriptionHandlers: true,
    // }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), `${process.env.GRAPHQL_FILE}`),
      },
      installSubscriptionHandlers: true,
      playground: true,
      context: ({ req, connection }) => {
        // subscription
        if (connection) {
          return { req: connection.context, subscription: true };
        }
        // queries and mutations
        return { req };
      },
      introspection: true,
    }),
  ],
})
export class AppModule {}
