import { TeacherPlanningRepository } from "@/academic/domain/interfaces/TeacherPlanningRepository";
import { TeacherPlanning } from "@/academic/domain/entities/TeacherPlanning";
import { ApiInstance } from "./Api";
import { TeacherPlanningOutputDto } from "./dto/TeacherPlanningDto";
import { TeacherPlanningMapper } from "./mappers/TeacherPlanningMapper";
import { Page } from "@/lib/utils";

export class TeacherPlanningRepositoryImpl implements TeacherPlanningRepository {
    async create(planning: TeacherPlanning): Promise<TeacherPlanning> {
        const res = await ApiInstance.post<TeacherPlanningOutputDto>(
            '/teacher-plannings',
            TeacherPlanningMapper.toDto(planning),
            { headers: { 'X-Teacher-Id': planning.teacherId } }
        );
        return TeacherPlanningMapper.toDomain(res.data);
    }

    async getById(id: number): Promise<TeacherPlanning | null> {
        const res = await ApiInstance.get<TeacherPlanningOutputDto>(`/teacher-plannings/${id}`);
        return res.data ? TeacherPlanningMapper.toDomain(res.data) : null;
    }

    async list(page: number, limit: number, teacherId?: number, subjectId?: number, courseId?: number, topic?: string): Promise<Page<TeacherPlanning>> {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (teacherId !== undefined) params.append('teacherId', teacherId.toString());
        if (subjectId !== undefined) params.append('subjectId', subjectId.toString());
        if (courseId !== undefined) params.append('courseId', courseId.toString());
        if (topic) params.append('topic', topic);
        const res = await ApiInstance.get<Page<TeacherPlanningOutputDto>>(
            '/teacher-plannings',
            { params }
        );
        return {
            ...res.data,
            content: res.data.content.map(TeacherPlanningMapper.toDomain)
        };
    }
}
