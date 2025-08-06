import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TiposGasolinaModule } from './modules/tipos-gasolina/tipos-gasolina.module';
import { PreciosModule } from './modules/precios/precios.module';
import { CalculosModule } from './modules/calculos/calculos.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
    }),
    SharedModule,
    TiposGasolinaModule,
    PreciosModule,
    CalculosModule,
  ],
})
export class AppModule {}
