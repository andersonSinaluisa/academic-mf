import { BehaviorReportRepository } from "@/academic/domain/interfaces/BehaviorReportRepository";
import { BehaviorReport } from "@/academic/domain/entities/BehaviorReport";
import { ApiInstance } from "./Api";
import { BehaviorReportOutputDto } from "./dto/BehaviorReportDto";
import { BehaviorReportMapper } from "./mappers/BehaviorReportMapper";

export class BehaviorReportRepositoryImpl implements BehaviorReportRepository {
    async create(report: BehaviorReport): Promise<BehaviorReport> {
        const res = await ApiInstance.post<BehaviorReportOutputDto>(
            '/behavior-reports',
            BehaviorReportMapper.toDto(report)
        );
        return BehaviorReportMapper.toDomain(res.data);
    }

    async list(): Promise<BehaviorReport[]> {
        const res = await ApiInstance.get<BehaviorReportOutputDto[]>('/behavior-reports');
        return res.data.map(BehaviorReportMapper.toDomain);
    }

    async update(report: BehaviorReport): Promise<BehaviorReport> {
        const res = await ApiInstance.put<BehaviorReportOutputDto>(
            `/behavior-reports/${report.id}`,
            { description: report.description }
        );
        return BehaviorReportMapper.toDomain(res.data);
    }

    async delete(id: number): Promise<void> {
        await ApiInstance.delete(`/behavior-reports/${id}`);
    }
}
