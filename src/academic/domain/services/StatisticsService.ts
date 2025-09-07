import { inject, injectable } from "inversify";
import { STATISTICS_SYMBOLS } from "../symbols/Statistics";
import { StatisticsRepository } from "../interfaces/StatisticsRepository";
import { AttendanceStatistics, PerformanceStatistics } from "../entities/Statistics";

@injectable()
export class StatisticsService {
    constructor(
        @inject(STATISTICS_SYMBOLS.REPOSITORY)
        private repository: StatisticsRepository
    ) { }

    async getAttendance(courseId: string, academicYearId: string): Promise<AttendanceStatistics> {
        return this.repository.getAttendance(courseId, academicYearId);
    }

    async getPerformance(courseId: string, subjectId: string, academicYearId: string): Promise<PerformanceStatistics> {
        return this.repository.getPerformance(courseId, subjectId, academicYearId);
    }
}
