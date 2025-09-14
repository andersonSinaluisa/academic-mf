import { Meeting } from "../entities/Meeting";
import { Page } from "@/lib/utils";

export interface MeetingRepository {
    create(meeting: Meeting): Promise<Meeting>;
    list(page: number, limit: number, topic?: string): Promise<Page<Meeting>>;
    update(meeting: Meeting): Promise<Meeting>;
    delete(id: number): Promise<void>;
}
