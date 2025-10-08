/* eslint-disable */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeetingsModule } from './meetings/meetings.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { spotDataSource } from './datasource';

@Module({
  imports: [
    MeetingsModule, 
    UsersModule,
    TypeOrmModule.forRoot(spotDataSource)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
