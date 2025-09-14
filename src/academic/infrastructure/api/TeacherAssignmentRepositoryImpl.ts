import { TeacherAssignmentRepository } from "@/academic/domain/interfaces/TeacherAssignmentRepository";
import { TeacherAssignment } from "@/academic/domain/entities/TeacherAssignment";
import { ApiInstance } from "./Api";
import { TeacherAssignmentOutputDto } from "./dto/TeacherAssignmentDto";
import { TeacherAssignmentMapper } from "./mappers/TeacherAssignmentMapper";
import { Page } from "@/lib/utils";

export class TeacherAssignmentRepositoryImpl implements TeacherAssignmentRepository {
    async create(assignment: TeacherAssignment): Promise<TeacherAssignment> {
        const res = await ApiInstance.post<TeacherAssignmentOutputDto>(
            '/teacher-assignments',
            TeacherAssignmentMapper.toDto(assignment),
            { headers: { 'X-Teacher-Id': assignment.teacherId } }
        );
        return TeacherAssignmentMapper.toDomain(res.data);
    }

    async getById(id: number): Promise<TeacherAssignment | null> {
        const res = await ApiInstance.get<TeacherAssignmentOutputDto>(`/teacher-assignments/${id}`);
        return res.data ? TeacherAssignmentMapper.toDomain(res.data) : null;
    }

    async list(page: number, limit: number, teacherId?: number, courseId?: number): Promise<Page<TeacherAssignment>> {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (teacherId !== undefined) params.append('teacherId', teacherId.toString());
        if (courseId !== undefined) params.append('courseId', courseId.toString());
        const res = await ApiInstance.get<Page<TeacherAssignmentOutputDto>>(
            '/teacher-assignments',
            { params }
        );
        return {
            ...res.data,
            content: res.data.content.map(TeacherAssignmentMapper.toDomain)
        };
    }
}
