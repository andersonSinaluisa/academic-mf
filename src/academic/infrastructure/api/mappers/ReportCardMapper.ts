import { ReportCard, ReportCardSubject } from "@/academic/domain/entities/ReportCard";
import { ReportCardOutputDto } from "../dto/ReportCardDto";

export class ReportCardMapper {
    static toDomain(raw: ReportCardOutputDto): ReportCard {
        return new ReportCard(
            raw.id,
            raw.academicYearId,
            raw.studentId,
            raw.averageScore,
            raw.status,
            raw.subjects.map(
                s => new ReportCardSubject(s.subjectId, s.name, s.scores)
            )
        );
    }
}

