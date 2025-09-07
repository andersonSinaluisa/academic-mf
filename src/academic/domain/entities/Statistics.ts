export class AttendanceStatistics {
    constructor(
        public courseId: string,
        public academicYearId: string,
        public totalStudents: number,
        public present: number,
        public absent: number,
        public justified: number,
    ) { }
}

export class PerformanceStatistics {
    constructor(
        public courseId: string,
        public subjectId: string,
        public academicYearId: string,
        public average: number,
        public highest: number,
        public lowest: number,
        public distribution: Record<string, number>,
    ) { }
}
