import { Injectable } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {

    constructor( @InjectRepository(Account) private readonly accountRepo: Repository<Account>){}

    async getAccount(id: number): Promise<Account> {
        return this.accountRepo.findOne({ where: { id } });
    }

    async getAll(): Promise<Account[]> {
        return this.accountRepo.find();
    }

    
}

