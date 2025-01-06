import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountCredentialsDto, AccountIdentityDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() credentials: AccountCredentialsDto): Promise<AccountIdentityDto> {
        return await this.authService.login(credentials);
    }
    
}
