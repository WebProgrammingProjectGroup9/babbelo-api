import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { IUserCredentials, IUserIdentity } from './auth.interface';
import { User } from 'src/modules/user/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() credentials: IUserCredentials): Promise<IUserIdentity> {
        return await this.authService.login(credentials);
    }
    
}
