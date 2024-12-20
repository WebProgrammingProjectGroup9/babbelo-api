import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { IAccountCredentials, IAccountIdentity } from './auth.interface';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() credentials: IAccountCredentials): Promise<IAccountIdentity> {
        return await this.authService.login(credentials);
    }
    
}