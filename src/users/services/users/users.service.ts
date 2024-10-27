import { Injectable } from '@nestjs/common';
import { createUserType } from 'src/utils/type';

@Injectable()
export class UsersService {
  private fakeusers = [
    { username: 'anson', email: 'anson@ansongmail.com' },
    { username: 'grey', email: 'grey@ansongmail.com' },
    { username: 'anreg', email: 'anreg@ansongmail.com' },
  ];

  fetchUsers() {
    return this.fakeusers;
  }

  createUsers(userData:createUserType){
    this.fakeusers.push(userData);
    return userData;
  }

  fetchUsersbyId(id:number){
    return null;
  }
}
