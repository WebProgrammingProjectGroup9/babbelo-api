import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from 'src/modules/account/account.module';
import { AddressModule } from 'src/modules/address/address.module';
import { Neo4jModule } from 'src/neo4j/neo4j.module';



@Module({
  imports: [
    AccountModule, 
    AddressModule, 
    JwtModule.register({ secret: process.env['JWT_SECRET'] || 'secretstring', signOptions: { expiresIn: '12 days' } }),
    Neo4jModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
