import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor( @InjectRepository(User) private readonly userRepo: Repository<User>){}

    async getUser(id: number): Promise<User> {
        return this.userRepo.findOne({ where: { id } });
    }

    async getAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    
}
