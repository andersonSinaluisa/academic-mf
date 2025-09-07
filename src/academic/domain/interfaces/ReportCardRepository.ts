import { ReportCard } from "../entities/ReportCard";

export interface ReportCardRepository {
    getByStudent(studentId: number, academicYearId: string): Promise<ReportCard>;
}

