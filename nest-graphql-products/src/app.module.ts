import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CollectionsModule } from './collections/collections.module';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      typePaths: ['./nest-graphql-products/src/**/*.graphql'],
      definitions: {
        path: join(
          process.cwd(),
          'nest-graphql-products/src/graphql.schema.ts',
        ),
        outputAs: 'class',
      },
    }),
    ProductsModule,
    CollectionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
