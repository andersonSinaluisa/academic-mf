import { BehaviorReportRepository } from "@/academic/domain/interfaces/BehaviorReportRepository";
import { BehaviorReport } from "@/academic/domain/entities/BehaviorReport";
import { ApiInstance } from "./Api";
import { BehaviorReportOutputDto } from "./dto/BehaviorReportDto";
import { BehaviorReportMapper } from "./mappers/BehaviorReportMapper";
import { Page } from "@/lib/utils";

export class BehaviorReportRepositoryImpl implements BehaviorReportRepository {
    async create(report: BehaviorReport): Promise<BehaviorReport> {
        const res = await ApiInstance.post<BehaviorReportOutputDto>(
            '/behavior-reports',
            BehaviorReportMapper.toDto(report)
        );
        return BehaviorReportMapper.toDomain(res.data);
    }

    async list(page: number, limit: number, search?: string): Promise<Page<BehaviorReport>> {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (search) params.append('search', search);
        const res = await ApiInstance.get<Page<BehaviorReportOutputDto>>('/behavior-reports', { params });
        return {
            ...res.data,
            content: res.data.content.map(BehaviorReportMapper.toDomain)
        };
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
