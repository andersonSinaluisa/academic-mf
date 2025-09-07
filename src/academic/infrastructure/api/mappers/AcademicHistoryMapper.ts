import { AcademicHistory, AcademicHistoryRecord } from "@/academic/domain/entities/AcademicHistory";
import { AcademicHistoryDto } from "../dto/AcademicHistoryDto";

export class AcademicHistoryMapper {
    static toDomain(dto: AcademicHistoryDto): AcademicHistory {
        const records: AcademicHistoryRecord[] = dto.records.map(r => ({
            academicYearId: r.academicYearId,
            course: r.course,
            finalAverage: r.finalAverage,
            status: r.status
        }));
        return new AcademicHistory(dto.studentId, records);
    }
}
