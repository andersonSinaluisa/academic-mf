import { AttendanceStatistics, PerformanceStatistics } from "../entities/Statistics";

export interface StatisticsRepository {
    getAttendance(courseId: string, academicYearId: string): Promise<AttendanceStatistics>;
    getPerformance(courseId: string, subjectId: string, academicYearId: string): Promise<PerformanceStatistics>;
}
