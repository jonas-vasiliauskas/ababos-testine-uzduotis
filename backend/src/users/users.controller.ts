import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

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

  @Get(':id')
  findOne(@Param('id') id: string): User {
    return this.usersService.findById(id);
  }

  @Post(':id/login')
  login(@Param('id') id: string): User {
    return this.usersService.login(id);
  }

  @Post(':id/logout')
  logout(@Param('id') id: string): User {
    return this.usersService.logout(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.usersService.remove(id);
  }
}

