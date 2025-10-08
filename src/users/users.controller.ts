/* eslint-disable */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    registerUser(@Body() registerUsersDto: RegisterUsersDto) {
        return this.usersService.registerUser(registerUsersDto);
    }
}
