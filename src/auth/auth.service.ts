import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from 'src/modules/account/entities/account.entity';
import { IAccountCredentials, IAccountIdentity, IAccountRegistration } from './auth.interface';


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
        firstName: account.firstName,
        lastName: account.lastName,
        emailAddress: account.emailAddress,
        token: this.jwtService.sign(payload),
      };
    } else {
      const errMsg = 'Email not found or password invalid';
      throw new UnauthorizedException(errMsg);
    }
  }

  async register(credentials: IAccountRegistration): Promise<IAccountIdentity> {
    const {emailAddress, firstName, lastName, password} = credentials

    const accountCheck = await this.accountRepo.find({ where: { emailAddress } });
    if (accountCheck.length > 0) {
      console.log(accountCheck);
      throw new Error('This email address already exists');
    }
    const account = await this.accountRepo.save(credentials);
    return account;
  }
}
