import { BadRequestException, Injectable } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountDto, UpdateAccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async findOne(id: number): Promise<AccountDto> {
    const account = await this.accountRepo.findOne({ where: { id } });
    if (!account) {
      throw new BadRequestException('Account not found');
    }
    const accountDto: AccountDto = {
      _id: account.id,
      firstName: account.firstName,
      lastName: account.lastName,
      emailAddress: account.emailAddress,
      profileImgUrl: null,
      dateOfBirth: account.dateOfBirth,
      gender: account.gender,
      phoneNumber: account.phoneNumber,
      biography: account.biography,
      organisationName: account.organisationName,
      chamberOfCommerce: account.chamberOfCommerce,
      website: account.website,
    };
    if (account.profileImgUrl) {
      const base64Photo = account.profileImgUrl.toString('base64');
      accountDto['photoBase64'] = `data:image/jpeg;base64,${base64Photo}`;
    }


    return accountDto;
  }

  async findAll(): Promise<AccountDto[]> {
    const accounts = await this.accountRepo.find();
    if (!accounts) {
      throw new BadRequestException('No accounts found');
    }
    accounts.map((account) => {
      if (account.profileImgUrl) {
        const base64Photo = account.profileImgUrl.toString('base64');
        account['photoBase64'] = `data:image/jpeg;base64,${base64Photo}`;
      }
    })

    return accounts.map((account) => {
      let photoBase64: string | null = null;
      if (account.profileImgUrl) {
        const base64Photo = Buffer.from(account.profileImgUrl).toString('base64');
        photoBase64 = `data:image/jpeg;base64,${base64Photo}`;
      }
      return {
      _id: account.id,
      firstName: account.firstName,
      lastName: account.lastName,
      emailAddress: account.emailAddress,
      photoBase64: photoBase64,
      profileImgUrl: null,
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
