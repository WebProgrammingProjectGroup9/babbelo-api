import { BadRequestException, Injectable } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountDto, UpdateAccountDto } from './dto/account.dto';
import { util } from 'src/util/util';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async findOne(id: number): Promise<AccountDto> {
    const account = await this.accountRepo.findOne({ 
      where: { id },
      relations: ['address'],
    });
    if (!account) {
      throw new BadRequestException('Account not found');
    }
    const accountDto: AccountDto = {
      _id: account.id,
      firstName: account.firstName,
      lastName: account.lastName,
      emailAddress: account.emailAddress,
      profileImgUrl: util.getPhoto(account.profileImgUrl),
      dateOfBirth: account.dateOfBirth,
      gender: account.gender,
      phoneNumber: account.phoneNumber,
      biography: account.biography,
      organisationName: account.organisationName,
      chamberOfCommerce: account.chamberOfCommerce,
      website: account.website,
      address: account.address,
    };

    return accountDto;
  }

  async findAll(): Promise<AccountDto[]> {
    const accounts = await this.accountRepo.find({
      relations: ['address'],
    }
    );
    if (!accounts) {
      throw new BadRequestException('No accounts found');
    }

    return accounts.map((account) => {

      return {
      _id: account.id,
      firstName: account.firstName,
      lastName: account.lastName,
      emailAddress: account.emailAddress,
      profileImgUrl: util.getPhoto(account.profileImgUrl),
      dateOfBirth: account.dateOfBirth,
      gender: account.gender,
      phoneNumber: account.phoneNumber,
      biography: account.biography,
      organisationName: account.organisationName,
      chamberOfCommerce: account.chamberOfCommerce,
      website: account.website,
      address: account.address,
      
  }});
};
  

  async update(id: number, update: UpdateAccountDto) {
    return await this.accountRepo.update(id, update);
  }

  async delete(id: number) {
    return await this.accountRepo.delete(id);
  }
}
