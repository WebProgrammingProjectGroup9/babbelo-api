import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {

    constructor(private readonly accountService: AccountService){}

    @Get()
    async getAll() {
        return this.accountService.getAll();
    }
    
    @Get(':id')
    async getAccount(@Param('id') id: number) {
      return await this.accountService.getAccount(id);
    }

    


}
