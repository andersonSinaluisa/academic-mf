export interface OfficialRecordEntryDto {
    academicYearId: string;
    course: string;
    averageScore: number;
    status: string;
}

export interface OfficialRecordOutputDto {
    studentId: number;
    fullName: string;
    records: OfficialRecordEntryDto[];
}
