import { AcademicHistory } from "../entities/AcademicHistory";

export interface AcademicHistoryRepository {
    getByStudentId(studentId: number): Promise<AcademicHistory>;
}
