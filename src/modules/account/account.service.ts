import { Injectable } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountDto } from './account.dto';

@Injectable()
export class AccountService {

    constructor( @InjectRepository(Account) private readonly accountRepo: Repository<Account>){}

    async getAccount(id: number): Promise<AccountDto> {
        const account = await this.accountRepo.findOne({ where: { id } });
        return { firstName: account.firstName, lastName: account.lastName, emailAddress: account.emailAddress };
      }

      async getAll(): Promise<AccountDto[]> {
        const accounts = await this.accountRepo.find();
        return accounts.map((account) => ({ firstName: account.firstName, lastName: account.lastName, emailAddress: account.emailAddress }));
      }

    
}

