/* eslint-disable */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from 'src/meetings/meeting.entity';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeting, User])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
