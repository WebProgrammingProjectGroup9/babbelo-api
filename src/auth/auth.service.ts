import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAccountCredentials, IAccountIdentity } from './auth.interface';
import { Account } from 'src/modules/account/entities/account.entity';

@Injectable()
export class AuthService {
    constructor( @InjectRepository(Account) private readonly accountRepo: Repository<Account>,
    private jwtService: JwtService,
  ) {}

  async login(credentials: IAccountCredentials): Promise<IAccountIdentity> {
    const { emailAddress, password } = credentials;

    const account = await this.accountRepo.findOne({
      where: { emailAddress },
    });

    if (account && account.password === credentials.password) {
      const payload = {
        account_id: account.id,
      };

      return {
        id: account.id,
        name: account.name,
        emailAddress: account.emailAddress,
        token: this.jwtService.sign(payload),
      };
    } else {
      const errMsg = 'Email not found or password invalid';
      throw new UnauthorizedException(errMsg);
    }
  }
}
