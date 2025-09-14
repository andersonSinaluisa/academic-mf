import { Attendance } from "../entities/Attendance";
import { Page } from "@/lib/utils";

export interface AttendanceRepository {
    create(attendance: Attendance): Promise<Attendance>;
    list(page: number, limit: number, search?: string): Promise<Page<Attendance>>;
    update(attendance: Attendance): Promise<Attendance>;
    delete(id: number): Promise<void>;
}
