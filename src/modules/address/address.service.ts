import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
    private readonly logger: Logger = new Logger(AddressService.name);

    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>
    ) {
        this.logger.debug(this.addressRepository.metadata);
    }

    async create(address: Address, createAddressDto: CreateAddressDto) {
        const newAddress = { ...createAddressDto, address: address.id };

        return await this.addressRepository.save(newAddress);
    }

    async findOne(id: number) {
        const address = await this.addressRepository.findOne({ where: { id } });
        if (!address) {
            return [];
        }

        if (address.id !== id) {
            throw new NotFoundException('Address does not exist');
        }

        this.logger.debug(`Finding address with id ${id}`);
        return address;
    }
}