import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      typePaths: ['./nest-graphql-orders/src/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'nest-graphql-orders/src/graphql.schema.ts'),
        outputAs: 'class',
      },
    }),
    CustomersModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
