import { Attendance } from "../entities/Attendance";

export interface AttendanceRepository {
    create(attendance: Attendance): Promise<Attendance>;
    list(): Promise<Attendance[]>;
    update(attendance: Attendance): Promise<Attendance>;
    delete(id: number): Promise<void>;
}
