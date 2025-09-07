import { inject, injectable } from "inversify";
import { FinalGrade } from "../entities/FinalGrade";
import { GradingRepository } from "../interfaces/GradingRepository";
import { GRADING_SYMBOLS } from "../symbols/Grading";

@injectable()
export class GradingService {
    constructor(
        @inject(GRADING_SYMBOLS.REPOSITORY)
        private repository: GradingRepository
    ) { }

    calculateFinalGrade(studentId: number, subjectId: number, schoolYearId: string): Promise<FinalGrade> {
        return this.repository.calculateFinalGrade(studentId, subjectId, schoolYearId);
    }
}
