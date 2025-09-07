import { AttendanceStatistics, PerformanceStatistics } from "@/academic/domain/entities/Statistics";
import { AttendanceStatisticsDto, PerformanceStatisticsDto } from "../dto/StatisticsDto";

export class StatisticsMapper {
    static toAttendanceDomain(raw: AttendanceStatisticsDto): AttendanceStatistics {
        return new AttendanceStatistics(
            raw.courseId,
            raw.academicYearId,
            raw.totalStudents,
            raw.present,
            raw.absent,
            raw.justified
        );
    }

    static toPerformanceDomain(raw: PerformanceStatisticsDto): PerformanceStatistics {
        return new PerformanceStatistics(
            raw.courseId,
            raw.subjectId,
            raw.academicYearId,
            raw.average,
            raw.highest,
            raw.lowest,
            raw.distribution
        );
    }
}
