import { inject, injectable } from "inversify";
import { Attendance } from "../entities/Attendance";
import { AttendanceRepository } from "../interfaces/AttendanceRepository";
import { ATTENDANCE_SYMBOLS } from "../symbols/Attendance";

@injectable()
export class AttendanceService {
    constructor(
        @inject(ATTENDANCE_SYMBOLS.REPOSITORY)
        private repository: AttendanceRepository
    ) { }

    create(attendance: Attendance): Promise<Attendance> {
        return this.repository.create(attendance);
    }

    list(): Promise<Attendance[]> {
        return this.repository.list();
    }

    update(attendance: Attendance): Promise<Attendance> {
        return this.repository.update(attendance);
    }

    delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
