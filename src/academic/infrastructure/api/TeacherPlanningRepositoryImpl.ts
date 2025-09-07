import { TeacherPlanningRepository } from "@/academic/domain/interfaces/TeacherPlanningRepository";
import { TeacherPlanning } from "@/academic/domain/entities/TeacherPlanning";
import { ApiInstance } from "./Api";
import { TeacherPlanningOutputDto } from "./dto/TeacherPlanningDto";
import { TeacherPlanningMapper } from "./mappers/TeacherPlanningMapper";

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

    async list(teacherId?: number, subjectId?: number, courseId?: number): Promise<TeacherPlanning[]> {
        const params = new URLSearchParams();
        if (teacherId !== undefined) params.append('teacherId', teacherId.toString());
        if (subjectId !== undefined) params.append('subjectId', subjectId.toString());
        if (courseId !== undefined) params.append('courseId', courseId.toString());
        const res = await ApiInstance.get<TeacherPlanningOutputDto[]>(
            '/teacher-plannings',
            { params }
        );
        return res.data.map(TeacherPlanningMapper.toDomain);
    }
}
