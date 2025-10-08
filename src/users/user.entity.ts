/* eslint-disable */

import { Meeting } from "src/meetings/meeting.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    nickname: string;

    @OneToMany(() => Meeting, (meeting) => meeting.creator)
    createdMeetings: Meeting[]

    @ManyToMany(() => Meeting, (meeting) => meeting.participants)
    @JoinTable({name: 'user_meeting_participation'})
    participatingMeetings: Meeting[]
}
