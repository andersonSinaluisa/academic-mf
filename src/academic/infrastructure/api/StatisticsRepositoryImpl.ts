import { StatisticsRepository } from "@/academic/domain/interfaces/StatisticsRepository";
import { AttendanceStatistics, PerformanceStatistics } from "@/academic/domain/entities/Statistics";
import { ApiInstance } from "./Api";
import { AttendanceStatisticsDto, PerformanceStatisticsDto } from "./dto/StatisticsDto";
import { StatisticsMapper } from "./mappers/StatisticsMapper";

export class StatisticsRepositoryImpl implements StatisticsRepository {
    async getAttendance(courseId: string, academicYearId: string): Promise<AttendanceStatistics> {
        const res = await ApiInstance.get<AttendanceStatisticsDto>(
            `/statistics/attendance`,
            { params: { courseId, academicYearId } }
        );
        return StatisticsMapper.toAttendanceDomain(res.data);
    }

    async getPerformance(courseId: string, subjectId: string, academicYearId: string): Promise<PerformanceStatistics> {
        const res = await ApiInstance.get<PerformanceStatisticsDto>(
            `/statistics/performance`,
            { params: { courseId, subjectId, academicYearId } }
        );
        return StatisticsMapper.toPerformanceDomain(res.data);
    }
}
