export interface AttendanceStatisticsDto {
    courseId: string;
    academicYearId: string;
    totalStudents: number;
    present: number;
    absent: number;
    justified: number;
}

export interface PerformanceStatisticsDto {
    courseId: string;
    subjectId: string;
    academicYearId: string;
    average: number;
    highest: number;
    lowest: number;
    distribution: Record<string, number>;
}
