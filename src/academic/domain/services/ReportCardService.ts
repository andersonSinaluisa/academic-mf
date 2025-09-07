import { inject, injectable } from "inversify";
import { REPORT_CARD_SYMBOLS } from "../symbols/ReportCard";
import { ReportCardRepository } from "../interfaces/ReportCardRepository";
import { ReportCard } from "../entities/ReportCard";

@injectable()
export class ReportCardService {
    constructor(
        @inject(REPORT_CARD_SYMBOLS.REPOSITORY)
        private repository: ReportCardRepository
    ) { }

    async getReportCard(studentId: number, academicYearId: string): Promise<ReportCard> {
        return this.repository.getByStudent(studentId, academicYearId);
    }
}

