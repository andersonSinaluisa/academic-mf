import { Teacher } from "@/academic/domain/entities/Teacher";
import { TeacherRepository } from "@/academic/domain/interfaces/TeacherRepository";
import { ApiInstance } from "./Api";
import { TeacherOutputDto } from "./dto/TeacherDto";
import { TeacherMapper } from "./mappers/TeacherMapper";
import { Page } from "@/lib/utils";

export class TeacherRepositoryImpl implements TeacherRepository {
    async create(teacher: Teacher): Promise<Teacher> {
        const res = await ApiInstance.post<TeacherOutputDto>("/teachers", TeacherMapper.toDto(teacher));
        return TeacherMapper.toDomain(res.data);
    }

    async list(page: number, limit: number, firstName?: string, lastName?: string, identification?: string, gender?: string): Promise<Page<Teacher>> {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (firstName) params.append("firstName", firstName);
        if (lastName) params.append("lastName", lastName);
        if (identification) params.append("identification", identification);
        if (gender) params.append("gender", gender);
        const res = await ApiInstance.get<Page<TeacherOutputDto>>("/teachers", { params });
        return res.data
    }

    async getById(id: number): Promise<Teacher | null> {
        const res = await ApiInstance.get<TeacherOutputDto>(`/teachers/${id}`);
        return res.data ? TeacherMapper.toDomain(res.data) : null;
    }

    async update(teacher: Teacher): Promise<Teacher> {
        const res = await ApiInstance.patch<TeacherOutputDto>(`/teachers/${teacher.id}`, TeacherMapper.toDto(teacher));
        return TeacherMapper.toDomain(res.data);
    }

    async delete(id: number): Promise<void> {
        await ApiInstance.delete(`/teachers/${id}`);
    }
}
