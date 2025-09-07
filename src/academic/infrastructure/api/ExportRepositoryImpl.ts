import { ExportRepository } from "@/academic/domain/interfaces/ExportRepository";
import { ApiInstance } from "./Api";

export class ExportRepositoryImpl implements ExportRepository {
    async exportReportCard(studentId: number, academicYearId: string, format: string): Promise<Blob> {
        const res = await ApiInstance.get(`/exports/report-card/${studentId}`, {
            params: { academicYearId, format },
            responseType: "blob"
        });
        return res.data;
    }

    async exportStatistics(courseId: string, academicYearId: string, format: string): Promise<Blob> {
        const res = await ApiInstance.get(`/exports/statistics`, {
            params: { courseId, academicYearId, format },
            responseType: "blob"
        });
        return res.data;
    }
}
