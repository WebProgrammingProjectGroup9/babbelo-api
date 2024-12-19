import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get()
    async getAll() {
        return this.userService.getAll();
    }
    
    @Get(':id')
    async getUser(@Param('id') id: number) {
      return await this.userService.getUser(id);
    }

    


}
