import { Teacher } from "@/academic/domain/entities/Teacher";
import { TeacherRepository } from "@/academic/domain/interfaces/TeacherRepository";
import { ApiInstance } from "./Api";
import { TeacherOutputDto } from "./dto/TeacherDto";
import { TeacherMapper } from "./mappers/TeacherMapper";



export class TeacherRepositoryImpl implements TeacherRepository {
    async create(teacher: Teacher): Promise<Teacher> {
        const res = await ApiInstance.post<TeacherOutputDto>("/teachers", teacher);
        return TeacherMapper.toDomain(res.data);
    }
    async list(page: number, limit: number, firstName?: string, lastName?: string, identification?: string): Promise<Teacher[]> {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (firstName) params.append("firstName", firstName);
        if (lastName) params.append("lastName", lastName);
        if (identification) params.append("identification", identification);

        const res = await ApiInstance.get<TeacherOutputDto[]>("/teachers", { params });
        return res.data.map(TeacherMapper.toDomain);
    }
    async getById(id: number): Promise<Teacher | null> {
        const res = await ApiInstance.get<TeacherOutputDto>(`/teachers/${id}`);
        return res.data ? TeacherMapper.toDomain(res.data) : null;
    }
    async update(teacher: Teacher): Promise<Teacher> {
        const res = await ApiInstance.put<TeacherOutputDto>(`/teachers/${teacher.id}`, teacher);
        return TeacherMapper.toDomain(res.data);
    }
    async delete(id: number): Promise<void> {
        await ApiInstance.delete(`/teachers/${id}`);
    }

}