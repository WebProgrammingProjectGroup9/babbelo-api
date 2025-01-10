import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from 'src/modules/account/entities/account.entity';
import { Address } from 'src/modules/address/entities/address.entity';
import { IAccountCredentials, IAccountIdentity, IAccountRegistration } from './auth.interface';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) private readonly accountRepo: Repository<Account>,
    @InjectRepository(Address) private readonly addressRepo: Repository<Address>,
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
    const { emailAddress, firstName, lastName, password, ZipCode, StreetName, HouseNumber, City } = credentials;

    const accountCheck = await this.accountRepo.findOne({ where: { emailAddress } });
    if (accountCheck) {
      throw new BadRequestException('This email address is already in use');
    }

    const addressCheck = await this.addressRepo.findOne({ where: { ZipCode, StreetName, HouseNumber, City } });
    let savedAddress: Address;

    if (addressCheck) {
      savedAddress = addressCheck;
    } else {
      const address = new Address();
      address.ZipCode = ZipCode;
      address.StreetName = StreetName;
      address.HouseNumber = HouseNumber;
      address.City = City;

      savedAddress = await this.addressRepo.save(address);
    }

    const account = new Account();
    account.firstName = firstName;
    account.lastName = lastName;
    account.emailAddress = emailAddress;
    account.password = password;
    account.dateOfBirth = credentials.dateOfBirth;
    account.gender = credentials.gender;
    account.phoneNumber = credentials.phoneNumber;
    account.address = savedAddress;

    if (credentials.organisationName) {
      account['organisationName'] = credentials.organisationName;
    }
    if (credentials.chamberOfCommerce) {
      account['chamberOfCommerce'] = credentials.chamberOfCommerce;
    }
    if (credentials.website) {
      account['website'] = credentials.website;
    }

    const savedAccount = await this.accountRepo.save(account);

    const payload = { account_id: savedAccount.id };
    const token = this.jwtService.sign(payload);

    return {
      id: savedAccount.id,
      firstName: savedAccount.firstName,
      lastName: savedAccount.lastName,
      emailAddress: savedAccount.emailAddress,
      token,
    };
  }
}
