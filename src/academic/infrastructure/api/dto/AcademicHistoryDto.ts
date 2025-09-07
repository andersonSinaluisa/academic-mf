export interface AcademicHistoryRecordDto {
    academicYearId: string;
    course: string;
    finalAverage: number;
    status: string;
}

export interface AcademicHistoryDto {
    studentId: number;
    records: AcademicHistoryRecordDto[];
}
