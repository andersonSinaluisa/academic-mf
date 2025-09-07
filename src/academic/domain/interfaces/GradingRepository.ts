import { FinalGrade } from "../entities/FinalGrade";

export interface GradingRepository {
    calculateFinalGrade(studentId: number, subjectId: number, schoolYearId: string): Promise<FinalGrade>;
}
