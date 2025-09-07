import { inject, injectable } from "inversify";
import { Meeting } from "../entities/Meeting";
import { MeetingRepository } from "../interfaces/MeetingRepository";
import { MEETING_SYMBOLS } from "../symbols/Meeting";

@injectable()
export class MeetingService {
    constructor(
        @inject(MEETING_SYMBOLS.REPOSITORY)
        private repository: MeetingRepository
    ) { }

    create(meeting: Meeting): Promise<Meeting> {
        return this.repository.create(meeting);
    }

    list(): Promise<Meeting[]> {
        return this.repository.list();
    }

    update(meeting: Meeting): Promise<Meeting> {
        return this.repository.update(meeting);
    }

    delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
