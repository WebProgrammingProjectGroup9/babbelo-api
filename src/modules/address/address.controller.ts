import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { AddressService } from './address.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { CreateAddressDto } from './dto/address.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post()
    @UseGuards(AuthGuard)
    create(@Request() req: any, @Body() createAddressDto: CreateAddressDto) {
        return this.addressService.create(req, createAddressDto);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    findOne(@Param('id') id: string) {
        return this.addressService.findOne(+id);
    }
}