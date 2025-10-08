/* eslint-disable */
import { Module } from '@nestjs/common';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeting, User])
  ],
  controllers: [MeetingsController],
  providers: [MeetingsService]
})
export class MeetingsModule {}
