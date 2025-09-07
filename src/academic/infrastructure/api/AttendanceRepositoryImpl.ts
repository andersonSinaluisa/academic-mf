import { AttendanceRepository } from "@/academic/domain/interfaces/AttendanceRepository";
import { Attendance } from "@/academic/domain/entities/Attendance";
import { ApiInstance } from "./Api";
import { AttendanceOutputDto } from "./dto/AttendanceDto";
import { AttendanceMapper } from "./mappers/AttendanceMapper";

export class AttendanceRepositoryImpl implements AttendanceRepository {
    async create(attendance: Attendance): Promise<Attendance> {
        const res = await ApiInstance.post<AttendanceOutputDto>(
            '/attendance',
            AttendanceMapper.toDto(attendance)
        );
        return AttendanceMapper.toDomain(res.data);
    }

    async list(): Promise<Attendance[]> {
        const res = await ApiInstance.get<AttendanceOutputDto[]>('/attendance');
        return res.data.map(AttendanceMapper.toDomain);
    }

    async update(attendance: Attendance): Promise<Attendance> {
        const res = await ApiInstance.put<AttendanceOutputDto>(
            `/attendance/${attendance.id}`,
            { status: attendance.status }
        );
        return AttendanceMapper.toDomain(res.data);
    }

    async delete(id: number): Promise<void> {
        await ApiInstance.delete(`/attendance/${id}`);
    }
}
