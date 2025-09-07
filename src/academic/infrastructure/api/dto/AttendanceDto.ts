import { AttendanceStatus } from "@/academic/domain/entities/Attendance";

export interface AttendanceInputDto {
    studentId: number;
    date: string;
    status: AttendanceStatus;
}

export interface AttendanceOutputDto extends AttendanceInputDto {
    id: number;
}
