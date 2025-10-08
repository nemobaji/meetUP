/* eslint-disable */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { Meeting } from './meeting.entity';
import { CreateMeetingDto } from './dto/meetings.dto';
import { JoinMeetingDTO } from './dto/join.meeting.dto';

@Controller('meetings')
export class MeetingsController {
    constructor(private meetingsService: MeetingsService) {}

    @Post()
    async createMeeting(@Body() createMeetingDto: CreateMeetingDto): Promise<Meeting> {
        const created = await this.meetingsService.createMeeting(createMeetingDto);
        return created;
    }

    @Delete('/:id')
    deleteMeeting(
                @Param('id') id: string,
                @Body() body: {nickname: string}
            ): Promise<void> {
        return this.meetingsService.deleteMeeting(id, body.nickname);
    }

    @Get()
    async getAllMeeting(): Promise<Meeting[]> {
        const list = await this.meetingsService.getAllMeeting();
        return list;
    }

    @Post(':id/join')
    async joinMeeting(
        @Param('id') id: string,
        @Body() joinMeetingDTO: JoinMeetingDTO
    ): Promise<Meeting> {
        return await this.meetingsService.joinMeeting(id, joinMeetingDTO.nickname);
    }

}

