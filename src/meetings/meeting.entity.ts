/* eslint-disable */

import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Meeting extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    creatorNickname: string;

    @Column()
    type: string;

    @Column()
    participantCount: number;

    @Column()
    dateTime: string;

    @ManyToOne(() => User, (user) => user.createdMeetings)
    @JoinColumn({ name: 'creatorNickname', referencedColumnName: 'nickname' })
    creator: User;

    @ManyToMany(() => User, (user) => user.participatingMeetings)
    participants: User[]
}