import { inject, injectable } from "inversify";
import { AcademicHistory } from "../entities/AcademicHistory";
import { AcademicHistoryRepository } from "../interfaces/AcademicHistoryRepository";
import { ACADEMIC_HISTORY_SYMBOLS } from "../symbols/AcademicHistory";

@injectable()
export class AcademicHistoryService {
    constructor(
        @inject(ACADEMIC_HISTORY_SYMBOLS.REPOSITORY)
        private repository: AcademicHistoryRepository
    ) { }

    getByStudentId(studentId: number): Promise<AcademicHistory> {
        return this.repository.getByStudentId(studentId);
    }
}
