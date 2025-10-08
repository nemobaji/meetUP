/* eslint-disable */
import { IsNotEmpty, IsString } from 'class-validator';

export class JoinMeetingDTO {
    @IsString()
    @IsNotEmpty()
    nickname: string;
}