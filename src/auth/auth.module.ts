import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({ secret: process.env['JWT_SECRET'] || 'secretstring', signOptions: { expiresIn: '12 days' } })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
