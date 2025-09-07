import { BehaviorReport } from "@/academic/domain/entities/BehaviorReport";
import { BehaviorReportInputDto, BehaviorReportOutputDto } from "../dto/BehaviorReportDto";

export class BehaviorReportMapper {
    static toDomain(dto: BehaviorReportOutputDto): BehaviorReport {
        return new BehaviorReport(dto.id, dto.studentId, dto.description);
    }

    static toDto(report: BehaviorReport): BehaviorReportInputDto {
        return {
            studentId: report.studentId,
            description: report.description
        };
    }
}
