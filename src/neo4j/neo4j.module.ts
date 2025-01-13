import { Module, Global } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import * as neo4j from 'neo4j-driver';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'NEO4J_DRIVER',
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('NEO4J_URI');
        const username = configService.get<string>('NEO4J_USERNAME');
        const password = configService.get<string>('NEO4J_PASSWORD');

        const driver = neo4j.driver(
          uri,
          neo4j.auth.basic(username, password)
        );

        driver
          .verifyConnectivity()
          .then(() => console.log('Connected to Neo4j successfully.'))
          .catch((err) => console.error('Neo4j connection failed:', err));

        return driver;
      },
      inject: [ConfigService],
    },
    {
      provide: 'NEO4J_SESSION',
      useFactory: (driver: neo4j.Driver, configService: ConfigService) => {
        const database = configService.get<string>('NEO4J_DATABASE', 'neo4j');
        return driver.session({ database });
      },
      inject: ['NEO4J_DRIVER', ConfigService],
    },
  ],
  exports: ['NEO4J_DRIVER', 'NEO4J_SESSION'],
})
export class Neo4jModule {}
