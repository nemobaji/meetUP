/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { RegisterUsersDto } from './dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from 'src/meetings/meeting.entity';
import { MeetingRepository } from 'src/meetings/meeting.repository';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Meeting)
        private meetingRepository: MeetingRepository,
        @InjectRepository(User)
        private userRepository: UserRepository,
    ) {}

    async registerUser(registerUserDto: RegisterUsersDto): Promise<User> {
        const { nickname } = registerUserDto;
        const user = this.userRepository.create({
            nickname,
        });
        console.log(`> create user with nickname ${nickname}`);
        return await this.userRepository.save(user);
    }
}
