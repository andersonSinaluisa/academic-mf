import { AttendanceRepository } from "@/academic/domain/interfaces/AttendanceRepository";
import { Attendance } from "@/academic/domain/entities/Attendance";
import { ApiInstance } from "./Api";
import { AttendanceOutputDto } from "./dto/AttendanceDto";
import { AttendanceMapper } from "./mappers/AttendanceMapper";
import { Page } from "@/lib/utils";

export class AttendanceRepositoryImpl implements AttendanceRepository {
    async create(attendance: Attendance): Promise<Attendance> {
        const res = await ApiInstance.post<AttendanceOutputDto>(
            '/attendance',
            AttendanceMapper.toDto(attendance)
        );
        return AttendanceMapper.toDomain(res.data);
    }

    async list(page: number, limit: number, search?: string): Promise<Page<Attendance>> {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (search) params.append('search', search);
        const res = await ApiInstance.get<Page<AttendanceOutputDto>>('/attendance', { params });
        return {
            ...res.data,
            content: res.data.content.map(AttendanceMapper.toDomain)
        };
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
