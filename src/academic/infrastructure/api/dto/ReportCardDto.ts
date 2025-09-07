export interface ReportCardSubjectDto {
    subjectId: string;
    name: string;
    scores: Record<string, number>;
}

export interface ReportCardOutputDto {
    id: number;
    academicYearId: string;
    studentId: number;
    averageScore: number;
    status: string;
    subjects: ReportCardSubjectDto[];
}

