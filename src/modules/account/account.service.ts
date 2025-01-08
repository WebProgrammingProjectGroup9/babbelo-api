import { BadRequestException, Injectable } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountDto, UpdateAccountDto } from './account.dto';

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
      firstName: account.firstName,
      lastName: account.lastName,
      emailAddress: account.emailAddress,
      profileImgUrl: account.profileImgUrl,
    };

    return accountDto;
  }

  async findAll(): Promise<AccountDto[]> {
    const accounts = await this.accountRepo.find();
    if (!accounts) {
      throw new BadRequestException('No accounts found');
    }
    return accounts.map((account) => ({
      firstName: account.firstName,
      lastName: account.lastName,
      emailAddress: account.emailAddress,
      profileImgUrl: account.profileImgUrl,
    }));
  }

  async update(id: number, update: UpdateAccountDto) {
    console.log(update);
    return await this.accountRepo.update(id, update);
  }

  async delete(id: number) {
    return await this.accountRepo.delete(id);
  }
}
