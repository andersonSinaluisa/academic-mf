import { AssessmentRepository } from "@/academic/domain/interfaces/AssessmentRepository";
import { Assessment } from "@/academic/domain/entities/Assessment";
import { ApiInstance } from "./Api";
import { AssessmentOutputDto } from "./dto/AssessmentDto";
import { AssessmentMapper } from "./mappers/AssessmentMapper";
import { Page } from "@/lib/utils";

export class AssessmentRepositoryImpl implements AssessmentRepository {
    async create(assessment: Assessment): Promise<Assessment> {
        const res = await ApiInstance.post<AssessmentOutputDto>(
            '/assessments',
            AssessmentMapper.toDto(assessment)
        );
        return AssessmentMapper.toDomain(res.data);
    }

    async list(page: number, limit: number, studentId?: string): Promise<Page<Assessment>> {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (studentId) params.append('studentId', studentId);
        const res = await ApiInstance.get<Page<AssessmentOutputDto>>(
            '/assessments',
            { params }
        );
        return {
            ...res.data,
            content: res.data.content.map(AssessmentMapper.toDomain)
        };
    }

    async update(assessment: Assessment): Promise<Assessment> {
        const res = await ApiInstance.put<AssessmentOutputDto>(
            `/assessments/${assessment.id}`,
            { score: assessment.score }
        );
        return AssessmentMapper.toDomain(res.data);
    }

    async delete(id: number): Promise<void> {
        await ApiInstance.delete(`/assessments/${id}`);
    }
}
