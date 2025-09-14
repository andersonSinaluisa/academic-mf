import { inject, injectable } from "inversify";
import { Meeting } from "../entities/Meeting";
import { MeetingRepository } from "../interfaces/MeetingRepository";
import { MEETING_SYMBOLS } from "../symbols/Meeting";
import { Page } from "@/lib/utils";

@injectable()
export class MeetingService {
    constructor(
        @inject(MEETING_SYMBOLS.REPOSITORY)
        private repository: MeetingRepository
    ) { }

    create(meeting: Meeting): Promise<Meeting> {
        return this.repository.create(meeting);
    }

    list(page: number, limit: number, topic?: string): Promise<Page<Meeting>> {
        return this.repository.list(page, limit, topic);
    }

    update(meeting: Meeting): Promise<Meeting> {
        return this.repository.update(meeting);
    }

    delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
