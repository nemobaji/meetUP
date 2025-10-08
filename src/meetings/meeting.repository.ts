/* eslint-disable */

import { Repository, DataSource } from "typeorm";
import { Meeting } from "./meeting.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MeetingRepository extends Repository<Meeting> {
    constructor(private dataSource: DataSource) {
        super(Meeting, dataSource.createEntityManager())
    }
}

