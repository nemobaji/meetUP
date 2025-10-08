/* eslint-disable */
import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Meeting } from './meeting.entity';
import { CreateMeetingDto } from './dto/meetings.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { MeetingRepository } from './meeting.repository';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private meetingRepository: MeetingRepository,
    @InjectRepository(User)
    private userRepository: UserRepository
  ) {}

  async createMeeting(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    const { creatorNickname, type, dateTime } = createMeetingDto;
    const meeting = this.meetingRepository.create({
      creatorNickname,
      type,
      participantCount: 1,
      dateTime,
    });
    console.log(`> create meeting by ${creatorNickname}`)
    return await this.meetingRepository.save(meeting);
  }

  async deleteMeeting(id: string, requesterNickname: string): Promise<void> {
    const meeting = await this.meetingRepository.findOne({
      where: { id },
      relations: ['participants'],
    });
    if (!meeting) {
      throw new NotFoundException(`Meeting not found: ${id}`);
    }
    if (meeting.creatorNickname !== requesterNickname) {
      throw new ForbiddenException('Only creator can delete this meeting');
    }
    console.log(`> delete meeting ${id} by ${requesterNickname}`)

    await this.meetingRepository.manager.transaction(async (em) => {
      
      if (meeting.participants?.length) {
        await em
          .createQueryBuilder()
          .relation(Meeting, 'participants')
          .of(meeting)
          .remove(meeting.participants);
      }
      await em.delete(Meeting, { id });
    });
  }

  async getAllMeeting(): Promise<Meeting[]> {
    return this.meetingRepository.find({ order: { id: 'DESC' } });
  }

  async joinMeeting(meetingId: string, nickname: string): Promise<Meeting> {
    const meeting = await this.meetingRepository.findOne({
      where: { id: meetingId },
      relations: ['participants']
    });
    if(!meeting) {
      throw new NotFoundException(`> Meeting with ID ${meetingId} not found.`)
    }

    const user = await this.userRepository.findOne({
      where: { nickname }
    });
    if (!user) {
      throw new NotFoundException(`User with nickname ${nickname} not found.`);
    }

    // 이미 참가한 유저인지 확인
    const isAlreadyJoined = meeting.participants.some(p => p.nickname === nickname);
    if(isAlreadyJoined) {
      throw new ConflictException({ 
        error: { 
          code: 'ALREADY_JOINED', 
          message: '> 이미 참가한 사용자입니다.' 
        } 
      });
    }

    // 참가한 유저 저장
    meeting.participants.push(user);
    meeting.participantCount = meeting.participants.length;

    return await this.meetingRepository.save(meeting);
  }
}
