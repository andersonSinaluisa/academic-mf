import { Attendance } from "@/academic/domain/entities/Attendance";
import { AttendanceInputDto, AttendanceOutputDto } from "../dto/AttendanceDto";

export class AttendanceMapper {
    static toDomain(dto: AttendanceOutputDto): Attendance {
        return new Attendance(dto.id, dto.studentId, dto.date, dto.status);
    }

    static toDto(attendance: Attendance): AttendanceInputDto {
        return {
            studentId: attendance.studentId,
            date: attendance.date,
            status: attendance.status
        };
    }
}
