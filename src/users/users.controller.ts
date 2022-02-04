import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    this.userService.create(email, password);
  }

  @Get('/:id')
  async findUser(@Param('id') userId: string) {
    const user = await this.userService.findOne(parseInt(userId, 10));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('/')
  findAllUsers(@Query('email') userEmail: string) {
    return this.userService.find(userEmail);
  }

  @Patch('/:id')
  async updateUser(@Param('id') userId: string, @Body() body: UpdateUserDto) {
    let user;
    try {
      user = await this.userService.update(parseInt(userId, 10), body);
    } catch (err) {
      throw new NotFoundException(err);
    }
    return user;
  }

  @Delete('/:id')
  async removeUser(@Param('id') userId: string) {
    let user;
    try {
      user = await this.userService.remove(parseInt(userId, 10));
    } catch (err) {
      throw new NotFoundException(err);
    }
    return user;
  }
}
