import { Meeting } from "../entities/Meeting";

export interface MeetingRepository {
    create(meeting: Meeting): Promise<Meeting>;
    list(): Promise<Meeting[]>;
    update(meeting: Meeting): Promise<Meeting>;
    delete(id: number): Promise<void>;
}
