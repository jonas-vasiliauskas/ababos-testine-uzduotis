import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(email: string, password: string): User {
    const user: User = {
      id: uuid(),
      email,
      password,
      isLoggedIn: false,
    };

    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  login(id: string): User {
    const user = this.findById(id);
    user.isLoggedIn = true;
    return user;
  }

  logout(id: string): User {
    const user = this.findById(id);
    user.isLoggedIn = false;
    return user;
  }

  remove(id: string): void {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users.splice(index, 1);
  }
}

