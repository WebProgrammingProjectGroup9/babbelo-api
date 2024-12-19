import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { IUserCredentials, IUserIdentity } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(credentials: IUserCredentials): Promise<IUserIdentity> {
    const { emailAddress, password } = credentials;

    const user = await this.userRepo.findOne({
      where: { emailAddress },
    });

    if (user && user.password === credentials.password) {
      const payload = {
        user_id: user.id,
      };

      return {
        id: user.id,
        name: user.name,
        emailAddress: user.emailAddress,
        token: this.jwtService.sign(payload),
      };
    } else {
      const errMsg = 'Email not found or password invalid';
      throw new UnauthorizedException(errMsg);
    }
  }
}
