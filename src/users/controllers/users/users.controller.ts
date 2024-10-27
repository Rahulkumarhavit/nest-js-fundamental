import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUser() {
    //function or method
    // return [{ username: 'Rahul', email: 'rahul@gmail.com' }];
    return this.userService.fetchUsers();
  }

  @Get('posts')
  getUsersPosts() {
    return [
      {
        username: 'Rahul',
        email: 'rahul@gmail.com',
        posts: [
          {
            id: 1,
            title: 'post 1',
          },
          {
            id: 2,
            title: 'post 2',
          },
          {
            id: 3,
            title: 'post 3',
          },
        ],
      },
    ];
  }

  @Get('posts/comments')
  getUsersPostsComments() {
    return [
      {
        id: 1,
        title: 'Post 1',
        comments: [],
      },
    ];
  }

  // post request

  // @Post()  // express way of doing request
  // createUser(@Req() request:Request,@Res() response:Response) {
  //   console.log(request.body);
  //   response.send("Created")
  // }

  @Post() // nest js way of doing reqeust
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log(userData.age.toPrecision())
    return this.userService.createUsers(userData);
  }

  // @Get(':id')   // express way of doing thing
  // getUserById(@Req() request:Request,@Res() response:Response){
  //   console.log(request.params);
  //   response.send("recieved");
  // }

  // Route parameter

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUsersbyId(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Get(':id/:postid')
  getUserByIdAndPost(@Param('id') id: string, @Param('postid') postid: string) {
    console.log(id, postid);
    return { id, postid };
  }

  // query parameter
  // @Get()
  // GetUserStored(@Query('sortDesc',ParseBoolPipe) sortDesc: boolean) {
  //   console.log(sortDesc);
  //   return { sortDesc };
  // }
}
