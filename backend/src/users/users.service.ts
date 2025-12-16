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
  
  findByEmailAndPassword(email:string,password:string): User{
      const user = this.users.find(u => u.email===email && u.password==password);
      if (!user) 
          throw new NotFoundException('User not found');
      return user;
  }
  
  findByEmail(email:string): User{
      const user = this.users.find(u => u.email===email);
      if (!user) 
          throw new NotFoundException('User not found');
      return user;
  }
  
  login(email:string,password:string): User{
      const user = this.findByEmailAndPassword(email,password);
      user.isLoggedIn = true;
      return user;
  }
  
  logout(email:string):User{
      const user = this.findByEmail(email);
      user.isLoggedIn = false;
      return user;
  }
}

