export interface AcademicHistoryRecord {
    academicYearId: string;
    course: string;
    finalAverage: number;
    status: string;
}

export class AcademicHistory {
    constructor(
        public studentId: number,
        public records: AcademicHistoryRecord[]
    ) { }
}
