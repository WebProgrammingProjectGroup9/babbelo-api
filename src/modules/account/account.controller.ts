import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, UseGuards, Request } from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { UpdateAccountDto } from './dto/account.dto';

@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {

    constructor(private readonly accountService: AccountService){}

    @Get()
    async getAll() {
        return this.accountService.findAll();
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async getProfile(@Request() req: any) {
      return await this.accountService.findOne(req.user.account_id);
    }
    
    @Get(':id')
    async getAccount(@Param('id') id: number) {
      return await this.accountService.findOne(id);
    }

    @Put(':id')
    update(@Param('id')id: number, @Body() account: UpdateAccountDto ) {
      return this.accountService.update(id, account);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
      return await this.accountService.delete(id)
    }
}
