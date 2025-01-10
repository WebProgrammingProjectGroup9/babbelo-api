import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from "../../auth/auth.module";
import { AddressController } from "./address.controller";
import { AddressService } from "./address.service";
import { Address } from "./entities/address.entity";
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    forwardRef(() => AccountModule),
    JwtModule,
    TypeOrmModule.forFeature([Address]),
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [TypeOrmModule],
})
export class AddressModule {}
