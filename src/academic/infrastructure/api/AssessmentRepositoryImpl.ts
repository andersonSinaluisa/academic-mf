import { AssessmentRepository } from "@/academic/domain/interfaces/AssessmentRepository";
import { Assessment } from "@/academic/domain/entities/Assessment";
import { ApiInstance } from "./Api";
import { AssessmentOutputDto } from "./dto/AssessmentDto";
import { AssessmentMapper } from "./mappers/AssessmentMapper";

export class AssessmentRepositoryImpl implements AssessmentRepository {
    async create(assessment: Assessment): Promise<Assessment> {
        const res = await ApiInstance.post<AssessmentOutputDto>(
            '/assessments',
            AssessmentMapper.toDto(assessment)
        );
        return AssessmentMapper.toDomain(res.data);
    }

    async list(): Promise<Assessment[]> {
        const res = await ApiInstance.get<AssessmentOutputDto[]>('/assessments');
        return res.data.map(AssessmentMapper.toDomain);
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
