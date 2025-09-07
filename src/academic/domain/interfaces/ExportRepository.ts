export interface ExportRepository {
    exportReportCard(studentId: number, academicYearId: string, format: string): Promise<Blob>;
    exportStatistics(courseId: string, academicYearId: string, format: string): Promise<Blob>;
}
