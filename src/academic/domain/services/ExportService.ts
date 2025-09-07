import { inject, injectable } from "inversify";
import { EXPORT_SYMBOLS } from "../symbols/Export";
import { ExportRepository } from "../interfaces/ExportRepository";

@injectable()
export class ExportService {
    constructor(
        @inject(EXPORT_SYMBOLS.REPOSITORY)
        private repository: ExportRepository
    ) { }

    exportReportCard(studentId: number, academicYearId: string, format: string): Promise<Blob> {
        return this.repository.exportReportCard(studentId, academicYearId, format);
    }

    exportStatistics(courseId: string, academicYearId: string, format: string): Promise<Blob> {
        return this.repository.exportStatistics(courseId, academicYearId, format);
    }
}
