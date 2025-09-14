import { inject, injectable } from "inversify";
import { Attendance } from "../entities/Attendance";
import { AttendanceRepository } from "../interfaces/AttendanceRepository";
import { ATTENDANCE_SYMBOLS } from "../symbols/Attendance";
import { Page } from "@/lib/utils";

@injectable()
export class AttendanceService {
    constructor(
        @inject(ATTENDANCE_SYMBOLS.REPOSITORY)
        private repository: AttendanceRepository
    ) { }

    create(attendance: Attendance): Promise<Attendance> {
        return this.repository.create(attendance);
    }

    list(page: number, limit: number, search?: string): Promise<Page<Attendance>> {
        return this.repository.list(page, limit, search);
    }

    update(attendance: Attendance): Promise<Attendance> {
        return this.repository.update(attendance);
    }

    delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
