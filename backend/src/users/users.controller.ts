import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User,LoginDto } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body('email') email: string,
    @Body('password') password: string,
  ): User {
    return this.usersService.create(email, password);
  }
   
  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }
  
  @Post('login')
  login(@Body() loginDto: LoginDto): User {
      return this.usersService.login(loginDto.email, loginDto.password);
  }

  @Post('logout')
  logout(@Body('email') email: string): User {
      return this.usersService.logout(email);
  }
}

