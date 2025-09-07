import { ReportCardRepository } from "@/academic/domain/interfaces/ReportCardRepository";
import { ReportCard } from "@/academic/domain/entities/ReportCard";
import { ApiInstance } from "./Api";
import { ReportCardOutputDto } from "./dto/ReportCardDto";
import { ReportCardMapper } from "./mappers/ReportCardMapper";

export class ReportCardRepositoryImpl implements ReportCardRepository {
    async getByStudent(studentId: number, academicYearId: string): Promise<ReportCard> {
        const res = await ApiInstance.get<ReportCardOutputDto>(
            `/report-cards/${studentId}`,
            { params: { academicYearId } }
        );
        return ReportCardMapper.toDomain(res.data);
    }
}

